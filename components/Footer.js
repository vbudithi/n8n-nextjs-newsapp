import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-center space-x-3">
        <p className="text-sm text-gray-600 text-center">
          &copy; {currentYear}{" "}
          <Link href="/" className="hover:text-blue-600 font-semibold">
            NewsPilot
          </Link>{" "}
          | Designed and Developed by{" "}
          <a
            href="https://github.com/vbudithi" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 font-semibold"
          >
            Vivek Budithi
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
