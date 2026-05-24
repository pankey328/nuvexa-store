import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";
import { IoCartOutline } from "react-icons/io5";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  function handleButton(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      return (
        <div className="w-full sm:w-[160px] h-12 mt-4 sm:mt-5 flex items-center justify-between rounded-full bg-[#f5f5f7] dark:bg-[#141414] p-1.5 border border-transparent dark:border-white/5">
          <button
            onClick={() => dispatch(decreaseQuantity(product.id))}
            className="w-9 h-9 flex items-center justify-center shrink-0 text-lg font-medium text-black dark:text-white bg-white dark:bg-[#0a0a0a] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            -
          </button>
          <p className="text-sm font-semibold text-black dark:text-white px-2 tabular-nums">
            {exist.quantity}
          </p>
          <button
            onClick={() => dispatch(increaseQuantity(product.id))}
            className="w-9 h-9 flex items-center justify-center shrink-0 text-lg font-medium text-black dark:text-white bg-white dark:bg-[#0a0a0a] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full sm:w-[160px] h-12 mt-4 sm:mt-5 flex items-center justify-center gap-2 px-4 rounded-full text-white dark:text-black bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.97] transition-all duration-300 font-semibold text-sm tracking-wide shrink-0"
        >
          <IoCartOutline className="w-5 h-5 shrink-0" />
          <span className="whitespace-nowrap">Add to Cart</span>
        </button>
      );
    }
  }

  return (
    <div className="group w-full mb-4 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-[2rem] p-4 sm:p-5 hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-center sm:items-start">
        {/* IMAGE CONTAINER */}
        <div
          onClick={() => navigate(`/products/${product.id}`)}
          className="shrink-0 relative w-full sm:w-48 md:w-56 h-48 md:h-56 bg-[#f5f5f7] dark:bg-[#141414] rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain p-4 mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          />
        </div>

        {/* INFO CONTAINER */}
        <div className="flex flex-col justify-center w-full py-1 sm:py-2">
          <h1
            onClick={() => navigate(`/products/${product.id}`)}
            className="font-bold text-lg md:text-xl text-neutral-900 dark:text-white line-clamp-2 cursor-pointer hover:text-black dark:hover:text-neutral-300 tracking-tight leading-snug mb-2 sm:mb-3"
          >
            {product.title}
          </h1>

          <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
            <span className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tighter">
              ${product.price}
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
              {product.discountPercentage}% off
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed">
              FREE delivery{" "}
              <span className="font-bold text-neutral-900 dark:text-white">
                Fri, 18 Apr
              </span>
            </p>
            <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Or fastest delivery{" "}
              <span className="font-bold text-neutral-900 dark:text-white">
                Tomorrow, 17 Apr
              </span>
            </p>
          </div>

          {/* ACTION BUTTON */}
          <div className="w-full sm:w-max">{handleButton(product)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
