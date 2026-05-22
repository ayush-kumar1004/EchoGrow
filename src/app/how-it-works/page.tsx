import { Metadata } from "next";
import FAQAccordion from "@/components/sections/FAQAccordion";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "How It Works",
  description: "A simple creative process designed to help businesses and brands build memorable advertising campaigns.",
};

const processFaqs = [
  { question: "Who owns the creative work?", answer: "Once the final project is delivered, all approved creative assets belong to your business or brand. You receive full usage rights for your campaign materials." },
  { question: "How long does a project usually take?", answer: "Most projects are completed within 5–14 business days depending on campaign complexity, revisions, and deliverables." },
  { question: "Can EchoGrow create ads for products and brands?", answer: "Yes. We work with product-based businesses, FMCG brands, restaurants, retail businesses, local services, gyms, coaching brands, and more." },
  { question: "What kind of deliverables will I receive?", answer: "Depending on your package, deliverables may include custom jingles, ad music, reel concepts, campaign ideas, creative scripts, branding support, and promotional assets." },
  { question: "Can I request revisions?", answer: "Yes. We include collaborative feedback rounds so your campaign aligns with your brand vision and goals." },
  { question: "Do I need marketing experience to work with EchoGrow?", answer: "Not at all. We guide businesses through the creative process and recommend ideas based on your goals and audience." },
  { question: "Do you help after campaign launch?", answer: "Yes. We can provide optional campaign insights, creative recommendations, and growth-focused suggestions to improve performance." }
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 w-full flex-grow">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight font-bold">
            How EchoGrow Works
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            A simple creative process designed to help businesses and brands build memorable advertising campaigns.
          </p>
          <div className="flex gap-4">
            <a href="/contact" className="inline-block bg-black text-white font-medium px-8 py-4 rounded-full hover:bg-gray-800 transition-colors">Get Free Brand Audit</a>
            <a href="/portfolio" className="inline-block bg-gray-50 text-gray-900 border border-gray-200 font-medium px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">See Our Campaigns</a>
          </div>
        </div>
        <div className="lg:col-span-5 relative min-h-[300px] md:min-h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200">
          <img src="https://lh3.googleusercontent.com/aida/ADBb0uidofAhZSbaraYF4fEyjp2lHbyIGZ3Je0mFLTRZF_A-yzK0-1p1TC6XPKF1Pbjai84hzMASBtEsl7AlaY8Hp9Z54TOeJllKGOqdjFd9KdupOpdkzCx7dsb1wUXz7YO8Yz-yJu1E4qOt-kOBdRv_5_15deNksIVkLxUNhMFTJDJnRN9mpCK8rrA13t3lH4f1XOC4xO5Gj23AOOT_Rfg5SGtg8hpLd9Fxv8SBOUxQW25QzF4t1Fukjf65HF4" alt="Workspace" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <h2 className="text-3xl font-bold text-gray-900">The EchoGrow Process</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gray-200 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200 mb-4 shadow-sm">
                <span className="text-3xl text-gray-900 font-bold">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tell Us About Your Brand</h3>
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600 mb-3">Quick &amp; Simple</span>
              <p className="text-gray-500 text-sm">Share your business, product, audience, and marketing goals through a simple creative brief.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200 mb-4 shadow-sm">
                <span className="text-3xl text-gray-900 font-bold">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Creative Strategy &amp; Concepts</h3>
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600 mb-3">Custom Creative Planning</span>
              <p className="text-gray-500 text-sm">We create ad ideas, campaign directions, and creative strategies tailored to your brand.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200 mb-4 shadow-sm">
                <span className="text-3xl text-gray-900 font-bold">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Review &amp; Refine</h3>
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600 mb-3">Collaborative Process</span>
              <p className="text-gray-500 text-sm">Review the creative direction, provide feedback, and refine ideas before final production.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200 mb-4 shadow-sm">
                <span className="text-3xl text-gray-900 font-bold">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Production &amp; Delivery</h3>
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600 mb-3">Ready To Launch</span>
              <p className="text-gray-500 text-sm">We deliver jingles, ad concepts, branding creatives, scripts, and campaign-ready assets.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200 mb-4 shadow-sm">
                <span className="text-3xl text-gray-900 font-bold">5</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Launch &amp; Growth Support</h3>
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600 mb-3">Growth Focused</span>
              <p className="text-gray-500 text-sm">Optional campaign tracking and creative recommendations to help improve results.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Brief Form Section */}
      <section className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                <img alt="Campaign" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHYbyw-X5HpSx4tmvNBjBg3I06Jc1gGLVL4NtuGSbQTeuCepe-k6nR0Krc7K3DaKPnlZVrDsH-nObK9GHL0QkuIcjoTFwJCMQZ3tiYI9Whi0iZgM4A-lsnyTB9oLCZBQtmZUFKdt5Y5shMqMyIWqr5WLXjQviXod6-5dNxzSKCNofmax7_gSrhmdiRBhcGZX7DISUQkAPmhPeQN0MpWyMduxVUlJxvdhNXTT0-h4NlOHoOez0k20hUfSKbeLw9NRnCF7XXxfPPsQY" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Morning Brew — 30s Social Spot</h4>
                <p className="text-xs text-gray-500 mt-1">Result: +18% CTR, 2-week campaign</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                <img alt="Campaign" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGb9G-3P4sHQUf6NSpuAJeQjDv0QCpgzhg3iLJP08VCgmEaDV5nfk6pV-zQXyrQ2MEWP2GqZKlwBjinStBnM7kqaPOvGSNA3vnbnhuERUKRthACOr8GufQTbyIT_JZFqEMexHUBlbjlYvRQjt4p9MENCniUcPRlIeyuqVWd_uXVKALix6kauWMw84am_4XMT9eps-fmCIf7cvjvhZ8pi0UDcZKSd6VFir0uk6h85VHTObq29SIImbbp3FIVN3rnEK5xLxEO3whids" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">FitFlow Reels Series</h4>
                <p className="text-xs text-gray-500 mt-1">Result: +45% engagement across 3 weeks</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
            <FAQAccordion faqs={processFaqs} />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
