"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { submitContactForm } from "@/actions/contact";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast.success(result.message);
        setIsSubmitted(true);
        const formElement = document.getElementById("quick-contact-form") as HTMLFormElement;
        if (formElement) formElement.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  if (isSubmitted) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-8 sticky top-32 shadow-sm text-center py-12 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-sm">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900">Thank You!</h3>
        <p className="text-xs text-gray-500 leading-relaxed max-w-[220px]">
          Your quick brief has been received. We will get back to you shortly!
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors underline mt-2"
        >
          Submit another brief
        </button>
      </div>
    );
  }
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8 sticky top-32 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Quick Brief</h3>
        <span className="text-xs text-gray-500">Ready in 2 minutes</span>
      </div>
      <form action={handleSubmit} className="space-y-4" id="quick-contact-form">
        <div>
          <input className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-gray-900" name="contact-name" placeholder="Your name" required type="text" />
        </div>
        <div>
          <input className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-gray-900" name="email" placeholder="Email" required type="email" />
        </div>
        <div>
          <textarea className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-gray-900 resize-none" name="goals" placeholder="What's your goal?" required rows={3}></textarea>
        </div>
        <button disabled={isPending} className="w-full flex justify-center items-center gap-2 bg-black text-white font-medium text-sm py-4 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
          {isPending ? "Starting..." : "Start Brief"}
        </button>
      </form>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-3">Need help?</p>
        <button className="flex items-center gap-2 text-black font-medium text-sm hover:underline">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Chat with a strategist
        </button>
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <p className="font-bold text-xs text-gray-900">Fast Turnaround</p>
            <p className="text-[10px] text-gray-500">Benchmark SLAs across creative types</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <p className="font-bold text-xs text-gray-900">IP Ownership</p>
            <p className="text-[10px] text-gray-500">Full rights delivered on final assets</p>
          </div>
        </div>
      </div>
    </div>
  );
}
