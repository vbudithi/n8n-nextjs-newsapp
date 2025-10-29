import React from "react";

//summary for hero section (first 3 sentences)
export const SummaryHero = ({ summary }) => {
  let normalizedSummary = [];
  try {
    normalizedSummary = Array.isArray(summary)
      ? summary
      : typeof summary === "string"
      ? JSON.parse(summary)
      : [];
  } catch (error) {
    console.error("Error normalizing summary:", error);
  }
  const sentence = normalizedSummary[0]
    ? normalizedSummary[0]
        .split(/(?<=[.?!])\s+/)
        .slice(0, 3)
        .join(" ")
    : "";

  if (!sentence) return null;

  return (
    <p className="text-lg text-gray-700 leading-relaxed font-medium">
      {sentence}
    </p>
  );
};

//summary for homepage and articles page
export const SummarySnippet = ({ summary }) => {
  let normalizedSummary = [];
  try {
    normalizedSummary = Array.isArray(summary)
      ? summary
      : typeof summary === "string" && summary.trim().startsWith("[")
      ? JSON.parse(summary)
      : [summary];
  } catch (error) {
    normalizedSummary = [];
    console.error("Error normalizing summary:", error);
  }

  const sentence = normalizedSummary[0]
    ? normalizedSummary[0]
        .split(/(?<=[.?!])\s+/)
        .slice(0, 1)
        .join(" ")
    : "";

  if (!sentence) return null;

  return <p className="text-sm text-gray-500 truncate">{sentence}...</p>;
};

//summary for article page
export const SummarySection = ({ summary }) => {
  let normalizedSummary = [];
  try {
    normalizedSummary = Array.isArray(summary)
      ? summary
      : typeof summary === "string"
      ? JSON.parse(summary)
      : [];
  } catch (error) {
    console.error("Failed to parse summary:", error);
    normalizedSummary = [];
  }

  if (!normalizedSummary.length) return null;

  return (
    <section>
      <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
        {normalizedSummary.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </section>
  );
};
