"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg text-center border border-gray-200 relative overflow-hidden">
        {/* Animated icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <FaExclamationTriangle className="text-yellow-400 text-7xl drop-shadow" />
        </motion.div>

        <h1 className="text-4xl font-extrabold mt-6 mb-2 text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          It looks like the page you’re trying to reach doesn’t exist or has
          been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
        >
          Return to NewsPilot
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
