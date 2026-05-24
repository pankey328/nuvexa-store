import React, { useEffect } from "react";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";
import { RingLoader } from "react-spinners";

const Carousel = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  //  Floating Prev Arrow
  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute z-20 left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <AiOutlineArrowLeft className="text-black dark:text-white w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </div>
    );
  };

  //  Floating Next Arrow
  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute z-20 right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <AiOutlineArrowRight className="text-black dark:text-white w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    );
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  //  LOADING STATE
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] lg:min-h-screen gap-6 bg-white dark:bg-[#0a0a0a]">
        <RingLoader
          color="#111111"
          loading={loading}
          size={50}
          speedMultiplier={0.8}
        />
        <p className="text-sm font-medium text-neutral-500 tracking-widest uppercase">
          Curating Highlights...
        </p>
      </div>
    );
  }

  //  ERROR STATE
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white dark:bg-[#0a0a0a]">
        <div className="px-6 py-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
          <p className="text-sm font-medium text-red-600 dark:text-red-400 tracking-wide">
            Unable to load showcase: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white dark:bg-[#0a0a0a] overflow-hidden">
      <Slider.default {...settings} className="w-full">
        {data?.slice(115, 122)?.map((item, index) => {
          return (
            <div key={index} className="w-full outline-none">
              {/* SLIDE BACKGROUND & CONTAINER */}
              <div className="relative w-full bg-[#f5f5f7] dark:bg-[#141414] overflow-hidden">
                {/* Subtle Ambient Background Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white dark:bg-white/5 blur-[100px] rounded-full opacity-60"></div>
                </div>

                <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 min-h-[600px] lg:min-h-[700px] px-6 sm:px-12 md:px-20 py-16 md:py-0 max-w-7xl mx-auto">
                  {/* TEXT SIDE */}
                  <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-5 sm:space-y-6">
                    <h3 className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">
                      Featured Collection
                    </h3>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tighter leading-[1.1] md:leading-[1.1] line-clamp-3">
                      {item.title}
                    </h1>

                    <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-lg line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    <button className="group mt-4 sm:mt-6 flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_12px_24px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
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

                  {/* IMAGE SIDE */}
                  <div className="flex-1 flex justify-center w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px]">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider.default>

      {/* CATEGORY COMPONENT */}
      <Category />
    </div>
  );
};

export default Carousel;
