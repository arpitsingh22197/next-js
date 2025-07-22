"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [isDark, setIsDark] = useState(false);

  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.style.backgroundColor = "#111827";
      document.documentElement.style.color = "#f9fafb";
      setIsDark(true);
    } else {
      document.documentElement.style.backgroundColor = "#ffffff";
      document.documentElement.style.color = "#111827";
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.style.backgroundColor = "#111827";
      document.documentElement.style.color = "#f9fafb";
    } else {
      document.documentElement.style.backgroundColor = "#ffffff";
      document.documentElement.style.color = "#111827";
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/me");
      const user = res.data?.data;
      if (user && user._id) {
        setData(user.username);
      } else {
        setData("not found");
      }
    } catch (error) {
      setData("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
      >
        {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
      </button>

      {/* Animated Profile Box */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-4">🌟 Profile Page</h1>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
          Welcome to your dashboard
        </p>

        <button
          onClick={getUserDetail}
          className="bg-blue-600 text-white w-full py-2 rounded-xl mb-4 hover:bg-blue-700 transition"
        >
          Get Profile Details
        </button>

        {data !== "nothing" && (
          <div className="mb-4 text-center text-lg">
            <Link
              href={`/profile/${data}`}
              className="text-blue-500 underline hover:text-blue-300 transition"
            >
              View Profile for {data}
            </Link>
          </div>
        )}

        <button
          onClick={logout}
          className="bg-red-600 text-white w-full py-2 rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}
