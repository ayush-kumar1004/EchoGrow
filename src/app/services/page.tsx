import { Metadata } from "next";
import ServicesList from "@/components/sections/ServicesList";

export const metadata: Metadata = {
  title: "Services & Solutions",
  description: "Tailored sound, visuals, and campaign strategies that make local businesses noticed.",
};

const services = [
  {
    title: "Brand Recall & Recognition",
    description: "Creative strategies that make your business or product memorable and instantly recognizable.",
    time: "20–40 hrs",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    category: "Branding"
  },
  {
    title: "Custom Ad Music & Jingles",
    description: "Catchy branded audio and memorable jingles designed to stay in customers’ minds.",
    time: "1–2 weeks",
    icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z",
    category: "Audio"
  },
  {
    title: "Viral Creative Concepts",
    description: "High-impact ad ideas, short-form content, and campaign concepts designed for attention and engagement.",
    time: "1–3 concepts",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    category: "Creative"
  },
  {
    title: "Product & Brand Advertising",
    description: "Creative campaigns for businesses, products, FMCG brands, and consumer products.",
    time: "Campaigns from $899",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    category: "Advertising"
  },
  {
    title: "Growth Insights & Campaign Tracking",
    description: "Simple performance insights to understand what creative campaigns are working.",
    time: "Monthly reports",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    category: "Analytics"
  },
  {
    title: "Creative Support & Campaign Add-ons",
    description: "Extra support including ad copy, visuals, branding ideas, and campaign refinement.",
    time: "On-demand",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    category: "Support"
  }
];

export default function ServicesPage() {
  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column (Services) */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        {/* Hero Section */}
        <section className="bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between items-center border border-gray-100">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">Services &amp; Solutions</h1>
            <p className="text-gray-600 leading-relaxed">
              Tailored sound, visuals, and campaign strategies that make local businesses noticed. Choose a solution to see how EchoGrow transforms brand presence into measurable growth.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href="/contact" className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
              Request Consultation
            </a>
          </div>
        </section>

        {/* Interactive filtered service list */}
        <ServicesList initialServices={services} />
      </div>

      {/* Right Column (Sidebar) */}
      <aside className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-600 font-medium mb-4">Explore Packages</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900 text-lg">Starter</div>
              <div className="text-sm text-gray-500">$499 / month</div>
            </div>
            <a className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors" href="/pricing">See Plans</a>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-medium mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a className="hover:text-gray-900 transition-colors" href="/how-it-works">How It Works</a></li>
            <li><a className="hover:text-gray-900 transition-colors" href="/portfolio">Portfolio &amp; Case Studies</a></li>
            <li><a className="hover:text-gray-900 transition-colors" href="/pricing">Pricing &amp; Plans</a></li>
            <li><a className="hover:text-gray-900 transition-colors" href="/about">About EchoGrow</a></li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
