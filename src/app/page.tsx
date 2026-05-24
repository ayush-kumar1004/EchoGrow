import Image from "next/image";
import Link from "next/link";
import SubscriberForm from "@/components/forms/SubscriberForm";


export default function Home() {
  return (
    <div className="flex-grow flex flex-col justify-center px-6 md:px-12 py-12 md:py-20 lg:py-24 max-w-[1440px] mx-auto w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* BEGIN: Hero Text Content */}
        <div className="flex flex-col gap-8 max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-primary text-balance">
            Turn Your Business Into a Brand People Remember.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-balance">
            EchoGrow helps businesses and brands grow through custom ad music, memorable jingles, viral creative concepts, and measurable marketing strategies.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-primary text-white rounded-full font-medium text-base hover:bg-gray-800 transition-colors shadow-sm">
              Get Free Brand Audit
            </Link>
            <Link href="/portfolio" className="px-8 py-4 bg-white border border-gray-200 text-primary rounded-full font-medium text-base hover:bg-gray-50 transition-colors shadow-sm">
              See Our Work
            </Link>
          </div>
          
          {/* Social Proof Stats */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-1">Custom Ad Music</h3>
              <p className="text-sm text-gray-500">Memorable audio designed for your business.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-1">Viral Reel Ideas</h3>
              <p className="text-sm text-gray-500">Creative short-form concepts for local reach.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-1">Growth Insights</h3>
              <p className="text-sm text-gray-500">Simple performance tracking for smarter decisions.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-1">Local Business Focus</h3>
              <p className="text-sm text-gray-500">Built specifically for local businesses and brands.</p>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-primary">Sample Growth Campaign</h3>
                <p className="text-sm text-gray-500 font-medium">Salon Business Example</p>
              </div>
              <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                +38% Engagement Potential
              </div>
            </div>
            <p className="text-sm text-primary leading-relaxed">
              Creative branding, local reels, and ad concepts designed to help increase appointment inquiries and improve local visibility.
            </p>
            <div className="pt-2 border-t border-gray-50">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Example Campaign Preview</span>
            </div>
          </div>
        </div>
        {/* END: Hero Text Content */}

        {/* BEGIN: Hero Visual */}
        <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col">
          <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            Live Campaign Data
          </div>
          
          {/* Abstract Data/Growth Visualization Graphic */}
          <div className="flex-grow flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-full max-w-md relative flex flex-col justify-end items-center pb-12">
              {/* Growth Bars */}
              <div className="flex items-end gap-3 md:gap-6 w-full h-[60%] justify-center mb-12">
                <div className="w-12 bg-gray-100 rounded-t-lg h-[30%] relative group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Q1</div>
                </div>
                <div className="w-12 bg-gray-200 rounded-t-lg h-[50%] relative group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Q2</div>
                </div>
                <div className="w-12 bg-gray-300 rounded-t-lg h-[75%] relative group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Q3</div>
                </div>
                <div className="w-12 bg-primary rounded-t-lg h-[100%] relative shadow-lg group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold">+124%</div>
                </div>
              </div>
              
              {/* Floating elements suggesting marketing assets */}
              <div className="absolute top-1/4 left-0 bg-white p-2 sm:p-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2 transform -translate-x-2 sm:-translate-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold hidden sm:inline">Reel Views</span>
              </div>
              
              <div className="absolute top-1/3 right-0 bg-white p-2 sm:p-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2 transform translate-x-2 sm:translate-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold hidden sm:inline">Leads Gen</span>
              </div>
              
              {/* Central Play Button for Case Study */}
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-primary px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform z-20 text-xs sm:text-sm whitespace-nowrap">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                Play Case Study
              </button>
            </div>
          </div>
          
          {/* Case Studies thumbnails at bottom of visual */}
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
            <div className="flex gap-3">
              <img alt="Case Study 1" className="w-[60px] h-[40px] rounded object-cover border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJLIwxKOp_2jjXKIBHCiPni0TcK2hfv5MBOoi-C7tarrtn08YJ9FTgOhIRXv39QtojEg6Ui0W9en6dEUlQ82uHODXBJ7taOCbM8rKwBXYnjQTMyqJHyTeYIGL81VWpWYoU83_joq-n9Ilv4QU8j4--f62qk7ZyGYfyI8PhsQ9N35K5EKHGFMcrVmJMR7iPoHFbCpHaxSltlY1EHrUUDe2CkjhT7CvFSWUJ2yoSXt9_kXgPWJdZXZJ7XatUzZav9gvvPldumk39r9E" />
              <img alt="Case Study 2" className="w-[60px] h-[40px] rounded object-cover border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4zdJwj3XoFlgCGUdg_9WawtU47LAPh9cOFDj9z8nSDwsh3lz92fhqAvZFL0KH8q57yzMCzqR1Np3TO2CX6y18vwqzUT9Ot4i2nWtuKZriBXIhmkNPbefvsd8fNcBcgwjPmFrjpZxYYNpcZW0O5Lj11Iq9LS_P53IeKXGiXd30YAVGZFzGFRjSkeB-kK4jlqBLQaAg9oeVULu0mr-DGuksd8LGRCX_MV7amJ8Cux_CENR5OuhquYQ2g1xNQPGYZo1EoFD8NbrnUHw" />
              <img alt="Case Study 3" className="w-[60px] h-[40px] rounded object-cover border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ154P3fh8Tp88rvwuwai3YnVrsFX94MmUg_hAqKIoMBZYdBe1PatmL4jT4nmd2-47B4Mu-PyPerp_qtrTJj9DrNOESWwG6_FH_67lAZj4ujStqYmDXOjU-_cIlJ_LevGsXhIEo0Ta-6vtdSZkvWphTgFwoU5kCvsxzTobWzu2ALnRaAtJpUrqxhQrLiiV3u0F38rwWSvxs1aACsQpdH4cmLnSwPEII4Fef7FGgARZk8s6SQ7C0xIvjxSywf6UO80ooXUpnp3Pf1A" />
            </div>
            <Link href="/portfolio" className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-1">
              See more case studies <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        {/* END: Hero Visual */}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 md:mt-24 bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm text-center max-w-3xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          Get a Free Brand Audit
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md mx-auto">
          Enter your email to receive a complimentary audit of your company's audio and short-form video presence.
        </p>
        <div className="max-w-md mx-auto">
          <SubscriberForm />
        </div>
      </div>
    </div>
  );
}
