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
        className="!flex !items-center !justify-center !rounded-full !shadow-xl bg-black dark:bg-white text-white dark:text-black transition-colors duration-300"
        style={{
          width: "48px",
          height: "48px",
          right: "1.75rem",
          bottom: "6rem",
          zIndex: 99,
        }}
      />
    </Provider>
  </StrictMode>,
);
