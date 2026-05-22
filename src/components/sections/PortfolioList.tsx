"use client";

import { useState } from "react";

interface CaseStudy {
  title: string;
  category: string;
  goal: string;
  deliverables: string;
  impact: string;
  img: string;
}

interface PortfolioListProps {
  initialCaseStudies: CaseStudy[];
}

export default function PortfolioList({ initialCaseStudies }: PortfolioListProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(initialCaseStudies.map((c) => c.category)))];

  const filteredCaseStudies = selectedCategory === "All"
    ? initialCaseStudies
    : initialCaseStudies.filter((c) => c.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* Category Filter Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm font-bold text-gray-600">Filter by Category:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                  selectedCategory === category
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCaseStudies.map((caseStudy, i) => (
          <article key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <img alt={caseStudy.title} className="w-full h-full object-cover" src={caseStudy.img} />
              </div>
              <div className="bg-gray-50 px-3 py-1 rounded-full flex items-center justify-center text-gray-700 text-xs font-medium border border-gray-200">
                {caseStudy.category}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{caseStudy.title}</h3>
            <div className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed space-y-2">
              <p><strong className="text-gray-800">Campaign Goal:</strong> {caseStudy.goal}</p>
              <p><strong className="text-gray-800">Creative Deliverables:</strong> {caseStudy.deliverables}</p>
              <p><strong className="text-gray-800">Expected Brand Impact:</strong> {caseStudy.impact}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
              <a className="text-sm font-medium text-gray-900 hover:underline inline-flex items-center gap-1" href="/contact">
                Request Similar Campaign <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
