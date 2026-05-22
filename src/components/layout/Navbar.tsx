import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 md:px-12 py-6 flex items-center justify-between bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
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
        <Link href="/login" className="hidden md:block text-sm font-medium py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap px-6">
          Login
        </Link>
        <Link href="/contact" className="text-sm font-medium px-5 py-2.5 bg-primary text-white rounded-full hover:bg-gray-800 transition-colors">
          Book Free Consultation
        </Link>
      </div>
    </nav>
  );
}
