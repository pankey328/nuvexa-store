import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      setError("No account found. Please sign up first!");
      return;
    }

    if (
      savedUser.email !== formData.email ||
      savedUser.password !== formData.password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    // If successful, log them into Redux and send them to the homepage
    dispatch(login({ name: savedUser.name, email: savedUser.email }));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 py-20 transition-colors duration-300">
      <div className="w-full max-w-md bg-[#f5f5f7] dark:bg-[#141414] border border-black/[0.04] dark:border-white/[0.06] rounded-[2.5rem] p-8 sm:p-12 shadow-[0_24px_48px_rgba(0,0,0,0.04)] dark:shadow-none">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tighter mb-2">
            Welcome back
          </h1>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Enter your details to access your account.
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setError("");
              }}
              placeholder="name@example.com"
              required
              className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <span className="text-[11px] font-bold text-neutral-900 dark:text-white hover:underline cursor-pointer">
                Forgot?
              </span>
            </div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setError("");
              }}
              placeholder="••••••••"
              required
              className="w-full px-5 py-4 bg-white dark:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold text-sm tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* BOTTOM LINK */}
        <div className="mt-8 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-neutral-900 dark:text-white hover:underline transition-all"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
