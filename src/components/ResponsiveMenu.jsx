import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Bring in our Authentication State
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setOpenNav(false);
    navigate("/");
  };

  return (
    <>
      {/* Dark backdrop overlay */}
      <div
        onClick={() => setOpenNav(false)}
        className={`fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-500 ${
          openNav ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between w-[85%] max-w-[320px] h-screen bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl px-8 pb-10 pt-16 md:hidden rounded-r-[2.5rem] border-r border-gray-100 dark:border-white/10 shadow-[20px_0_60px_rgba(0,0,0,0.08)] dark:shadow-[20px_0_60px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          openNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* DYNAMIC USER PROFILE CARD */}
          <div className="flex items-center gap-4 mb-10 p-4 rounded-3xl bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.04]">
            <div className="w-12 h-12 shrink-0 rounded-full bg-white dark:bg-[#0a0a0a] flex items-center justify-center shadow-sm text-neutral-400 dark:text-neutral-500">
              <FaUserCircle size={28} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight leading-none mb-1.5 line-clamp-1">
                {isAuthenticated
                  ? `Hello, ${user?.name?.split(" ")[0]}`
                  : "Welcome, Guest"}
              </h1>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none">
                {isAuthenticated ? "Premium User" : "NuvexaStore"}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-col gap-6">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((item) => {
                const isActive = currentLocation.pathname === item.to;

                return (
                  <li key={item.to} className="relative group w-max">
                    <Link
                      to={item.to}
                      onClick={() => setOpenNav(false)}
                      className={`block text-3xl font-extrabold tracking-tighter transition-colors duration-300 ${
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {/* underline animation */}
                    <span
                      className={`absolute left-0 -bottom-1.5 h-[3px] rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? "w-8 bg-black dark:bg-white"
                          : "w-0 bg-neutral-300 dark:bg-neutral-600 group-hover:w-8"
                      }`}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* BOTTOM SECTION: Mobile Auth Buttons & Branding */}
        <div className="mt-auto pt-10">
          <div className="flex flex-col gap-3 mb-8">
            {isAuthenticated ? (
              // LOGGED IN: Show Logout
              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-2xl bg-[#f5f5f7] dark:bg-[#141414] text-neutral-900 dark:text-white font-bold text-sm tracking-wide hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300"
              >
                Log Out
              </button>
            ) : (
              // LOGGED OUT: Show Login / Signup
              <>
                <Link
                  to="/signup"
                  onClick={() => setOpenNav(false)}
                  className="w-full flex items-center justify-center py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all duration-300"
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  onClick={() => setOpenNav(false)}
                  className="w-full flex items-center justify-center py-4 rounded-2xl bg-[#f5f5f7] dark:bg-[#141414] text-neutral-900 dark:text-white font-bold text-sm tracking-wide active:scale-[0.98] transition-all duration-300"
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
            NuvexaStore © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;
