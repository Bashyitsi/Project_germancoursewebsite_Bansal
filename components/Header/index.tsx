"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-99999 w-full py-3 bg-transparent bg-opacity-0 ${
        stickyMenu ? "shadow transition duration-100" : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 flex 2xl:px-0">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/images/logo/logo-dark.svg"
              alt="logo"
              width={119.03}
              height={30}
              className="hidden w-auto dark:block"
            />
            <Image
              src="/images/logo/logo-light.svg"
              alt="logo"
              width={119.03}
              height={30}
              className="w-auto dark:hidden"
            />
          </a>

          {/* Right side elements */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggler */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0">
              <ThemeToggler />
            </div>

            {/* Register Button */}
            <Link
              href="/register"
              className="flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs sm:text-sm sm:px-6 sm:py-2.5 md:px-7.5 md:py-3 text-white duration-300 ease-in-out hover:bg-primaryho"
            >
              Register ✍
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
