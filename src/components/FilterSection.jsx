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
    <div className="hidden lg:flex flex-col gap-8 w-full bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-max">
      {/* SEARCH BAR */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Search
        </h1>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#f5f5f7] border border-transparent hover:border-gray-200 focus:border-black focus:bg-white rounded-2xl px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-all duration-300"
        />
      </div>

      <hr className="border-gray-100" />

      {/* CATEGORY FILTER */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
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
                  className="w-4 h-4 accent-black rounded border-gray-300 cursor-pointer transition-all"
                />
                <span className="text-sm font-medium text-neutral-600 group-hover:text-black capitalize transition-colors duration-200">
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* BRAND FILTER */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Brand
        </h1>
        <div className="relative">
          <select
            value={brand}
            onChange={handleBrandChange}
            className="w-full appearance-none bg-[#f5f5f7] border border-transparent hover:border-gray-200 focus:border-black focus:bg-white rounded-2xl px-4 py-3 text-sm font-medium text-neutral-800 outline-none cursor-pointer transition-all duration-300"
          >
            {brandOnlyData?.map((item, index) => {
              return (
                <option key={index} value={item}>
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
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* PRICE RANGE */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
            Price Range
          </h1>
          <span className="text-xs font-bold text-black bg-[#f5f5f7] px-2 py-1 rounded-md">
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
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
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
        className="w-full mt-2 py-3.5 rounded-2xl text-sm font-semibold text-neutral-700 bg-white border border-gray-200 hover:text-black hover:border-black hover:bg-[#f5f5f7] active:scale-[0.97] transition-all duration-300 ease-out"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
