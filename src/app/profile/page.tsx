"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Detect system theme OR localStorage preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = savedTheme ?? (systemPrefersDark ? "dark" : "light");

    setTheme(initial);
    document.documentElement.classList.add(initial);
  }, []);

  // Apply theme to <html> and store in localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const logout = async () => {
    await axios.post("/api/users/logout");
    router.push("/login");
  };

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/me");
      const user = res.data?.data;
      setData(user?.username ?? "not found");
    } catch {
      setData("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow hover:scale-110 transition"
        >
          {theme === "dark" ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-blue-600" />
          )}
        </button>
      </div>

      {/* Profile Card */}
      <motion.div
        className="w-full max-w-md p-8 rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-2xl text-center border border-gray-300 dark:border-white/20 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-semibold mb-2">👤 Profile Page</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Welcome to your dashboard
        </p>

        <motion.button
          onClick={getUserDetail}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl transition mb-4"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Get Profile Details
        </motion.button>

        <div className="text-lg font-medium mb-4">
          {["nothing", "error", "not found"].includes(data) ? (
            <span className="text-gray-500">{data}</span>
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-blue-500 underline hover:text-blue-300 transition"
            >
              View Profile for {data}
            </Link>
          )}
        </div>

        <motion.button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-xl transition"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}
