import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ story }) {
  if (!story) return null;

  return (
<section className="bg-white rounded-lg shadow overflow-hidden mt-30">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6">
    
    {/* Left: Big Image */}
    <div className="relative w-full h-50 md:h-60 rounded-lg overflow-hidden">
      <Image
        src={story.image_url}
        alt={story.title}
        fill
        className="object-cover"
        priority
      />
    </div>

    {/* Right: Title + Summary */}
    <div className="flex flex-col justify-center space-y-4">
      <Link href={story.url}>
        <h2 className="text-2xl md:text-3xl font-bold leading-snug hover:underline">
          {story.title}
        </h2>
      </Link>

      {story.summary && (
        <p className="text-gray-600 text-base md:text-lg line-clamp-3">
          {story.summary} 
        </p>
      )}

      {/* {story.content && (
        <p className="text-gray-600 text-base md:text-lg line-clamp-3">
          {story.content}
        </p>
      )} */}

      {story.published_at && (
        <p className="text-sm text-gray-500">{story.published_at}</p>
      )}
    </div>
  </div>
</section>
  );
}
