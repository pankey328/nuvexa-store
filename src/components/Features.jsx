import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    <div className="w-full bg-white dark:bg-[#0a0a0a] border-y border-black/[0.04] dark:border-white/[0.06] py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="group flex items-start sm:items-center lg:items-start gap-4 p-4 sm:p-5 rounded-[2rem] hover:bg-[#f5f5f7] dark:hover:bg-[#141414] border border-transparent hover:border-black/[0.04] dark:hover:border-white/[0.04] cursor-default transition-all duration-300 ease-out"
              >
                {/* Icon Container */}
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] group-hover:bg-white dark:group-hover:bg-[#0a0a0a] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_8px_20px_rgba(255,255,255,0.04)] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <feature.icon
                    className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                {/* Typography block */}
                <div className="flex flex-col pt-1 sm:pt-0 lg:pt-1.5">
                  <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight mb-0.5">
                    {feature.text}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {feature.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
