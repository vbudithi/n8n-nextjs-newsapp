"use client";
import { formatAbsolute } from "@/app/lib/date";

export default function DateText({ iso, className = "" }) {
  const txt = formatAbsolute(iso);
  return <p className={`text-sm text-gray-500 ${className}`}>{txt}</p>;
}