import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";
import axios from "axios";

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const navigate = useNavigate();

  const getFilterData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`,
      );
      setSearchData(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilterData();
    window.scrollTo(0, 0);
  }, [category]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] lg:min-h-screen gap-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <RingLoader
          color="#888888" 
          loading={loading}
          size={50}
          speedMultiplier={0.8}
        />
        <p className="text-sm font-medium text-neutral-500 tracking-widest uppercase">
          Loading Collection...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      {searchData.length > 0 ? (
        <div
          className="max-w-6xl mx-auto
          px-4 sm:px-6 lg:px-8
          pt-8 sm:pt-10
          pb-12 sm:pb-16"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 sm:mb-10
            flex items-center gap-2
            px-4 sm:px-5 py-2.5 sm:py-3
            rounded-full
            bg-[#f5f5f7] dark:bg-[#141414]
            border border-gray-100 dark:border-white/[0.06]
            text-neutral-800 dark:text-neutral-200
            text-sm font-medium tracking-wide
            hover:bg-white dark:hover:bg-[#1a1a1a]
            hover:border-gray-200 dark:hover:border-white/10
            hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.08)]
            active:scale-[0.97]
            transition-all duration-500
            ease-[cubic-bezier(0.25,1,0.5,1)]"
          >
            <ChevronLeft
              className="w-4 h-4 sm:w-5 sm:h-5
              transition-transform duration-300
              group-hover:-translate-x-0.5"
            />
            Back
          </button>

          {/* Product List */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {searchData?.map((product, index) => {
              return <ProductListView key={index} product={product} />;
            })}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center
          min-h-[75vh]
          px-4"
        >
          <div
            className="flex flex-col items-center justify-center
            bg-[#f5f5f7] dark:bg-[#141414]
            rounded-[32px]
            border border-gray-100 dark:border-white/[0.06]
            px-6 sm:px-10 py-8 sm:py-10
            shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            <Lottie
              animationData={notfound}
              className="w-[260px] h-[260px] sm:w-[420px] sm:h-[420px]"
              loop={true}
            />

            <p
              className="mt-2 sm:mt-4
              text-sm sm:text-base
              text-neutral-500 dark:text-neutral-400
              font-medium tracking-wide"
            >
              No products found in this collection
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
