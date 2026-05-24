import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const About = () => {
  // scrolls up smoothly...
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
        {/* HERO SECTION */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 lg:space-y-8 mt-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 dark:text-white tracking-tighter">
            About{" "}
            <span className="text-neutral-300 dark:text-neutral-700">
              NuvexaStore
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            Welcome to{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              NuvexaStore
            </span>
            , your all-in-one destination for premium furniture, beauty
            essentials, luxury fragrances, and daily groceries. We bring
            comfort, style, and convenience right to your doorstep with
            carefully curated products and a seamless shopping experience.
          </p>
        </div>

        {/* BENTO GRID (Mission & Vision) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission Card */}
          <div className="bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 hover:-translate-y-1 transition-transform duration-500">
            <h2 className="text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 leading-snug tracking-tight">
              To make everyday living better by offering high-quality furniture,
              beauty products, fragrances, and groceries in one trusted
              platform. We aim to bring affordability, quality, and convenience
              together for every household.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 hover:-translate-y-1 transition-transform duration-500">
            <h2 className="text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
              Our Vision
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 leading-snug tracking-tight">
              We envision NuvexaStore as a leading lifestyle marketplace where
              customers can effortlessly shop for everything they need — from
              elegant home furniture to personal care, luxury scents, and daily
              essentials — all in one place.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="bg-neutral-900 dark:bg-[#141414] border border-transparent dark:border-white/[0.06] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 w-full">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[11px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
              The NuvexaStore Standard
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Why Choose Us?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {[
              "Premium furniture crafted for comfort and modern living",
              "High-quality beauty and skincare essentials",
              "Authentic fragrances for every mood and occasion",
              "Fresh groceries delivered quickly and reliably",
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white shrink-0 shadow-inner">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-lg text-neutral-300 font-medium leading-relaxed pt-1.5">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="flex flex-col items-center text-center pt-8 pb-10">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-5">
            Join the NuvexaStore Family
          </h3>

          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mb-10 font-medium">
            From stylish furniture to everyday essentials, beauty care, and
            luxury fragrances — NuvexaStore is built for every part of your
            lifestyle. Shop smarter, live better.
          </p>

          <Link to={"/products"}>
            <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_12px_24px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
              <span>Start Shopping</span>

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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
