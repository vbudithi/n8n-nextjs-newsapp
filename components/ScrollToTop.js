"use client";
import { React, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 0);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 50;
    const scrollInterval = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollInterval);
      }
    };
    requestAnimationFrame(scrollInterval);
  };

  if (!visible) return null;
  return (
    <button
      onClick={scrollToTop}
      aria-label="scroll To Top"
      className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-purple-600 to-yellow-500 text-white 
                 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 cursor-pointer"
    >
      <ArrowUp className="h-5 w-5 animate-bounce" />
    </button>
  );
}
