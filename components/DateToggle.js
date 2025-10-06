"use client";

export default function DateToggle({ mode, onChange }) {
  // Date toggle logic — currently unused, reserved for future date-based filtering
  // mode: "relative" | "absolute"
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Date:</span>
      <button
        className={`px-3 py-1 rounded ${
          mode === "relative" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => onChange("relative")}
      >
        Relative
      </button>
      <button
        className={`px-3 py-1 rounded ${
          mode === "absolute" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => onChange("absolute")}
      >
        Absolute
      </button>
    </div>
  );
}
