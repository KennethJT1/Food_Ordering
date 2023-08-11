/* eslint-disable no-undef */
import Button from "./elements/Button";
import PizzaImg from "../assets/images/pizza_banner.png";

export const Banner = () => {
  return (
    <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex items-center justify-between">
      <div className="banner-description w-full md:w-1/2 p-3">
        <h2 className="mb-6 text-4xl font-bold text-white">
          KJTFood Ordering Service
        </h2>
        <p className="ont-semi-bold text-lg text-red-600 py-2">
          Getting Started!
        </p>
        <div className="btn-container">
          <Button>Order Now</Button>
          <a
            href="/menu"
            className="text-yellow-400 hover:text:-yellow-500 font-bold text-decoration-line x-3"
          >
            See Menu
          </a>
        </div>
      </div>
      <div className="banner-image w-full md:w-1/2 p-3 flex justify-end">
        <img src={PizzaImg} alt="banner" className="max-h-95" />
      </div>
    </div>
  );
};
