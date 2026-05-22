import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Creative Ad Agency",
};

export default function AboutPage() {
  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-24 flex flex-col gap-20 w-full flex-grow">
      {/* SECTION 1: HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6 pr-0 lg:pr-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold leading-tight">Helping Brands Become Impossible To Forget</h1>
          <p className="text-lg text-gray-600 max-w-2xl">EchoGrow combines creative branding, memorable ad music, viral campaign thinking, and growth-focused strategies to help businesses and product brands stand out.</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a className="bg-black text-white px-8 py-4 rounded-full font-medium text-center hover:bg-gray-800 transition-colors duration-200" href="/contact">Book Free Consultation</a>
            <a className="bg-gray-50 text-black border border-gray-200 px-8 py-4 rounded-full font-medium text-center hover:bg-gray-100 transition-colors duration-200" href="/portfolio">See Our Work</a>
          </div>
        </div>
        <div className="lg:col-span-5 relative mt-12 lg:mt-0">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <img alt="Agency" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXcxK7V7WjkC5OWLl1ka73ymGfR2ErrLgA4_GDWeqUVLZ7wfG60ftNzpXMUX5wuTd4nLm8W1DC57WURsPyyKkThbvyMK1mU8KaewzaDXuegURf7GLWoRAKTKbrw-T9NU3R1AHyJrLwZf4blhGfwZcQrrOrB9yX_R0-nYpvPSr4KCcvQPRXzlwVO_d89hGM9QVUY9ogGOlCx7OUtiDNhlwDNWC1XK2m-x0Pkg42HHd_pmPdvW8XtE2n4hAyOhLl2ACcaKewlN5yphQ" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-[240px]">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-semibold text-sm">Brand Recall</span>
            </div>
            <div className="text-3xl font-bold">+48%</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR MISSION */}
      <section className="bg-white rounded-2xl p-8 md:p-16 border border-gray-200 flex flex-col items-center text-center max-w-4xl mx-auto w-full shadow-sm">
        <svg className="w-10 h-10 text-black mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">"Most businesses struggle to stand out in crowded markets. EchoGrow exists to help brands become memorable through creative campaigns, custom ad music, brand recall strategies, and powerful storytelling."</p>
      </section>

      {/* SECTION 3: WHAT MAKES ECHOGROW DIFFERENT */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-3xl font-bold text-gray-900">What Makes EchoGrow Different</h2>
          <p className="text-lg text-gray-600">Our unique approach to creative growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Creative First</h3>
            <p className="text-gray-600">We focus on memorable branding and campaigns designed to stay in customers&apos; minds.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Built For Businesses &amp; Products</h3>
            <p className="text-gray-600">From cafes and local businesses to FMCG and product brands.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Flexible &amp; Affordable</h3>
            <p className="text-gray-600">Startup-friendly pricing designed to help businesses grow confidently.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Growth Focused</h3>
            <p className="text-gray-600">Creative campaigns built to improve visibility, recall, and engagement.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY ECHOGROW STARTED */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 rounded-3xl overflow-hidden border border-gray-200">
        <div className="h-64 md:h-full min-h-[400px]">
          <img alt="Agency Meeting" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9AzK1GK5WYb-ireDd7jWcaM1SvsSkpacXIaUWNgqsLlHjDyCqrhhBUAaTLtpgAoYbwX_v9Pl5PsCGCe97UjFRctNkDdqs5Mv2BUT3G99IfeChW8F7xt0TchN1z62rCdBoBjuImBTBe1fdG-D4NACUwLb7uwYI5qR-nqFG6lPrQ5B835JgRwCqLfpNQgtLD4omOkbE1XD0JE3SIKMarlHUKiPMUn0mHOLNcXUHCkvvElLAo5KWuZ6I39_iFw-c1vusFyx69kAvRbE" />
        </div>
        <div className="p-10 md:p-16 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900">Why EchoGrow Started</h2>
          <div className="w-12 h-1 bg-black"></div>
          <p className="text-lg text-gray-600 leading-relaxed">EchoGrow was built with a simple belief — memorable brands win. We started EchoGrow to help businesses create impactful advertising without requiring massive agency budgets.</p>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="bg-black text-white rounded-3xl p-12 md:p-24 text-center flex flex-col items-center gap-8 mt-4">
        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl">Ready To Build A Brand People Remember?</h2>
        <p className="text-lg opacity-80 mb-4">Let&apos;s create something memorable for your business or brand.</p>
        <a className="bg-white text-black px-10 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2" href="/contact">
          Book Free Consultation
        </a>
      </section>
    </main>
  );
}
