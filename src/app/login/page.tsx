"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/actions/admin";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <div className="flex-grow flex items-center justify-center bg-[#f8f9fa] px-4 py-20">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full translate-x-8 -translate-y-8 pointer-events-none border border-gray-100"></div>
        
        <div className="mb-8 text-center relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span className="text-xl font-bold tracking-tight text-black">EchoGrow</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-500">Sign in to manage your leads & subscribers</p>
        </div>

        <form action={formAction} className="space-y-6 relative z-10">
          {state?.error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-4 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{state.error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="font-semibold text-xs uppercase tracking-wider text-gray-500 block" htmlFor="username">
              Username
            </label>
            <input
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm text-gray-950"
              id="username"
              name="username"
              placeholder="admin"
              required
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-xs uppercase tracking-wider text-gray-500 block" htmlFor="password">
              Password
            </label>
            <input
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm text-gray-950"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              type="password"
            />
          </div>

          <button
            disabled={isPending}
            className="w-full flex justify-center items-center gap-2 bg-black text-white font-semibold text-sm py-4 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            type="submit"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
