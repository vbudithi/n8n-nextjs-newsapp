import Hero from "@/components/Hero";
import StoryList from "@/components/StoryList";
import newsData from '@/news.json'

export default function Home() {
  const { topStories, stories } = newsData;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {topStories[0] && <Hero story={topStories[0]} />}
    <StoryList stories={stories} layout="grid" />
   </div>
  );
}
