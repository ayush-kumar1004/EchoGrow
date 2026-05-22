"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { subscribeEmail } from "@/actions/contact";

export default function SubscriberForm() {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await subscribeEmail(formData);
      if (result.success) {
        toast.success(result.message);
        setIsSubmitted(true);
        const formElement = document.getElementById("subscriber-form") as HTMLFormElement;
        if (formElement) formElement.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-6 px-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-sm font-bold text-gray-900">Thank You!</h4>
        <p className="text-xs text-gray-600 max-w-[200px] leading-relaxed">
          You have successfully requested a free audit review.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-3" id="subscriber-form">
      <input 
        className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm focus:ring-black focus:border-black placeholder-gray-400" 
        name="email"
        placeholder="Email address" 
        required 
        type="email" 
      />
      <button 
        disabled={isPending}
        className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
        type="submit"
      >
        {isPending ? "Subscribing..." : "Get Free Audit"}
      </button>
    </form>
  );
}
