const express = require("express");
const cors = require("cors");
const env = require('dotenv').config({path: '.env'});

const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express();
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/productRouter');

const Order = require('./models/orderModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
    origin: process.env.FRONTEND_URL
}

const calculateOrderAmount = (orderItems) => {
    const initialValue = 0;
    const itemsPrice = orderItems.reduce(
        (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.amount, initialValue
    );
    return itemsPrice * 100;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use('/api/', productRouter);
app.use('/api/', userRouter);

app.post('/webhook', async (req, res) => {
    let data, eventType;
  
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      let event;
      let signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      data = event.data;
      eventType = event.type;
    } else {
      data = req.body.data;
      eventType = req.body.type;
    }
  
    if (eventType === 'payment_intent.succeeded') {
      console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
      console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
  });

app.post('/create-payment-intent', async(req, res) => {
  try {
      const { orderItems, shippingAddress, userId } = req.body;

      const totalPrice = calculateOrderAmount(orderItems);

      const taxPrice = 0;
      const shippingPrice = 0;

      const order = new Order({
          orderItems,
          shippingAddress,
          paymentMethod: 'stripe',
          totalPrice,
          taxPrice,
          shippingPrice,
          user: ''
      })

      // await order.save();

      const paymentIntent = await stripe.paymentIntents.create({
          amount: totalPrice,
          currency: 'ngn'
      })

      res.send({
          clientSecret: paymentIntent.client_secret
      })
  } catch(e) {
      res.status(400).json({
          error: {
              message: e.message
          }
      })
  }
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});