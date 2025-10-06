"use client";
import React from "react";
import { ClipLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <ClipLoader color="#3b82F6" size={80} aria-label="Loading Spinner" />

        {/* Text below spinner */}
        <p className="mt-6 text-blue-600 font-semibold text-lg animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default loading;
