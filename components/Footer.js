import React from "react";
import Image from "next/image";
import logo from "@/assets/images/newsapp_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} NewsPilot. Designed and Developed by Vivek
            Budithi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
