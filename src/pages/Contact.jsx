import React, {useEffect} from "react";

const Contact = () => {
  // scrolls up smoothly...
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 transition-colors duration-300">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* LEFT SECTION: Info & Typography */}
        <div className="flex flex-col space-y-10 lg:space-y-14">
          <div className="space-y-6">
            <h1 className="text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest">
              Contact Us
            </h1>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 dark:text-white tracking-tighter leading-[1.1]">
              Get in touch <br className="hidden sm:block" />
              with{" "}
              <span className="text-neutral-400 dark:text-neutral-600">
                NuvexaStore
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 font-medium max-w-md leading-relaxed">
              Have a question about furniture, beauty products, fragrances, or
              groceries? We’re here to help you enjoy a smooth and reliable
              shopping experience with NuvexaStore.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Address Block */}
            <div className="group flex flex-col gap-4 p-6 rounded-3xl bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#0a0a0a] shadow-sm text-neutral-800 dark:text-white">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                  Address
                </h3>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  NuvexaStore HQ,
                  <br />
                  Jaipur, Rajasthan, India
                </p>
              </div>
            </div>

            {/* Contact Block */}
            <div className="group flex flex-col gap-4 p-6 rounded-3xl bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#0a0a0a] shadow-sm text-neutral-800 dark:text-white">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                  Direct Support
                </h3>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-0.5">
                  support@nuvexastore.com
                </p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  +91 12345 67890
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Form */}
        <div className="bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none w-full">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-neutral-900 dark:text-white text-sm font-medium rounded-2xl placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all duration-300"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-neutral-900 dark:text-white text-sm font-medium rounded-2xl placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all duration-300"
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Your Message
              </label>
              <textarea
                rows="4"
                placeholder="Tell us how we can help you with your order or products..."
                className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-neutral-900 dark:text-white text-sm font-medium rounded-2xl placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all duration-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-3 px-8 py-4 mt-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <span>Send Message</span>

              <svg
                className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
