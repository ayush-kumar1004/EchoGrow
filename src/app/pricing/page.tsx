import { Metadata } from 'next';
import Link from 'next/link';
import PricingCard from '@/components/sections/PricingCard';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Pricing & Plans',
  description: 'Flexible and affordable pricing plans for custom brand songs, jingles, and creative campaigns.',
};

const pricingPlans = [
  {
    title: "Echo Starter",
    description: "For local businesses starting brand recall.",
    priceLabel: "Starting at",
    price: "₹1,499",
    features: [
      "Ready-to-use ad script",
      "Brand jingle idea",
      "Reel concept",
      "Hook ideas",
      "Creative consultation"
    ],
    buttonText: "Get My Brand Song",
    buttonHref: "/contact",
    footnote: "Starting at ₹1,499 (negotiable based on creative scope). Best for local stores, cafes, salons, gyms."
  },
  {
    title: "Brand Memory Pack",
    description: "For businesses wanting memorable advertising.",
    priceLabel: "Starting at",
    price: "₹4,999",
    isPopular: true,
    features: [
      "Custom ad music direction",
      "Memorable jingle concept",
      "3–5 viral campaign ideas",
      "Full reel storyboard",
      "Audience targeting ideas",
      "Hook-based ad scripts",
      "Brand recall strategy",
      "Consultation support"
    ],
    buttonText: "Build My Brand Recall",
    buttonHref: "/contact",
    footnote: "Starting at ₹4,999 (negotiable based on creative scope). Best for food brands, product brands, startups."
  },
  {
    title: "Viral Product Launch",
    description: "For brands launching serious campaigns.",
    priceLabel: "Starting at",
    price: "₹8,999",
    features: [
      "Multiple ad song concepts",
      "Premium campaign direction",
      "Launch campaign planning",
      "Viral reel strategy",
      "Detailed storyboards",
      "Custom creative planning",
      "Premium support"
    ],
    buttonText: "Launch My Campaign",
    buttonHref: "/contact",
    footnote: "Starting at ₹8,999 (negotiable based on creative scope). Best for FMCG, masalas, paints, D2C brands."
  },
  {
    title: "Custom Growth Partner",
    description: "Flexible pricing for unique business needs.",
    priceLabel: "Pricing",
    price: "Custom Pricing",
    features: [
      "Full advertising campaign support",
      "Multiple creative concepts",
      "Premium jingle direction",
      "Brand-specific campaigns",
      "Negotiable pricing",
      "Ongoing creative partnership"
    ],
    buttonText: "Request Custom Quote",
    buttonHref: "/contact",
    footnote: "Negotiable pricing based on project scope. Best for custom campaigns and creative partnerships."
  }
];

