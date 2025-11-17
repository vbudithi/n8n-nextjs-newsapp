import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { League_Spartan } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "NewsPilot | AI-Powered Tech News & Insights",
  description:
    "Stay ahead with NewsPilot – your personal AI-powered newsroom delivering the latest technology news, trends, and insights in real time.",
  keywords:
    "NewsPilot, AI News, Tech News, AI-powered newsroom, latest technology updates, LLM pipelines, real-time news, machine learning news, artificial intelligence trends",

  authors: [{ name: "NewsPilot Team" }],
  creator: "NewsPilot",
  publisher: "NewsPilot",

  metadataBase: new URL("https://newspilot.live"),

  // ===== Canonical URL (Prevents duplicate content) =====
  alternates: {
    canonical: "/",
  },

  // =====Robots (Tells Google how to index) =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // =====  Open Graph (Facebook, LinkedIn, Discord) =====
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newspilot.live",
    siteName: "NewsPilot",
    title: "NewsPilot | AI-Powered Tech News & Insights",
    description:
      "Stay ahead with NewsPilot – your personal AI-powered newsroom delivering the latest technology news, trends, and insights in real time.",
    images: [
      {
        url: "/newsapp_logo.png",
        width: 1200,
        height: 630,
        alt: "NewsPilot - AI-Powered Tech News",
      },
    ],
  },

  // ===== Twitter Card =====
  twitter: {
    card: "summary_large_image",
    title: "NewsPilot | AI-Powered Tech News & Insights",
    description:
      "Stay ahead with NewsPilot – your personal AI-powered newsroom delivering the latest technology news, trends, and insights in real time.",
    images: ["/og-image.png"],
    creator: "@newspilot",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  // ===== Theme Color (For mobile browsers) =====
  themeColor: "#3b82f6",
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en" className={`${leagueSpartan.variable} dark`}>
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
