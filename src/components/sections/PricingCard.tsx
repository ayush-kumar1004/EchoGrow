import Link from 'next/link';

export interface PricingCardProps {
  title: string;
  description: string;
  priceLabel: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  footnote: string;
  isPopular?: boolean;
}

export default function PricingCard({
  title,
  description,
  priceLabel,
  price,
  features,
  buttonText,
  buttonHref,
  footnote,
  isPopular = false,
}: PricingCardProps) {
  return (
    <article className={`rounded-3xl p-8 shadow-sm border flex flex-col hover:shadow-md transition-shadow relative ${isPopular ? 'bg-gray-900 border-gray-800 text-white shadow-md hover:shadow-lg transform md:-translate-y-4' : 'bg-white border-gray-100'}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          MOST POPULAR
        </div>
      )}
      <div className={`mb-6 ${isPopular ? 'mt-2' : ''}`}>
        <h3 className={`text-xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-sm h-10 ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
      </div>
      <div className="mb-8">
        <div className={`text-sm font-medium mb-1 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{priceLabel}</div>
        <div className={`text-3xl font-bold ${isPopular ? 'text-white' : 'text-gray-900'}`}>{price}</div>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${isPopular ? 'text-gray-200' : 'text-gray-700'}`}>
            <svg className={`w-4 h-4 mt-1 flex-shrink-0 ${isPopular ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link href={buttonHref} className={`block w-full text-center py-3 rounded-full font-medium transition-colors mb-4 ${isPopular ? 'bg-white text-black hover:bg-gray-100' : price === 'Custom' ? 'border border-gray-300 text-gray-900 hover:bg-gray-50' : 'bg-black text-white hover:bg-gray-800'}`}>
        {buttonText}
      </Link>
      <p className="text-xs text-gray-400 text-center leading-relaxed">{footnote}</p>
    </article>
  );
}
