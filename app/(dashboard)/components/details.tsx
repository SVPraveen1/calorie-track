'use client';

import Image from 'next/image';

export function Details() {
  const details = [
    {
      title: 'Smart Food Recognition',
      description: 'Our advanced AI can identify thousands of different foods and meals instantly from a single photo.'
    },
    {
      title: 'Accurate Nutrition Data',
      description: 'Get detailed macro and micronutrient breakdowns, including calories, protein, carbs, fats, vitamins and minerals.'
    },
    {
      title: 'Personalized Insights',
      description: 'Receive custom recommendations and track your nutrition goals with detailed analytics and progress tracking.'
    },
    {
      title: 'Easy to Use',
      description: 'Simply take a photo of your food and let our AI do the rest. No more manual logging or guesswork.'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Revolutionizing Food Tracking
            </h2>
            
            <div className="space-y-6">
              {details.map((detail, index) => (
                <div 
                  key={index}
                  className="group transform hover:scale-105 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0 relative">
            <div className="absolute -z-10 animate-blob1 blur-2xl opacity-30 bg-orange-400 rounded-full w-72 h-72 top-0 -right-10" />
            <div className="absolute -z-10 animate-blob2 blur-2xl opacity-30 bg-yellow-400 rounded-full w-72 h-72 bottom-0 -left-10" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="/images/mainpic.png"
                alt="CalTrack App Demo"
                width={600}
                height={800}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
