'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
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
              <Image
                src={story.image_url}
                alt={story.title}
                fill
                className="object-cover rounded"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <Link href={story.url}>
              <h4 className="mt-3 text-lg font-bold hover:underline">
                {story.title}
              </h4>
            </Link>

            {story.published_at && (
              <p className="mt-2 text-sm text-gray-500">{story.published_at}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}