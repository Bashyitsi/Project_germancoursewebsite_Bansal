"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, MouseEvent } from "react";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
      setIsDropdownOpen(false);
    } else {
      setStickyMenu(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        stickyMenu ? "shadow transition duration-100" : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-2 sm:px-4 md:px-8 flex 2xl:px-0">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/images/logo/logo-dark.svg"
              alt="Kigali Deutsch Academy"
              width={160}
              height={40}
              className="hidden w-auto dark:block"
            />
            <Image
              src="/images/logo/logo-light.svg"
              alt="Kigali Deutsch Academy"
              width={160}
              height={40}
              className="w-auto dark:hidden"
            />
          </a>

          {/* Right side elements */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 ml-auto">
            {/* Dropdown for small screens */}
            <div className="relative sm:hidden" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <div className="px-4 py-2 flex items-center justify-between">
                  
                    <ThemeToggler />
                  </div>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Register ✍
                  </Link>
                </div>
              )}
            </div>

            {/* Theme Toggler and Register button for larger screens */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex-shrink-0">
                <ThemeToggler />
              </div>
              <Link
                href="/register"
                className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-[#0066FF] px-4 py-2 text-sm text-white hover:bg-blue-600"
              >
                Register ✍
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;