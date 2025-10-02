import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
import { League_Spartan } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "PropertyLynk | Find  the Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

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
