import React, { useEffect }  from "react";
import Carousel from "../components/Carousel";
import MidBanner from "../components/MidBanner";
import Features from "../components/Features";

const Home = () => {
  // scrolls up smoothly...
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Carousel />
      <MidBanner />
      <Features />
    </div>
  );
};

export default Home;
