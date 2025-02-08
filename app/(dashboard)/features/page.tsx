'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeaturesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight text-indigo-900 dark:text-white sm:text-5xl mb-4 font-heading bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Smart Calorie Tracking Made Simple
        </h1>
        <p className="text-lg text-indigo-700 dark:text-gray-300 font-body">
          Track your nutrition with 95%+ accuracy using advanced AI-powered food analysis
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Snap & Track",
            description: "Simply take a photo of your food and let our AI instantly analyze calories, proteins, carbs, and fats with over 95% accuracy.",
            gradient: "from-pink-500 to-rose-500"
          },
          {
            title: "Detailed Macro Analysis",
            description: "Get comprehensive breakdown of macronutrients in grams and percentages for every meal you photograph.",
            gradient: "from-purple-500 to-indigo-500"
          },
          {
            title: "Calendar Tracking",
            description: "Monitor your daily nutrition journey with an intuitive calendar view showing your complete meal history.",
            gradient: "from-blue-500 to-cyan-500"
          },
          {
            title: "Smart Recommendations",
            description: "Receive personalized meal suggestions and nutrition advice based on your eating patterns and goals.",
            gradient: "from-teal-500 to-emerald-500"
          },
          {
            title: "Visual Food Journal",
            description: "Build a visual diary of your meals with automatic calorie and macro tracking, making it easy to maintain healthy habits.",
            gradient: "from-orange-500 to-amber-500"
          },
          {
            title: "Progress Insights",
            description: "View detailed charts and trends of your nutrition intake over time to help you stay on track with your health goals.",
            gradient: "from-red-500 to-orange-500"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.7,
              delay: index * 0.2,
              ease: [0.21, 1.11, 0.81, 0.99]
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <Link 
          href="/pricing"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-blue-500 dark:to-purple-500 transition-all duration-300 hover:scale-105 font-body shadow-lg hover:shadow-xl"
        >
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </main>
  );
}

function FeatureCard({ title, description, gradient }: { title: string; description: string; gradient: string }) {
  return (
    <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700 bg-white dark:bg-gray-900 group">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
        <Check className="h-5 w-5 text-white" />
      </div>
      <h3 className={`text-xl font-semibold mb-2 font-heading bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 font-body">
        {description}
      </p>
    </div>
  );
}
