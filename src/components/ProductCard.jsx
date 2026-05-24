import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  function handleAdd(product) {
    dispatch(addToCart(product));
  }

  function handleButton(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      return (
        <div
          className="w-full mt-3 sm:mt-4 flex items-center justify-between
          rounded-full bg-[#f5f5f7] p-1 sm:p-1.5"
        >
          {/* Decrease */}
          <button
            onClick={() => dispatch(decreaseQuantity(product.id))}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0
            text-base sm:text-lg font-medium text-black bg-white rounded-full
            shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-gray-50 
            active:scale-90 transition-all duration-300"
          >
            -
          </button>

          {/* Quantity */}
          <p className="text-xs sm:text-sm font-semibold text-black min-w-[32px] sm:min-w-[40px] text-center tracking-wide truncate">
            {exist.quantity}
          </p>

          {/* Increase */}
          <button
            onClick={() => dispatch(increaseQuantity(product.id))}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0
            text-base sm:text-lg font-medium text-black bg-white rounded-full
            shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-gray-50 
            active:scale-90 transition-all duration-300"
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => handleAdd(product)}
          className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2
          px-2 sm:px-6 py-2.5 sm:py-3.5 rounded-full flex-nowrap
          text-white font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap
          bg-black hover:bg-neutral-800
          active:scale-[0.97] transition-all duration-300 ease-out"
        >
          <IoCartOutline className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span>Add to Cart</span>
        </button>
      );
    }
  }

  return (
    <div
      className="group flex flex-col justify-between
      bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5
      border border-gray-100 hover:border-gray-200
      hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]
      transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
      h-full min-h-[300px] sm:min-h-[380px] md:min-h-[420px]"
    >
      {/* IMAGE */}
      <div
        className="relative w-full flex-1 bg-[#f5f5f7] rounded-xl sm:rounded-2xl
        overflow-hidden flex items-center justify-center cursor-pointer min-h-[140px] sm:min-h-[180px]"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-4 sm:p-6 mix-blend-multiply
          group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
      </div>

      {/* INFO */}
      <div
        className="mt-3 sm:mt-4 flex flex-col gap-1 px-1 cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <h1 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-900 leading-snug tracking-tight">
          {product.title}
        </h1>

        <p className="text-xs sm:text-sm md:text-base font-medium text-neutral-500">
          ${product.price}
        </p>
      </div>

      {/* ACTION BUTTON */}
      {handleButton(product)}
    </div>
  );
};

export default ProductCard;
