"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DateText from "./DateText";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.9,
      ease: "easeInOut",
      damping: 12,
      stiffness: 80,
    },
  },
};

export default function StoryList({ stories }) {
  if (!stories || stories.length === 0) return null;
  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-4">More Stories</h3>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stories.map((story) => (
          <motion.div
            key={story.id}
            variants={item}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 overflow-hidden"
          >
            <div className="relative w-full h-40">
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={story.image_url}
                  alt={story.title}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </a>
            </div>

            <a href={story.url} target="_blank" rel="noopener noreferrer">
              <h4 className="mt-3 text-lg font-bold hover:underline">
                {story.title}
              </h4>
            </a>
            {story.published_at && (
              <DateText iso={story.published_at} className="mt-2" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
