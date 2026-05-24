import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "@/actions/admin";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const isAuthorized = await verifyAdminSession();

  return (
    <nav className="w-full px-6 md:px-12 py-6 flex items-center justify-between bg-white border-b border-gray-100">
      <div className="flex items-center gap-4">
        <MobileMenu />
        <Link href="/" className="flex items-center gap-2" aria-label="EchoGrow Home">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <span className="text-xl font-bold tracking-tight text-primary">EchoGrow</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
        <Link href="/portfolio" className="hover:text-primary transition-colors">Work</Link>
        <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        <Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthorized ? (
          <>
            <Link href="/admin/dashboard" className="text-xs sm:text-sm font-medium py-2 px-3 sm:px-6 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Admin</span>
            </Link>
            <form action={logoutAdminAction} className="inline">
              <button type="submit" className="text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors cursor-pointer">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/contact" className="text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 bg-primary text-white rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">
              <span className="hidden sm:inline">Book Free Consultation</span>
              <span className="sm:hidden">Book Audit</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

