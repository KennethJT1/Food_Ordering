import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Register from "../pages/Register";
import PaymentSuccess from "../pages/PaymentSuccess";
import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/CartSlice";
import { Footer } from "../components/Footer";

const Navigation = () => {
  const productsInCart = useSelector(cartProducts);

  return (
    <BrowserRouter>
      <Header cartCount={productsInCart ? productsInCart.length : 0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Navigation;
