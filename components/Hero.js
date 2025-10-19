import Image from "next/image";
import DateText from "./DateText";
import { motion } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
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
  const href = `/articles/${story?.id}` || "#";
  if (!story) return null;

  return (
    <motion.section
      href={href}
      variants={container}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-slate-50 ring-1 ring-black/5 shadow"
    >
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 md:p-8"
      >
        <motion.div
          variants={item}
          className="group relative w-full overflow-hidden rounded-xl ring-1 ring-black/5"
        >
          <Link href={href} className="block">
            <div className="relative w-full h-[260px] md:h-[340px] lg:h-[340px] rounded-lg overflow-hidden">
              <Image
                src={story.image_url}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute left-3 top-3 flex gap-2">
              <span className="rounded-full bg-black/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
                Top Story
              </span>
              {story?.source && (
                <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-medium text-gray-700 ring-1 ring-black/10 backdrop-blur">
                  {story.source}
                </span>
              )}
            </div>
          </Link>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col justify-center gap-4"
        >
          <Link
            href={href}
            className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight hover:underline decoration-2 underline-offset-4"
          >
            {story.title}
          </Link>
          {story.summary && (
            <p className="text-base md:text-lg text-slate-600 line-clamp-4">
              {story.summary}
            </p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            {story.published_at && (
              <DateText iso={story.published_at} toggle={true} />
            )}
            {story.read_time && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 ring-1 ring-slate-200">
                {story.read_time} min read
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            >
              Read full story
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
