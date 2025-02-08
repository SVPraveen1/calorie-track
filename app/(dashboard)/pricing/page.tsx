import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basePlan = products.find((product) => product.name === 'Base');
  const plusPlan = products.find((product) => product.name === 'Plus');

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
          Choose Your Plan
        </h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <PricingCard
              name={basePlan?.name || 'Base'}
              price={basePrice?.unitAmount || 800}
              interval={basePrice?.interval || 'month'}
              trialDays={basePrice?.trialPeriodDays || 7}
              features={[
                'Unlimited Usage',
                'Unlimited Workspace Members',
                'Email Support',
              ]}
              priceId={basePrice?.id}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <PricingCard
              name={plusPlan?.name || 'Plus'}
              price={plusPrice?.unitAmount || 1200}
              interval={plusPrice?.interval || 'month'}
              trialDays={plusPrice?.trialPeriodDays || 7}
              features={[
                'Everything in Base, and:',
                'Early Access to New Features',
                '24/7 Support + Slack Access',
              ]}
              priceId={plusPrice?.id}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
}) {
  return (
    <div className="pt-6">
      <div className="relative rounded-lg border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-orange-500 group bg-gray-50 dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent dark:from-orange-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        <div className="relative">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            with {trialDays} day free trial
          </p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-6">
            ${price / 100}{' '}
            <span className="text-xl font-normal text-gray-600 dark:text-gray-300">
              per user / {interval}
            </span>
          </p>
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start group-hover:transform group-hover:translate-x-1 transition-transform duration-200">
                <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0 animate-bounce-subtle" />
                <span className="text-gray-700 dark:text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
          <form action={checkoutAction}>
            <input type="hidden" name="priceId" value={priceId} />
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
