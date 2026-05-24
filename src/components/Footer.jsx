import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-black/[0.04] dark:border-white/[0.06] pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Brand & Contact (Takes up 4 cols on large screens) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-neutral-900 dark:text-white hover:opacity-70 transition-opacity duration-300">
                NuvexaStore
              </h1>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-xs">
              Powering your world with the best in beauty, fragrances,
              furniture, and everyday groceries.
            </p>

            <div className="mt-6 space-y-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              <p>NuvexaStore HQ,</p>
              <p>Jaipur, Rajasthan, India</p>
              <p className="pt-2 hover:text-black dark:hover:text-white transition-colors cursor-pointer w-max">
                support@nuvexastore.com
              </p>
              <p className="hover:text-black dark:hover:text-white transition-colors cursor-pointer w-max">
                +91 12345 67890
              </p>
            </div>
          </div>

          {/* Column 2: Customer Service (Takes up 3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-6">
              Customer Service
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {[
                "Contact Us",
                "Shipping & Returns",
                "FAQs",
                "Order Tracking",
                "Size Guide",
              ].map((link, index) => (
                <li key={index} className="w-max">
                  <Link
                    to="#"
                    className="hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter & Socials (Takes up 5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-6">
              Stay in the Loop
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4">
              Subscribe to get special offers, free giveaways, and early access
              to new tech.
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-3.5 bg-[#f5f5f7] dark:bg-[#141414] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
              />
              <button
                type="submit"
                className="group px-6 py-3.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-300 shrink-0"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div>
              <h3 className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                {[FaFacebook, FaInstagram, FaTwitterSquare, FaPinterest].map(
                  (Icon, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full bg-[#f5f5f7] dark:bg-[#141414] border border-transparent hover:border-black/[0.06] dark:hover:border-white/10 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white hover:scale-110 active:scale-95 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    >
                      <Icon className="text-lg" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Legal */}
        <div className="mt-16 pt-8 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-neutral-900 dark:text-white">
              NuvexaStore
            </span>{" "}
            All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-medium text-neutral-400 dark:text-neutral-500">
            <Link
              to="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
