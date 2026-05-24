import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("registeredUser", JSON.stringify(formData));
    // Redirect to the login page after successful signup
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 py-20 transition-colors duration-300">
      <div className="w-full max-w-md bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] rounded-[2.5rem] p-8 sm:p-12 shadow-[0_24px_48px_rgba(0,0,0,0.04)] dark:shadow-none">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tighter mb-2">
            Create an account
          </h1>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Join us to get the best tech and styles.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Jane Doe"
              required
              className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="name@example.com"
              required
              className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              required
              className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        {/* BOTTOM LINK */}
        <div className="mt-8 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-neutral-900 dark:text-white hover:underline transition-all"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
