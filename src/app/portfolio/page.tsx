import { Metadata } from "next";
import PortfolioInquiryForm from "@/components/forms/PortfolioInquiryForm";
import PortfolioList from "@/components/sections/PortfolioList";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Creative Campaigns & Brand Success Stories",
};

const caseStudies = [
  {
    title: "SpiceGlow Masala Campaign",
    category: "Food & Beverage",
    goal: "Increase brand recall and customer engagement.",
    deliverables: "Custom jingle + short-form ad concepts + branding support.",
    impact: "Higher memorability and stronger customer recall.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL1pfvsDcljQrVjEo3_NwWrvb-lJt9jmAe4jbWlqkwmB_hjYPOeDmEt3MY84XV0mSfU6MQo5qZAhXY52GtsfbsrmKbEZfFAQRBcyBq0sV72adfagFqbEkZVYxMUaLuls_zMj5p6c-P_xrtPXwpb4N1SxrOyCH8ZvyRaUOgJ9xcQCYO8YthECRcbYo1WP606x41FxID8i3YKxBnHHrx5mZXw1IL6frQJE2X2bG3MPCMya4cwxSsQ6Z97c6N9JXLhIb5Sj4-Syeaj0U"
  },
  {
    title: "ColorNest Paints Branding",
    category: "Home & Paint",
    goal: "Refresh brand identity and drive product awareness.",
    deliverables: "Visual identity overhaul + targeted digital ad campaign.",
    impact: "Modernized brand perception and increased market share.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIWz-WNuQbOLgMmgUKkYzlgVxWGMC4FkdLOxXY0rwclo-jeXOjM22rYPaGMazdc-E00Ms3L-4P7xqGjoY-HeysUas7OQxU6IWNpubJVeSY7kfYzptNYRQjw9cIyGYu5C41DsIMEaw4izXjfrUrhKCD3_dO5tcGeSW5jCLcCoYipFfrR3VZ51X2JJnVO3OhxMLpuFFaAzcXHsU74ChYvWJL1W7yy5SBr6ZaQ9-2orc4xW0Ix-1Hs0JUgBNToZpctyUdJ6GH05nK3KA"
  },
  {
    title: "UrbanFit Gym Reel Series",
    category: "Fitness & Wellness",
    goal: "Boost local gym memberships and community engagement.",
    deliverables: "Viral reel concepts + motivational ad copy + influencer strategy.",
    impact: "Higher social engagement and increased trial sign-ups.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpo-QP2B5udR8itGVVBeytR1Vo7rKrx54IobpT-Y41amk1TiL5khKT0u906--2dFS-22bBm_ykexh6KQqlK2F6MsaqCjiezOw5ohbnfEs7419mLO8UrwvME66-9HMK7XcWPjheGgorZm-wpHZf8RuGH7f0X6WYw6Hg4-wPPk6aURYP6Ss7M7DS7N5e02uMso57KR7MIglcj8XBGNi5SFynxa-ETLmDIsTIBIQvHm9yQxtcs70OxH0rj0Yes4v6IqqaFQlIccKqDVM"
  },
  {
    title: "BrewBuzz Cafe Jingle",
    category: "Food & Beverage",
    goal: "Create a recognizable audio identity for local radio and social media.",
    deliverables: "Catchy 15-second jingle + social media teaser videos.",
    impact: "Instant brand recognition and increased foot traffic.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6pSJwjfUIkKPgPDlSDT7DHOPizp5Tuu6M6BIeQczCRyekP8pNzEUoIRV_nE4Zk4cIBnPYVcbhtEwFHlNiiD_uSH5GkNrQh2cJFegU9QvMz9cHQR-ZXWleV-Bv9dc4w418jdSkm5oWacC6hewFBej0rHQz-f4Svd1FEJ_kI80JGQDUqfrqVJzRGJSubX-SxOotm6_7LJgJeIwFelARCh7Nyt6Fw6nq8M7HW7_1DOqfBsJt3-YqZBqP7I0RSXgJBc_w1lPzLTrw58U"
  },
  {
    title: "FreshMart Retail Launch",
    category: "Retail & Fashion",
    goal: "Generate buzz for a new flagship store opening.",
    deliverables: "Launch campaign strategy + localized OOH ads + grand opening event promotion.",
    impact: "High opening day attendance and sustained local awareness.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaEfwdkvdhPlVfRvHTxXL9btJhcLoRn5FX7940t40kFWeVGIsYQwsJ9ZtVQLfp9xP1EUbGX_-o0fIXHefZoIiW9_qEF2-l_nVH0CZ35iHORuiVPCkDKj0ucBWYbIVysMSGNkmMMCeE1RpYyE8DDwNwYT1wN6GZu2b2ZMM5grrQ6cnu0Ey0RAoY3We2Bskx7wmo1fxJzTuedPzwo8rAu8K_Rskt2GkA9Z96NAQczzSp8rTL5wGPGLoFyZ2pyfjVRvSZzGGn1ZRGjXw"
  },
  {
    title: "BrightEdge Coaching Campaign",
    category: "Education/Professional Services",
    goal: "Establish thought leadership and attract premium clients.",
    deliverables: "High-end video testimonials + targeted LinkedIn ad campaign.",
    impact: "Increased professional credibility and higher conversion rates.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArav0jq2AzkoKVlUfyYn1Od5zvsL23JC-ibWejh681q2UMEbC2A4Zz-pgsj37IvF8PCjSfcvHYWRYjCwALaFwSkKjzajWWuAm5sx1KalOhEPevYQLmOYZfD_wp7RZyXCEtSEkM07GD67H0WFpUgp-AvgPPDmmNkx7Iw1b-YgfB50eHwK3qHB64p6KAwRcqjOIXZ-c4nNbPMZJyPIh8z1_CkQB97AtQkRiJKIsgWlrgs889WclBOO2CJbCYAgLoofsZQaF5Re_Avg0"
  }
];

export default function PortfolioPage() {
  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 flex flex-col gap-8">
        <section className="bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between items-start border border-gray-100">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">Creative Campaigns &amp; Brand Success Stories</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Explore sample campaigns, ad concepts, branded jingles, and creative growth ideas built for businesses and product brands.
            </p>
          </div>
        </section>

        {/* Portfolio Listing Client Component (handles interactive category filtering) */}
        <PortfolioList initialCaseStudies={caseStudies} />
      </div>

      <aside className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-900">Start Your Project</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Get a free creative direction recommendation for your brand.
          </p>
          <PortfolioInquiryForm />
        </div>
      </aside>
    </main>
  );
}
