"use client";
import {React, useState, useEffect } from 'react'
import HeroSection from "@/components/Hero"
import StoryList from "@/components/StoryList"
import {supabase} from "@/app/lib/supabaseClient"

export default function NewsFeed() {

       const [stories, setStories] = useState([]);
       const [loading, setLoading] = useState(true);

       useEffect(()=>{
           const fetchNews = async() =>{
            setLoading(true);
            const {data , error} = await supabase
            .from("tech_news")
            .select("*")
            if(error)
                console.error("❌ Error fetching news:", error);
            else setStories(data || []);
            setLoading(false);
           };
               fetchNews();
       },[] )

       if(loading) return <p className="text-center mt-10">Loading latest news...</p>;

       if(!stories.length)
            return <p className="text-center mt-10 text-gray-500">No news available.</p>

       const topStory = stories[0];
       const otherStories = stories.slice(1);

       return(
        <>
         {topStory && <HeroSection story= {topStory}/>}
         <StoryList stories ={otherStories} />
        </>
       )



}
