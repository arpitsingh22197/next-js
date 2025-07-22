"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [user, setUser] = useState({ email: "", password: "" })
  const [buttonDisable, setButtonDisabled] = useState(false)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Logged in", response.data)
      router.push("/profile")
    } catch (error) {
      console.log("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0))
  }, [user])

  const bgOverlay = isDarkMode ? "bg-black/60" : "bg-white/60"
  const cardBg = isDarkMode ? "bg-gray-900/90" : "bg-gray-100/90"
  const textColor = isDarkMode ? "text-white" : "text-black"
  const labelColor = isDarkMode ? "text-gray-300" : "text-gray-700"
  const inputBg = isDarkMode
    ? "bg-gray-800 text-white placeholder-gray-500 border-gray-700"
    : "bg-white text-black placeholder-gray-400 border-gray-300"
  const linkColor = isDarkMode
    ? "text-gray-400 hover:text-gray-200"
    : "text-gray-600 hover:text-gray-900"

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🎥 Spline Background */}
      <iframe
        src="https://my.spline.design/lathegradientscopy-QnlrkqZW0YjR80uvCkTRjfHn/" // <- Replace with your Spline URL
        frameBorder="0"
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* 🌓 Dark Overlay for better contrast */}
      <div className={`absolute inset-0 ${bgOverlay} z-10 backdrop-blur-sm`} />

      {/* 🧾 Login Card */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full max-w-sm ${cardBg} rounded-2xl shadow-2xl p-8 relative`}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform duration-200"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          <h1 className={`text-3xl font-extrabold text-center mb-6 ${textColor}`}>
            {loading ? "Logging in..." : "Welcome Back 👋"}
          </h1>
          <hr className={`mb-6 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`} />

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className={`block mb-2 text-sm font-medium ${labelColor}`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="password" className={`block mb-2 text-sm font-medium ${labelColor}`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            />
          </motion.div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            disabled={buttonDisable}
            className={`w-full py-2 px-4 text-white font-semibold text-lg rounded-full transition duration-300 shadow-md ${
              buttonDisable
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Processing..." : "Login"}
          </motion.button>

          {/* Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/singup"
              className={`block mx-auto w-max text-sm mt-4 ${linkColor} transition duration-300`}
            >
              Don't have an account? Sign up
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
