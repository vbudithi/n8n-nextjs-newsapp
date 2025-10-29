import React from "react";

export default function StoryTags({ tags = [], limit = 4 }) {
  if (!Array.isArray(tags) || tags.length === 0) return null;
  const tagColorMap = {
    AI: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    "Software Development": "bg-blue-100 text-blue-700 hover:bg-blue-200",
    "Mobile Tech": "bg-teal-100 text-teal-700 hover:bg-teal-200",
    Startups: "bg-green-100 text-green-700 hover:bg-green-200",
    "Machine Learning": "bg-pink-100 text-pink-700 hover:bg-pink-200",
    "Cloud Computing": "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    SaaS: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    "Social Media": "bg-red-100 text-red-700 hover:bg-red-200",
    Cybersecurity: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    "Data Science": "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
    "E-commerce": "bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200",
    IoT: "bg-lime-100 text-lime-700 hover:bg-lime-200",
    "Healthcare Tech": "bg-rose-100 text-rose-700 hover:bg-rose-200",
    EdTech: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    "AR/VR": "bg-violet-100 text-violet-700 hover:bg-violet-200",
    Gaming: "bg-sky-100 text-sky-700 hover:bg-sky-200",
    "Climate Tech": "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    Robotics: "bg-amber-200 text-amber-800 hover:bg-amber-300",
    "Quantum Computing": "bg-slate-100 text-slate-700 hover:bg-slate-200",
    Fintech: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300",
    ML: "bg-purple-200 text-purple-800 hover:bg-purple-300",
    "5G": "bg-blue-200 text-blue-800 hover:bg-blue-300",
    "Real Estate": "bg-green-200 text-green-800 hover:bg-green-300",
    "Mobile Tech": "bg-teal-100 text-teal-700 hover:bg-teal-200", // safe repeat
    EdTech: "bg-amber-100 text-amber-700 hover:bg-amber-200", // safe repeat
  };
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.slice(0, limit).map((tag, index) => {
        const colorClasses =
          tagColorMap[tag] || "bg-zinc-100 text-zinc-700 hover:bg-zinc-200";

        return (
          <span
            key={index}
            className={`px-3 py-1 text-xs font-medium rounded-full transition ${colorClasses}`}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
