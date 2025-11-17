import React from "react";

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl shadow bg-white border border-gray-200 overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="w-full h-48 bg-gray-200"></div>

      <div className="p-4 space-y-3">
        {/* Skeleton Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>

        {/* Skeleton Description */}
        <div className="h-4 bg-gray-200 rounded w-full"></div>

        <div className="flex justify-between items-center mt-3">
          {/* Skeleton Date (Left) */}
          <div className="h-4 w-20 bg-gray-300 rounded"></div>

          {/* Skeleton Tags (Right) */}
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
