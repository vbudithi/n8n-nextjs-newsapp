"use client";

import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search news, topics, or ask anything..."
        className="w-full pl-14 pr-12 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
