import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { logout } from "../redux/slices/authSlice";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  // AUTH STATE
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [openNav, setOpenNav] = useState(false);
  const currentLocation = useLocation();

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Logo & Location */}
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Logo */}
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-neutral-900 dark:text-white hover:opacity-70 transition-opacity duration-300">
                NuvexaStore
              </h1>
            </Link>

            {/* Premium Location Pill */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#f5f5f7] dark:bg-[#141414] border border-transparent hover:border-black/[0.06] dark:hover:border-white/10 transition-all duration-300 cursor-pointer relative group">
              <div className="bg-white dark:bg-[#0a0a0a] shadow-sm p-2 rounded-full border border-black/[0.04] dark:border-white/[0.04] group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-neutral-900 dark:text-white h-4 w-4" />
              </div>

              <div className="flex flex-col justify-center min-w-[120px]">
                {location ? (
                  <>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight leading-none mb-1">
                      {location.county}
                    </p>
                    <p className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest leading-none line-clamp-1">
                      {location.state}
                      {location.postcode && ` • ${location.postcode}`}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                    Set Location
                  </p>
                )}
              </div>

              <div className="pl-1" onClick={toggleDropdown}>
                <FaCaretDown className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors cursor-pointer" />
              </div>

              {/* FLOATING DROPDOWN CARD */}
              {openDropdown && (
                <div className="absolute top-[120%] left-0 w-72 bg-white dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.08] rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-5 z-50 origin-top-left animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between mb-5">
                    <h1 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                      Change Location
                    </h1>
                    <button
                      onClick={toggleDropdown}
                      className="text-neutral-400 hover:text-black dark:hover:text-white p-2 rounded-full bg-[#f5f5f7] dark:bg-[#0a0a0a] active:scale-90 transition-all"
                    >
                      <CgClose size={14} />
                    </button>
                  </div>

                  <button
                    onClick={getLocation}
                    className="group w-full flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black text-sm font-semibold px-4 py-3.5 rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                  >
                    <span>Auto-Detect Location</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Navigation & Cart */}
          <nav className="flex items-center gap-5 sm:gap-8">
            {/* DESKTOP LINKS */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((item) => {
                const isActive = currentLocation.pathname === item.to;
                return (
                  <li key={item.to} className="relative group">
                    <Link
                      to={item.to}
                      className={`transition-colors duration-300 ${
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {/* Minimal Centered Underline Indicator */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -bottom-2 h-[3px] rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? "w-5 bg-black dark:bg-white"
                          : "w-0 bg-neutral-300 dark:bg-neutral-600 group-hover:w-5"
                      }`}
                    />
                  </li>
                );
              })}
            </ul>

            {/* AUTHENTICATION BUTTONS (LOGIN / SIGNUP / LOGOUT) */}
            <div className="hidden sm:flex items-center gap-3 border-l border-gray-200 dark:border-white/10 pl-6 ml-2">
              {isAuthenticated ? (
                // LOGGED IN STATE
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="w-7 h-7 text-neutral-300 dark:text-neutral-600" />
                    <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                      {user?.name || "User"}
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(logout())}
                    className="px-4 py-2 rounded-full text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white hover:bg-[#f5f5f7] dark:hover:bg-[#141414] active:scale-95 transition-all"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                // LOGGED OUT STATE
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* CART BUTTON */}
              <Link to="/cart" className="relative group">
                <div className="p-2.5 sm:p-3 rounded-full bg-[#f5f5f7] dark:bg-[#141414] border border-transparent hover:border-black/[0.06] dark:hover:border-white/[0.08] group-hover:bg-white dark:group-hover:bg-[#0a0a0a] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_8px_20px_rgba(255,255,255,0.04)] active:scale-95 transition-all duration-300">
                  <IoCartOutline className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </div>

                {/* Dynamic Badge */}
                <span className="absolute -top-1 -right-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white dark:ring-[#0a0a0a]">
                  {cartItems.length}
                </span>
              </Link>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setOpenNav(!openNav)}
                className="p-2.5 rounded-full bg-transparent hover:bg-[#f5f5f7] dark:hover:bg-[#141414] active:scale-90 transition-all md:hidden text-neutral-800 dark:text-white"
              >
                {openNav ? (
                  <HiMenuAlt3 className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
      </div>
    </header>
  );
};

export default Navbar;
