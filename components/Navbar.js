"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/images/newsapp_logo.png";
import { Newspaper } from "lucide-react";
import DateText from "@/components/DateText";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow">
      <nav className="bg-gradient-to-r from-teal-300 to-teal-600 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-20 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Link href="/" className="inline-block">
                <Image
                  src={logo}
                  alt="NewsPilot Logo"
                  width={145}
                  height={145}
                  className="rounded-full object-contain"
                  priority
                />
              </Link>
              <a
                href="https://github.com/vbudithi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[9px] ml-33 -translate-y-2 text-black hover:text-blue-800 italic tracking-wide absolute top-[75%] "
              >
                Designed & Developed by Vivek Budithi
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 h-12 items-center text-lg font-medium text-gray-850">
            <Newspaper className="h-5 w-5 text-gray-500" />
            <span>Today’s News:</span>
            <DateText
              iso={new Date().toISOString()}
              className="!text-lg text-gray-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
