import { Metadata } from "next";
import ContactFormFull from "@/components/forms/ContactFormFull";
export const metadata: Metadata = {
  title: "Contact",
  description: "Let's Build A Brand People Remember",
};

export default function ContactPage() {
  return (
    <div className="flex-grow w-full">
      {/* Section 1: Hero */}
      <section className="pt-24 pb-16 px-4 md:px-10 max-w-[1280px] mx-auto relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 lg:col-start-3 text-center z-10 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="font-semibold text-sm text-gray-600">Free Consultation Available</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight font-bold">
              Let&apos;s Build A Brand People <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">Remember</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Tell us about your business, product, or campaign goals — we&apos;ll recommend the right creative direction.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Consultation Form */}
      <section className="py-20 px-4 md:px-10 bg-gray-50 border-y border-gray-200" id="consultation-form">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Form Area */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your Brand</h2>
                <p className="text-gray-600">Complete the details below to request a tailored strategy session.</p>
              </div>
              
              <ContactFormFull />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Businesses Contact EchoGrow</h3>
                <p className="text-gray-600">We create memorable campaigns, custom ad music, and creative strategies designed for stronger brand recall.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  { title: "Creative Strategy", desc: "Memorable campaigns designed for stronger brand recall.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { title: "Brand Recognition", desc: "Creative ideas built to help customers remember your brand.", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
                  { title: "Startup-Friendly Pricing", desc: "Flexible pricing designed around business needs.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { title: "Fast Turnaround", desc: "Clear timelines and collaborative execution.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