export default function PricingPage() {
  return (
    <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full flex flex-col gap-16">
      
      {/* Hero Section */}
      <section className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Affordable Creative Campaigns That People Remember
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
          Custom ad jingles, viral reel scripts, memorable brand songs, and campaign ideas built for businesses, products, and growing brands.
        </p>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-600 font-semibold bg-white border border-gray-100 rounded-2xl md:rounded-full py-3 px-6 shadow-sm inline-flex">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg> 
            Startup-friendly pricing
          </span>
          <span className="hidden md:inline text-gray-300">•</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg> 
            Free consultation included
          </span>
          <span className="hidden md:inline text-gray-300">•</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg> 
            Flexible &amp; negotiable pricing
          </span>
          <span className="hidden md:inline text-gray-300">•</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg> 
            AI creative tools included
          </span>
        </div>
      </section>

      {/* Startup Pricing Trust Strip */}
      <section className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 -mt-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900">Built for Startups &amp; Local Businesses</h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            We intentionally keep pricing affordable in the beginning so businesses can test creative advertising without huge agency costs. All starter and memory packages are negotiable based on your creative scope.
          </p>
        </div>
        <div className="shrink-0 flex items-center">
          <span className="text-xs bg-gray-50 border border-gray-100 font-bold uppercase tracking-wider text-gray-700 px-4 py-2 rounded-full">
            Low Entry Barrier
          </span>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch pt-4">
        {pricingPlans.map((plan, i) => (
          <PricingCard key={i} {...plan} />
        ))}
      </section>

      {/* Comparison Table */}
      <section className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Compare Packages</h2>
          <p className="text-sm text-gray-500 mt-2">See which plan fits your business campaign requirements</p>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="p-5 text-xs font-extrabold uppercase tracking-wider text-gray-400">Features</th>
                  <th className="p-5 text-sm font-bold text-gray-900">Echo Starter</th>
                  <th className="p-5 text-sm font-bold text-gray-900">Brand Memory</th>
                  <th className="p-5 text-sm font-bold text-gray-900 bg-gray-900/5">Viral Launch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                <tr>
                  <td className="p-5 font-semibold text-gray-700">Custom Ad Script</td>
                  <td className="p-5 text-green-600">✅</td>
                  <td className="p-5 text-green-600">✅</td>
                  <td className="p-5 text-green-600 bg-gray-900/5">✅</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-gray-700">Jingle Concept</td>
                  <td className="p-5 text-green-600">✅</td>
                  <td className="p-5 text-green-600">✅</td>
                  <td className="p-5 text-green-600 bg-gray-900/5">✅</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-gray-700">Viral Reel Ideas</td>
                  <td className="p-5 text-gray-900">2</td>
                  <td className="p-5 text-gray-900">5</td>
                  <td className="p-5 text-gray-900 bg-gray-900/5 font-semibold">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-gray-700">Storyboard</td>
                  <td className="p-5 text-red-400">❌</td>
                  <td className="p-5 text-green-600">✅</td>
                  <td className="p-5 text-green-600 bg-gray-900/5">✅</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-gray-700">Consultation</td>
                  <td className="p-5 text-gray-900">✅</td>
                  <td className="p-5 text-gray-900">✅</td>
                  <td className="p-5 text-gray-900 bg-gray-900/5 font-semibold">Priority</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-gray-700">Revisions</td>
                  <td className="p-5 text-gray-900">1</td>
                  <td className="p-5 text-gray-900">3</td>
                  <td className="p-5 text-gray-900 bg-gray-900/5 font-semibold">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* See What We Create Section */}
      <section className="py-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 md:p-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">See What We Create</h2>
          <p className="text-sm text-gray-500 mt-2">Example campaigns produced by our Creative Director AI</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gym Brand Example */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-xs bg-gray-100 text-gray-800 font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Example 1 — Gym Brand
                </span>
                <span className="text-xs font-semibold text-gray-500">Goal: Increase memberships</span>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Generated Hook</span>
                  <p className="font-extrabold text-gray-900 italic text-base">“Still paying gym fees to scroll Instagram?”</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Ad Storyboard / Idea</span>
                  <p className="text-gray-600 leading-relaxed">
                    A funny relatable reel showing a guy paying gym fees and scrolling fitness reels *while* sitting on the gym machine, transitioning into an emotional realization and a real workout payoff sequence.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-100 pt-6">
              <Link href="/tools" className="inline-flex w-full justify-center bg-black text-white text-xs font-bold py-3.5 px-6 rounded-full hover:bg-gray-800 transition-colors">
                Try Free AI Script Generator
              </Link>
            </div>
          </div>

          {/* Masala Brand Example */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-xs bg-gray-100 text-gray-800 font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Example 2 — Masala Brand
                </span>
                <span className="text-xs font-semibold text-gray-500">Goal: Brand Recall</span>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Generated Hook</span>
                  <p className="font-extrabold text-gray-900 italic text-base">“Your food tastes boring? It’s not your cooking…”</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Ad Storyboard / Idea</span>
                  <p className="text-gray-600 leading-relaxed">
                    A cinematic fast-paced Indian kitchen commercial showing a husband blaming his cooking skills, only for the mother-in-law to reveal the secret ingredient is the fresh spice jingle of EchoGrow Masalas.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-100 pt-6">
              <Link href="/tools" className="inline-flex w-full justify-center bg-black text-white text-xs font-bold py-3.5 px-6 rounded-full hover:bg-gray-800 transition-colors">
                Try Free AI Script Generator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brand Songs Work */}
      <section className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Why Brand Songs Actually Work</h2>
          <p className="text-lg text-gray-600 mt-2">People forget ads. People remember songs.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <span className="text-2xl mb-4 block">🎵</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Brand Recall</h3>
            <p className="text-gray-600 leading-relaxed text-xs">Memorable jingles help customers remember your business longer.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <span className="text-2xl mb-4 block">🎵</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Higher Engagement</h3>
            <p className="text-gray-600 leading-relaxed text-xs">Audio-first content performs better on Reels and short-form video.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <span className="text-2xl mb-4 block">🎵</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Emotional Connection</h3>
            <p className="text-gray-600 leading-relaxed text-xs">Music makes brands feel memorable and trustworthy.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <span className="text-2xl mb-4 block">🎵</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Modern Viral Advertising</h3>
            <p className="text-gray-600 leading-relaxed text-xs">Today’s Instagram generation remembers sounds faster than visuals.</p>
          </div>
        </div>

        <p className="text-center text-xs font-semibold text-gray-500 mt-10">
          From local businesses to product brands — EchoGrow helps businesses become impossible to forget.
        </p>
      </section>



      <CTASection />

      {/* Flexible & Negotiable Pricing */}
      <section className="max-w-3xl mx-auto text-center py-8 space-y-4">
        <h3 className="text-2xl font-extrabold text-gray-900">Flexible &amp; Negotiable Pricing</h3>
        <div className="space-y-2 text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
          <p className="font-semibold text-gray-950">Every business is different.</p>
          <p>
            We keep pricing affordable in the beginning and customize campaigns based on business goals, creative requirements, and production complexity.
          </p>
          <p className="font-semibold text-gray-950">Start small. Scale when you&apos;re ready.</p>
        </div>
        <div className="pt-2">
          <span className="text-xs bg-gray-150 border border-gray-200 text-gray-700 font-bold uppercase tracking-wider px-4 py-2 rounded-full">
            No pressure. Free consultation first.
          </span>
        </div>
      </section>
      
    </div>
  );
}
