import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import { IoCartOutline } from "react-icons/io5";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const SingleProduct = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [singleProduct, setSingleProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setSingleProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100,
  );

  function handleButton(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      return (
        <div
          className="w-full sm:w-1/2 mt-2 flex items-center justify-between
          bg-[#f5f5f7] dark:bg-[#141414]
          border border-black/[0.04] dark:border-white/[0.06]
          rounded-full p-1"
        >
          <button
            onClick={() => dispatch(decreaseQuantity(product.id))}
            className="w-9 h-9 flex items-center justify-center
            bg-white dark:bg-[#0a0a0a]
            rounded-full shadow-sm
            text-black dark:text-white
            hover:scale-95 transition"
          >
            -
          </button>

          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
            {exist.quantity}
          </p>

          <button
            onClick={() => dispatch(increaseQuantity(product.id))}
            className="w-9 h-9 flex items-center justify-center
            bg-white dark:bg-[#0a0a0a]
            rounded-full shadow-sm
            text-black dark:text-white
            hover:scale-95 transition"
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full sm:w-1/2 mt-2 flex items-center justify-center gap-2
          bg-black hover:bg-neutral-800
          text-white font-medium
          px-4 py-3 rounded-full
          transition-all duration-300 active:scale-[0.98]"
        >
          <IoCartOutline className="w-5 h-5" />
          Add to Cart
        </button>
      );
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <RingLoader color="#111" loading={loading} size={60} />
        <p className="text-neutral-500">Loading product...</p>
      </div>
    );
  }

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-10 md:px-0 bg-white dark:bg-[#0a0a0a] min-h-screen">
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* IMAGE */}
            <div className="w-full bg-[#f5f5f7] dark:bg-[#141414] rounded-2xl p-6 flex items-center justify-center">
              <img
                src={singleProduct.thumbnail}
                alt={singleProduct.title}
                className="rounded-2xl w-full object-contain mix-blend-multiply dark:mix-blend-normal"
              />
            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                {singleProduct.title}
              </h1>

              <div className="text-sm text-neutral-500 font-medium">
                {singleProduct.brand?.toUpperCase()} /{" "}
                {singleProduct.category?.toUpperCase()}
              </div>

              <p className="text-xl font-bold text-black dark:text-white flex items-center gap-3">
                ${singleProduct.price}
                <span className="line-through text-neutral-400 text-base">
                  ${originalPrice}
                </span>
                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  {singleProduct.discountPercentage}% OFF
                </span>
              </p>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {singleProduct.description}
              </p>

              {/* BUTTON */}
              {handleButton(singleProduct)}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-screen bg-white dark:bg-[#0a0a0a]">
          <Lottie.default
            animationData={notfound}
            className="w-[400px] h-[400px]"
            loop={true}
          />
        </div>
      )}
    </>
  );
};

export default SingleProduct;
