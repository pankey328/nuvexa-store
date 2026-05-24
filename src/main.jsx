import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ScrollToTop
        smooth
        color="#ffffff"
        style={{
          backgroundColor: "#000000",
          borderRadius: "100%",
          width: "48px",
          height: "48px",
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          right: "1.75rem", 
          bottom: "6rem", 
          zIndex: 99,
        }}
      />
    </Provider>
  </StrictMode>,
);
