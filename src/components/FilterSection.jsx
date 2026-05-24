import React from "react";
import { useSelector } from "react-redux";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { data } = useSelector((state) => state.products);

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((item) => {
      return item?.[property];
    });
    newVal = ["All", ...new Set(newVal)].filter((val) => val !== undefined);
    return newVal;
  };

  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");

  return (
    <div className="hidden lg:flex flex-col gap-8 w-full bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-6 border border-gray-100 dark:border-white/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none h-max transition-colors duration-300">
      {/* SEARCH BAR */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          Search
        </h1>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#f5f5f7] dark:bg-[#141414] border border-transparent hover:border-gray-200 dark:hover:border-white/10 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-[#1a1a1a] rounded-2xl px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white outline-none transition-all duration-300"
        />
      </div>

      <hr className="border-gray-100 dark:border-white/[0.06] transition-colors duration-300" />

      {/* CATEGORY FILTER */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          Category
        </h1>
        <div className="flex flex-col gap-3">
          {categoryOnlyData?.map((item, index) => {
            return (
              <label
                key={index}
                className="group flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={item}
                  checked={category === item}
                  value={item}
                  onChange={handleCategoryChange}
                  className="w-4 h-4 accent-black dark:accent-white rounded border-gray-300 dark:border-neutral-700 cursor-pointer transition-all"
                />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white capitalize transition-colors duration-200">
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-white/[0.06] transition-colors duration-300" />

      {/* BRAND FILTER */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          Brand
        </h1>
        <div className="relative text-black dark:text-white">
          <select
            value={brand}
            onChange={handleBrandChange}
            className="w-full appearance-none bg-[#f5f5f7] dark:bg-[#141414] border border-transparent hover:border-gray-200 dark:hover:border-white/10 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-[#1a1a1a] rounded-2xl px-4 py-3 text-sm font-medium text-neutral-800 dark:text-white outline-none cursor-pointer transition-all duration-300"
          >
            {brandOnlyData?.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item}
                  className="bg-white dark:bg-[#141414]"
                >
                  {item.toUpperCase()}
                </option>
              );
            })}
          </select>
          {/* Custom sleek dropdown arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 dark:border-white/[0.06] transition-colors duration-300" />

      {/* PRICE RANGE */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Price Range
          </h1>
          <span className="text-xs font-bold text-black dark:text-white bg-[#f5f5f7] dark:bg-[#141414] border border-transparent dark:border-white/5 px-2 py-1 rounded-md transition-colors duration-300">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          value={priceRange[1]}
          min="0"
          max="5000"
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full h-1.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
        />
      </div>

      {/* RESET BUTTON */}
      <button
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 5000]);
        }}
        className="w-full mt-2 py-3.5 rounded-2xl text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/[0.08] hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:bg-[#f5f5f7] dark:hover:bg-[#141414] active:scale-[0.97] transition-all duration-300 ease-out"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
