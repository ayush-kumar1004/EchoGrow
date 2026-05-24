"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="block md:hidden">
      {/* Hamburger Toggle Icon Button */}
      <button
        onClick={toggleMenu}
        className="p-2 -ml-2 text-gray-700 hover:text-black focus:outline-none cursor-pointer"
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Drawer Overlay Backdrop */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer Panel Container */}
      <div
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 visible" : "-translate-x-full invisible pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col gap-8">
          {/* Header row inside drawer */}
          <div className="flex items-center justify-between border-b border-gray-150 pb-4">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2" aria-label="EchoGrow Home">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span className="font-bold tracking-tight text-black text-lg">EchoGrow</span>
            </Link>
            
            <button
              onClick={closeMenu}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black focus:outline-none cursor-pointer"
              aria-label="Close mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links vertical stack */}
          <nav className="flex flex-col gap-5 text-base font-bold text-gray-800" aria-label="Mobile Navigation">
            <Link href="/" onClick={closeMenu} className="hover:text-black transition-colors py-1">
              Home
            </Link>
            <Link href="/services" onClick={closeMenu} className="hover:text-black transition-colors py-1">
              Services
            </Link>
            <Link href="/portfolio" onClick={closeMenu} className="hover:text-black transition-colors py-1">
              Portfolio / Work
            </Link>
            <Link href="/pricing" onClick={closeMenu} className="hover:text-black transition-colors py-1">
              Pricing
            </Link>
            <Link href="/tools" onClick={closeMenu} className="hover:text-black transition-colors py-1 text-black bg-gray-50 rounded-xl px-3 -mx-3 py-2 flex items-center justify-between border border-gray-100">
              <span>AI Tools</span>
              <span className="text-[10px] bg-black text-white font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
                Free
              </span>
            </Link>
            <Link href="/how-it-works" onClick={closeMenu} className="hover:text-black transition-colors py-1">
              How It Works
            </Link>
            <Link href="/about" onClick={closeMenu} className="hover:text-black transition-colors py-1">
              About
            </Link>
            <Link href="/contact" onClick={closeMenu} className="hover:text-black transition-colors py-1">
              Contact
            </Link>
          </nav>
        </div>

        {/* CTAs at drawer bottom */}
        <div className="border-t border-gray-150 pt-6 mt-6 flex flex-col gap-3">
          <Link
            href="/contact"
            onClick={closeMenu}
            className="w-full py-3 bg-black hover:bg-gray-800 text-white text-center rounded-full text-xs font-bold transition-colors block shadow-sm"
          >
            Book Free Consultation
          </Link>
          <Link
            href="/tools"
            onClick={closeMenu}
            className="w-full py-3 border border-gray-200 hover:bg-gray-50 text-gray-800 text-center rounded-full text-xs font-bold transition-colors block"
          >
            Try AI Script Generator Free
          </Link>
        </div>
      </div>
    </div>
  );
}
