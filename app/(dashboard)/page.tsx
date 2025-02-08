"use client"
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Zap, ChartBar } from 'lucide-react';
import { Terminal } from './terminal';
import Footer from './components/footer';
import { ClientsSection } from './components/clients';
import Details from './components/details';

export default function HomePage() {
  return (
    <main>
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-fade-in">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight sm:text-5xl md:text-6xl">
                Tracking Food with AI
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 animate-gradient hover:from-orange-600 hover:to-orange-700">
                  Made Simple
                </span>
              </h1>
              <p className="mt-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl animate-slide-up">
                Say goodbye to manual calorie counting. CalTrack uses cutting-edge AI to instantly analyze your food photos,
                delivering precise nutritional insights in seconds. It's like having a nutritionist in your pocket.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full text-lg px-8 py-4 inline-flex items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce-subtle">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                </Button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="absolute -z-10 animate-blob1 blur-2xl opacity-30 bg-orange-400 rounded-full w-72 h-72 top-0 -right-10" />
              <div className="absolute -z-10 animate-blob2 blur-2xl opacity-30 bg-yellow-400 rounded-full w-72 h-72 bottom-0 -left-10" />
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50 dark:to-gray-800 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {[
              {
                icon: Camera,
                title: "Snap & Track",
                description: "Point, shoot, and know exactly what you're eating. Our AI analyzes your food photos in real-time with incredible accuracy.",
                delay: "0"
              },
              {
                icon: Zap,
                title: "Lightning-Fast AI",
                description: "Powered by state-of-the-art machine learning, get instant nutritional breakdowns with just a single photo.",
                delay: "200"
              },
              {
                icon: ChartBar,
                title: "Smart Insights",
                description: "Track trends, set goals, and watch your progress with beautiful, interactive charts and personalized recommendations.",
                delay: "400"
              }
            ].map((feature, index) => (
              <div key={index} className="group mt-10 lg:mt-0 transform hover:scale-105 transition-all duration-300" style={{animationDelay: `${feature.delay}ms`}}>
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <feature.icon className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="mt-5">
                  <h2 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 group-hover:text-orange-500 transition-colors duration-300">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-base text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Details/>
      <ClientsSection/>
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200 dark:bg-orange-800 rounded-full opacity-50 blur-xl"></div>
              <h2 className="relative text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                Ready to transform your nutrition journey?
              </h2>
              <p className="mt-6 max-w-3xl text-lg text-gray-700 dark:text-gray-300">
                Join over <span className="font-semibold text-orange-600 dark:text-orange-400">thriving community</span> who have revolutionized their healthy eating habits with CalTrack. Experience the power of AI-driven nutrition tracking that adapts to your lifestyle.
              </p>
              <div className="mt-8 flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <span className="text-orange-500">✓</span>
                  <span className="ml-2">7-day free trial</span>
                </div>
                <div className="flex items-center">
                  <span className="text-orange-500">✓</span>
                  <span className="ml-2">No credit card required</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 flex flex-col items-center lg:items-end">
              <Button
                className="transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full text-xl px-12 py-6 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/sign-up'}
              >
                Start your journey
                <ArrowRight className="ml-3 h-6 w-6 animate-pulse" />
              </Button>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Join the  community of health-conscious individuals
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      
    </main>
  

  );
}
