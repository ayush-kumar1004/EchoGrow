"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { submitContactForm } from "@/actions/contact";

export default function ContactFormFull() {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast.success(result.message);
        setIsSubmitted(true);
        const formElement = document.getElementById("full-contact-form") as HTMLFormElement;
        if (formElement) formElement.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-6 bg-gray-50 rounded-3xl border border-gray-200 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-sm">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">Thank You!</h3>
        <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
          Your creative brief and request for a free brand audit has been received. We will analyze your inputs and get back to you within 24 to 48 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6" id="full-contact-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-semibold text-sm text-gray-900" htmlFor="business-name">Business / Brand Name</label>
          <input className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all text-sm" id="business-name" name="business-name" placeholder="Acme Corp" required type="text" />
        </div>
        <div className="space-y-2">
          <label className="font-semibold text-sm text-gray-900" htmlFor="contact-name">Your Name</label>
          <input className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all text-sm" id="contact-name" name="contact-name" placeholder="Jane Doe" required type="text" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-semibold text-sm text-gray-900" htmlFor="email">Email Address</label>
          <input className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all text-sm" id="email" name="email" placeholder="jane@example.com" required type="email" />
        </div>
        <div className="space-y-2">
          <label className="font-semibold text-sm text-gray-900" htmlFor="business-type">Business Type</label>
          <select className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all text-sm appearance-none" defaultValue="" id="business-type" name="business-type">
            <option disabled value="">Select an option</option>
            <option value="fmcg">FMCG &amp; Products</option>
            <option value="food">Food &amp; Beverage</option>
            <option value="retail">Retail &amp; Fashion</option>
            <option value="home">Paint &amp; Home Brands</option>
            <option value="fitness">Fitness &amp; Wellness</option>
            <option value="education">Education &amp; Coaching</option>
            <option value="local">Local Business</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="font-semibold text-sm text-gray-900 block">What do you need help with?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {["Brand Recall & Recognition", "Custom Jingles / Ad Music", "Product Advertising", "Viral Reel Concepts", "Campaign Strategy", "Growth Recommendations"].map((service) => (
            <label key={service} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors group">
              <input className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black" name="services" type="checkbox" value={service} />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-sm text-gray-900 block" htmlFor="goals">Tell us about your goals</label>
        <textarea className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all text-sm resize-y" id="goals" name="goals" placeholder="Example: We want our product brand to become more memorable..." rows={4}></textarea>
      </div>

      <div className="pt-4">
        <button disabled={isPending} className="w-full bg-black text-white px-8 py-4 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" type="submit">
          {isPending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Get Free Brand Audit"
          )}
        </button>
        <p className="text-center text-gray-500 mt-4 text-sm">No spam • Free consultation • Response within 24–48 hrs</p>
      </div>
    </form>
  );
}
