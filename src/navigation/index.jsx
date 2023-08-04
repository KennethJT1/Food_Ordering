import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Menu from "../pages/Home";
import Register from "../pages/Register";
import PaymentSuccess from "../pages/PaymentSuccess";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/menu" element={<Menu />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/payment-success" element={<PaymentSuccess />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
