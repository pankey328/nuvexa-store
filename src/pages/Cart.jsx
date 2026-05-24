import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import emptyCart from '../assets/emptyCart.json'
import Lottie from "lottie-react";

const Cart = ({ location, getLocation }) => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      address: "",
      state: "",
      postcode: "",
      country: "",
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const savedData = localStorage.getItem("deliveryDetails");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (location) {
      setFormData((prev) => ({
        ...prev,
        address: location?.county || prev.address,
        state: location?.state || prev.state,
        postcode: location?.postcode || prev.postcode,
        country: location?.country || prev.country,
      }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });  
  }, [location]);

  const handleSaveDetails = () => {
    localStorage.setItem("deliveryDetails", JSON.stringify(formData));

    alert("Address details saved successfully!");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-100 dark:border-white/10 pb-6">
              <div>
                <h1 className="text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  Review & Checkout
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Your Cart
                </h2>
              </div>
              <span className="text-sm font-semibold text-neutral-500 bg-[#f5f5f7] dark:bg-[#141414] px-4 py-1.5 rounded-full">
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* LEFT COLUMN: Cart Items & Delivery Info */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
                {/* Cart Items List */}
                <div className="flex flex-col gap-4">
                  {cartItems?.map((item, index) => (
                    <div
                      key={index}
                      className="group flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300 gap-4 sm:gap-6"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-5 w-full sm:w-auto">
                        <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#f5f5f7] dark:bg-[#0a0a0a] rounded-2xl p-2 flex items-center justify-center">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        <div className="flex flex-col justify-center max-w-[200px] md:max-w-[300px]">
                          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug tracking-tight mb-1">
                            {item.title}
                          </h3>
                          <p className="text-base sm:text-lg font-bold text-neutral-500 dark:text-neutral-400">
                            ${item.price}
                          </p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-8">
                        {/* Quantity Pill */}
                        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#f5f5f7] dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#141414] text-lg font-medium text-black dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-black dark:text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#141414] text-lg font-medium text-black dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                          >
                            +
                          </button>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-90 transition-all duration-200"
                          title="Remove item"
                        >
                          <FaRegTrashAlt className="text-lg" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Info Section */}
                <div className="bg-[#f5f5f7] dark:bg-[#141414] rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 dark:border-white/5">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-8">
                    Delivery Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="Enter your street address"
                        className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        placeholder="State"
                        className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) =>
                          setFormData({ ...formData, postcode: e.target.value })
                        }
                        placeholder="ZIP / Pincode"
                        className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        placeholder="Country"
                        className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Contact number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                      />
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <button
                        onClick={handleSaveDetails}
                        className="w-full py-4 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-md hover:bg-black active:scale-[0.98] transition-all duration-300"
                      >
                        Save Address Details
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-8">
                    <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                      or
                    </span>
                    <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
                  </div>

                  <button
                    onClick={getLocation}
                    className="w-full py-4 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-neutral-900 dark:text-white font-semibold text-sm tracking-wide shadow-sm hover:border-black dark:hover:border-white active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                    Auto-Detect Location
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Order Summary (Sticky) */}
              <div className="lg:col-span-5 xl:col-span-4 h-max lg:sticky lg:top-24">
                <div className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none rounded-[2.5rem] p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
                    Order Summary
                  </h3>

                  <div className="flex flex-col gap-4 text-sm font-medium">
                    <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                      <span className="flex items-center gap-2">
                        <LuNotebookText className="text-lg opacity-70" />{" "}
                        Subtotal
                      </span>
                      <span className="text-neutral-900 dark:text-white">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                      <span className="flex items-center gap-2">
                        <MdDeliveryDining className="text-xl opacity-70" />{" "}
                        Shipping
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        <span className="text-neutral-400 line-through font-normal mr-2">
                          $25.00
                        </span>
                        Free
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                      <span className="flex items-center gap-2">
                        <GiShoppingBag className="text-lg opacity-70" />{" "}
                        Handling Fee
                      </span>
                      <span className="text-neutral-900 dark:text-white">
                        $5.00
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-white/10 w-full my-6"></div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-base font-semibold text-neutral-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tighter">
                      ${(totalPrice + 5).toFixed(2)}
                    </span>
                  </div>

                  {/* Promo Code */}
                  <div className="flex flex-col gap-3 mb-8">
                    <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="w-full px-4 py-3 bg-[#f5f5f7] dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                      />
                      <button className="px-5 py-3 rounded-xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 text-neutral-900 dark:text-white font-semibold text-sm hover:border-black dark:hover:border-white transition-all">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold text-base tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_12px_24px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    Secure Checkout
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                  <p className="text-center text-xs font-medium text-neutral-400 mt-4 flex items-center justify-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    End-to-End Encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-10">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-neutral-100 dark:bg-white/5 blur-3xl rounded-full scale-150"></div>
              <Lottie.default
                animationData={emptyCart}
                loop={false}
                className="w-[200px] sm:w-[280px] md:w-[350px] opacity-80 mix-blend-multiply dark:mix-blend-screen"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tighter mb-4">
              Your cart is empty.
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-medium max-w-md mb-10">
              Looks like you haven't added anything yet. Discover our latest
              products and power up your tech life.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_12px_24px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <span>Explore Products</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
