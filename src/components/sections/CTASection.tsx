import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Creative Tools &amp; Offers</h2>
        <p className="text-lg text-gray-600">Try EchoGrow before committing.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col h-full items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-800 mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">FREE Brand Audit</h3>
          <p className="text-sm text-gray-600 mb-6 flex-grow">Get personalized creative recommendations for your business.</p>
          <Link href="/contact" className="inline-block bg-black text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors">Start Free Audit</Link>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col h-full items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-800 mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">FREE Jingle Idea Generator</h3>
          <p className="text-sm text-gray-600 mb-6 flex-grow">Get ad hook ideas and jingle concepts for your brand.</p>
          <Link href="/contact" className="inline-block bg-black text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors">Try Free</Link>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col h-full items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-800 mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">FREE Viral Reel Ideas</h3>
          <p className="text-sm text-gray-600 mb-6 flex-grow">Generate engaging reel ideas tailored to your audience.</p>
          <Link href="/contact" className="inline-block bg-black text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors">Generate Ideas</Link>
        </div>
      </div>
    </section>
  );
}
