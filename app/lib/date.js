import React from "react";

/* Converts an ISO date string into a readable calendar-style format.
   Example: "2025-10-17T02:33:00Z" → "17 Oct 2025" */

export function formatAbsolute(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

/* Converts an ISO date string into a friendly "time ago" format.
    Example: "2025-10-17T02:30:00Z" → "3 minutes ago" */

export function formatRelative(iso) {
  if (!iso) return "";

  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);

  if (diff < 60) return "just now";
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return formatAbsolute(iso);
}

/*
 Formats a Date object into a clock-style time string.
  Example: new Date() → "02:33:12 AM" */

export function formatTime(date) {
  if (!date) return "--";
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
