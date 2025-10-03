import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
import { League_Spartan } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "NewsPilot | AI-Powered Tech News & Insights",
   description:
    "Stay ahead with NewsPilot – your personal AI-powered newsroom delivering the latest technology news, trends, and insights in real time.",
  keywords:
    "NewsPilot, AI News, Tech News, AI-powered newsroom, latest technology updates, LLM pipelines, real-time news, machine learning news, artificial intelligence trends",
}
const MainLayout = ({ children }) => {
  return (
    <html lang="en" className={`${leagueSpartan.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
       <Footer />
      </body>
    </html>
  );
};

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700", "600"],
  variable: "--font-brand",
});

export default MainLayout;
