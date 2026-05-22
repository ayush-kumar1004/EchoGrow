"use client";

import { useState } from "react";

interface Service {
  title: string;
  description: string;
  time: string;
  icon: string;
  category: string;
}

interface ServicesListProps {
  initialServices: Service[];
}

export default function ServicesList({ initialServices }: ServicesListProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(initialServices.map((s) => s.category)))];

  const filteredServices = selectedCategory === "All"
    ? initialServices
    : initialServices.filter((s) => s.category === selectedCategory);

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

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service, i) => (
          <article key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2.5 py-1 rounded">
                {service.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">{service.description}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
              <a className="text-sm font-medium text-gray-900 hover:underline inline-flex items-center gap-1" href="/contact">
                Learn More <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <span className="text-xs text-gray-400">{service.time}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
