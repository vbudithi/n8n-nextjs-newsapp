import Image from "next/image";
import DateText from "./DateText";
import { motion } from "framer-motion";

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
      duration: 1.4,
      ease: "easeInOut",
      damping: 12,
      stiffness: 80,
    },
  },
};

export default function HeroSection({ story }) {
  if (!story) return null;

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6"
      >
        <motion.div
          variants={item}
          className="relative w-full h-50 md:h-60 rounded-lg overflow-hidden"
        >
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            <Image
              src={story.image_url}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col justify-center space-y-4"
        >
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            <h2 className="text-2xl md:text-3xl font-bold leading-snug hover:underline">
              {story.title}
            </h2>
          </a>

          {story.summary && (
            <p className="text-gray-600 text-base md:text-lg line-clamp-3">
              {story.summary}
            </p>
          )}
          {story.published_at && (
            <DateText iso={story.published_at} toggle={true} />
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
