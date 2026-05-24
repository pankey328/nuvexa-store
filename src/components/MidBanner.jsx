import React from "react";
import banner from "../assets/banner1.jpg";
import { useNavigate } from "react-router-dom";

const MidBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white dark:bg-[#0a0a0a] py-12 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div
        className="relative max-w-7xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-none h-[500px] md:h-[600px] group"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 flex items-center justify-center transition-opacity duration-700">
          <div className="relative z-10 text-center text-white px-6 sm:px-12 flex flex-col items-center">
            {/* Eyebrow */}
            <p className="text-[10px] sm:text-xs font-bold text-white/70 uppercase tracking-[0.2em] mb-4 sm:mb-6">
              Curated Lifestyle Essentials
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 max-w-4xl drop-shadow-lg">
              Elevate Your Home, Beauty & Everyday Living
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-md">
              Discover premium furniture, beauty essentials, luxury fragrances,
              and daily groceries — all carefully curated to bring comfort,
              style, and convenience to your lifestyle with NuvexaStore.
            </p>

            {/* Button */}
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-[0_8px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <span>Shop Now</span>

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
        </div>
      </div>
    </div>
  );
};

export default MidBanner;
