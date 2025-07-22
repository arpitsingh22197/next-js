"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/singup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isValid =
      user.email.length > 0 && user.password.length > 0 && user.username.length > 0;
    setButtonDisabled(!isValid);
  }, [user]);

  return (
    <div className={`relative w-full h-screen overflow-hidden ${darkMode ? "bg-black" : "bg-white"}`}>
      {/* 🎥 Spline Background */}
      <iframe
        src="https://my.spline.design/weirdbubblecopy-FO8CXXOfBkTVwGLFZZl7yKnT/"
        frameBorder="0"
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 z-10 ${darkMode ? "bg-black/60" : "bg-white/60"} backdrop-blur-sm`}
      />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full max-w-sm rounded-2xl shadow-2xl p-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <h1
            className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            {loading ? "Processing..." : "Sign Up"}
          </h1>
          <hr className="mb-6 border-gray-700" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label
              htmlFor="username"
              className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className={`w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-100 border-gray-300 text-black placeholder-gray-400"}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="email"
              className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-100 border-gray-300 text-black placeholder-gray-400"}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="password"
              className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-100 border-gray-300 text-black placeholder-gray-400"}`}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSignup}
            disabled={buttonDisabled}
            className={`w-full py-2 px-4 font-semibold text-lg rounded-full transition duration-300 shadow-md ${
              buttonDisabled
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {buttonDisabled ? "Fill all fields" : "Sign Up"}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/login"
              className={`block mx-auto w-max text-sm mt-4 transition ${
                darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Already have an account? Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}