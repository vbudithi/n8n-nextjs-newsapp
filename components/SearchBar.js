"use client";
export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search todays headlines....."
      className="w-full max-w-md px-4 py-2 rounded-md border border-gray-400 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  );
}
