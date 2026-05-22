import { Metadata } from 'next';
import PricingCard from '@/components/sections/PricingCard';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Pricing & Plans',
  description: 'Flexible pricing built for businesses, product brands, and growing companies.',
};

const pricingPlans = [
  {
    title: "Launch Package",
    description: "Perfect for local businesses testing creative advertising.",
    priceLabel: "Starting from",
    price: "₹4,999",
    features: [
      "Free creative consultation",
      "1 custom ad or jingle concept",
      "2 viral reel ideas",
      "growth-focused direction",
      "startup-friendly support"
    ],
    buttonText: "Get Free Consultation",
    buttonHref: "/contact",
    footnote: "Best for cafes, local shops, salons, startups, and small businesses."
  },
  {
    title: "Brand Growth",
    description: "For businesses ready to grow brand recognition.",
    priceLabel: "Starting from",
    price: "₹12,999",
    isPopular: true,
    features: [
      "custom ad music or jingle",
      "viral reel campaign concepts",
      "campaign strategy ideas",
      "branding support",
      "growth recommendations",
      "creative consultation"
    ],
    buttonText: "Book Free Strategy Call",
    buttonHref: "/contact",
    footnote: "Best for growing businesses and product brands."
  },
  {
    title: "Premium Launch",
    description: "For serious brands focused on memorable advertising.",
    priceLabel: "Starting from",
    price: "₹24,999",
    features: [
      "premium ad campaign strategy",
      "memorable audio branding",
      "multiple campaign concepts",
      "premium creative assets",
      "brand strategy consultation",
      "campaign refinement support"
    ],
    buttonText: "Talk To Our Team",
    buttonHref: "/contact",
    footnote: "Best for FMCG brands, retail products, paint brands, and established businesses."
  },
  {
    title: "Enterprise Custom",
    description: "Flexible pricing for unique brand needs.",
    priceLabel: "Pricing",
    price: "Custom",
    features: [
      "fully customized campaigns",
      "product launch support",
      "premium creative planning",
      "brand-specific advertising strategy",
      "negotiable pricing based on work scope"
    ],
    buttonText: "Request Custom Quote",
    buttonHref: "/contact",
    footnote: "For large projects and custom campaigns."
  }
];

export default function PricingPage() {
  return (
    <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full flex flex-col gap-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Simple Creative Pricing For Every Brand</h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Flexible pricing built for businesses, product brands, and growing companies. Start small, scale when needed, and customize campaigns based on your goals.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 font-medium bg-white border border-gray-200 rounded-full py-2 px-4 inline-flex">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
            Startup-friendly pricing
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
            Final quotes based on project scope
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
            Free consultation included
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {pricingPlans.map((plan, i) => (
          <PricingCard key={i} {...plan} />
        ))}
      </section>

      <section className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Businesses Choose EchoGrow</h2>
          <p className="text-lg text-gray-600">Our commitment to your brand&apos;s growth and creative integrity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Pricing</h3>
            <p className="text-gray-600 leading-relaxed text-sm">Negotiable pricing based on business needs and project scope.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Creative Ownership</h3>
            <p className="text-gray-600 leading-relaxed text-sm">You fully own approved campaign assets and creative deliverables.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Human Collaboration</h3>
            <p className="text-gray-600 leading-relaxed text-sm">Creative ideas refined with real feedback and personalized strategy.</p>
          </div>
        </div>
      </section>

      <CTASection />

      <section className="max-w-3xl mx-auto text-center py-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible &amp; Negotiable Pricing</h3>
        <p className="text-gray-600 leading-relaxed">
          Every business is different. Final pricing depends on campaign complexity, deliverables, and project scope. We help businesses start small and grow confidently.
        </p>
      </section>
    </div>
  );
}
