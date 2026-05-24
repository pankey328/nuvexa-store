import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./components/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";
import Signup from "./pages/Signup"; 
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Chatbot from "./components/Chatbot";

function App() {
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        console.log(`exactLocation`, exactLocation);
        setLocation(exactLocation);
        localStorage.setItem("location", JSON.stringify(exactLocation));
        setOpenDropdown(false);
      } catch (error) {
        console.log("Reverse geocoding error:", error);
      }
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("location");

    if (saved) {
      setLocation(JSON.parse(saved));
    } else {
      getLocation();
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/category/:category" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart location={location} getLocation={getLocation} />
            </Protected>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
