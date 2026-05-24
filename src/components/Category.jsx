import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.products);

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((item) => {
      return item[property];
    });
    newVal = [...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueCategory(data, "category");

  return (
    <div className="w-full bg-white dark:bg-[#0a0a0a] border-t border-black/[0.04] dark:border-white/[0.06] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-5 sm:space-y-6">
        {/* Subtle Section Label */}
        <h3 className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] text-center">
          Browse by Category
        </h3>

        {/* Category Pills Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {categoryOnlyData.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(`/category/${item}`)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full 
              bg-white dark:bg-[#141414] 
              border border-gray-200 dark:border-white/10 
              text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 capitalize 
              shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.05)]
              hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white 
              hover:-translate-y-0.5 active:translate-y-0 active:scale-95 
              transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
