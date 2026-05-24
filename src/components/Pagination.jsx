import React from "react";

const getPages = (current, total) => {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }
  return pages;
};

const Pagination = ({ page, pageHandler, dynamicPage }) => {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 my-10 transition-colors duration-300">
      {/* PREV BUTTON */}
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
          ${
            page === 1
              ? "bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-white/[0.04] text-gray-300 dark:text-neutral-700 cursor-not-allowed"
              : "bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a] active:scale-95 cursor-pointer shadow-sm dark:shadow-none"
          }`}
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-1">
        {getPages(page, dynamicPage)?.map((item, index) => {
          const isNumber = typeof item === "number";
          const isActive = item === page;

          return (
            <span
              key={index}
              onClick={() => isNumber && pageHandler(item)}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-sm sm:text-base transition-all duration-200
                ${
                  isActive
                    ? "bg-black dark:bg-white text-white dark:text-black font-bold shadow-[0_4px_10px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_10px_rgba(255,255,255,0.15)]"
                    : isNumber
                      ? "text-neutral-600 dark:text-neutral-400 font-medium hover:bg-gray-100 dark:hover:bg-[#1a1a1a] hover:text-black dark:hover:text-white cursor-pointer active:scale-90"
                      : "text-neutral-400 dark:text-neutral-600 tracking-widest cursor-default select-none"
                }
              `}
            >
              {item}
            </span>
          );
        })}
      </div>

      {/* NEXT BUTTON */}
      <button
        disabled={page === dynamicPage}
        onClick={() => pageHandler(page + 1)}
        className={`flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
          ${
            page === dynamicPage
              ? "bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-white/[0.04] text-gray-300 dark:text-neutral-700 cursor-not-allowed"
              : "bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a] active:scale-95 cursor-pointer shadow-sm dark:shadow-none"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;