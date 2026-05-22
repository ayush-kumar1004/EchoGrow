import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-12 py-12 bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4" aria-label="EchoGrow Home">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span className="text-xl font-bold tracking-tight text-primary">EchoGrow</span>
          </Link>
          <p className="text-sm text-gray-500">
            Creative branding, custom ad music, memorable jingles, viral campaigns, and growth-focused advertising for businesses and brands.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-primary">Product</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-primary">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/about" className="hover:text-primary transition-colors">About EchoGrow</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Work</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-primary">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="mailto:hello@echogrow.com" className="hover:text-primary transition-colors">hello@echogrow.com</a></li>
            <li>+1 (415) 555-0198</li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
}
