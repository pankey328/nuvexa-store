import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productSlice";
import FilterSection from "../components/FilterSection";
import { RingLoader } from "react-spinners";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
     window.scrollTo({ top: 0, behavior: "smooth" });          // scrolls up
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredData = data?.filter(
    (item) =>
      item?.title?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item?.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1],
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

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
          Loading Collection...
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
            Something went wrong: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* EXPANDED MAX-WIDTH FOR BETTER GRID BREATHING ROOM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          brand={brand}
          setBrand={setBrand}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
          {/* SIDEBAR WRAPPER */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              brand={brand}
              setBrand={setBrand}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
            />
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 w-full">
            {filteredData?.length > 0 ? (
              <div className="flex flex-col w-full">
                {/* REFINED GRID SYSTEM */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                  {filteredData
                    ?.slice(page * 8 - 8, page * 8)
                    .map((product, index) => {
                      return <ProductCard key={index} product={product} />;
                    })}
                </div>

                {/* PAGINATION WRAPPER */}
                <div className="mt-16 w-full flex justify-center">
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col justify-center items-center mt-10 sm:mt-20 w-full px-4 gap-6">
                <Lottie.default
                  animationData={notfound}
                  loop={true}
                  className="w-[200px] sm:w-[280px] md:w-[350px] opacity-80 mix-blend-multiply dark:mix-blend-screen"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                  No products found
                </h3>
                <p className="text-sm font-medium text-neutral-500 text-center max-w-sm">
                  We couldn't find any items matching your current filters. Try
                  adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
