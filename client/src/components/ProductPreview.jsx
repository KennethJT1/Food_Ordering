/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { ProductPreviewCard } from "./ProductPreviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart/CartSlice";

export const ProductPreview = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const onAddProduct = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    fetch("http://localhost:4980/api/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data?.data))
      .catch((e) => console.log("Error==>", e.message));
  }, []);
  return (
    <div className="container mx-auto pb-4 w-2/3 text-white bg-black">
      <Carousel responsive={responsive}>
        {products.length > 0 &&
          products.map((p, i) => {
            return (
              <div className="w-full p-3">
                <ProductPreviewCard
                  key={i}
                  product={p}
                  onAddProduct={onAddProduct}
                />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
