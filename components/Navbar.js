"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/newsapp_logo.png";
import { Newspaper, Compass } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow">
      <nav className="bg-gradient-to-r from-teal-500 to-emerald-500 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-center">
             <Image
                src={logo}
                alt="NewsPilot Logo"
                width={145} 
                height="auto"
                className="rounded-full object-contain"
                priority
                />
          </div>
        </div>
      </nav>
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 h-12 items-center text-lg font-medium">
              <Newspaper className="h-5 w-5 text-gray-500" />
                       &nbsp;    Latest News
          </div>
        </div>
      </div>
    </header>
  );
}