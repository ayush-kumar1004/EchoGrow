import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "EchoGrow - Brand Growth Agency",
    template: "%s | EchoGrow",
  },
  description: "EchoGrow helps businesses and brands grow through custom ad music, memorable jingles, viral creative concepts, and measurable marketing strategies.",
  keywords: ["branding", "growth agency", "jingles", "ad music", "viral marketing"],
  openGraph: {
    title: "EchoGrow - Brand Growth Agency",
    description: "Creative branding, custom ad music, and growth-focused advertising.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans text-[#0F172A] bg-[#f8f9fa]" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
