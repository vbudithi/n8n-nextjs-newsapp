import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/newsapp_logo.png";
import { usePathname } from "next/navigation";

export default function ScrollNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setShowNavbar(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setShowNavbar(currentScrollY < lastScrollY.current);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-300 ${
          showNavbar ? "opacity-100" : "opacity-0"
        }`}
      >
        <nav>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative h-20 flex items-center">
              <div className="flex flex-col items-center">
                <Link href="/" className="inline-block">
                  <Image
                    src={logo}
                    alt="NewsPilot Logo"
                    width={145}
                    height={145}
                    className="rounded-full object-contain"
                    loading="lazy"
                  />
                </Link>
                <a
                  href="https://github.com/vbudithi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[8px] ml-15 -translate-y-2 text-black hover:text-blue-800 italic tracking-wide absolute top-[75%]"
                >
                  by Vivek Budithi
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
