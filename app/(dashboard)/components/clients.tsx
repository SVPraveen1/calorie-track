'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const stats = [
  { 
    label: 'Total Users',
    value: 10000
  },
  { 
    label: 'Photos Analyzed', 
    value: 50000
  },
  { 
    label: 'Calories Tracked',
    value: 250000
  },
];

const testimonials = [
  {
    name: 'Saicharan S.',
    role: 'Fitness Enthusiast',
    message: 'CalTracko has completely transformed my nutrition tracking experience!',
    // image: '/testimonials/user-1.jpg'
  },
  {
    name: 'Darshan R.',
    role: 'Amateur Athlete',
    message: 'The AI-powered photo analysis makes tracking meals effortless.',
    // image: '/testimonials/user-2.jpg'
  },
  {
    name: 'Siddartha N.',
    role: 'Nutrition Coach',
    message: 'I recommend CalTracko to all my clients. It is simply revolutionary.',
    // image: '/testimonials/user-3.jpg'
  },
  {
    name: 'Sandeep R.',
    role: 'Weight Loss Journey',
    message: 'Lost 30 pounds in 6 months thanks to accurate tracking with CalTracko!',
    // image: '/testimonials/user-4.jpg'
  },
  {
    name: 'SVPraveen K.',
    role: 'Busy Professional',
    message: 'Finally, a nutrition app that fits into my hectic schedule.',
    // image: '/testimonials/user-5.jpg'
  },
];

export function ClientsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = [...prevCounts];
          if (newCounts[index] < stat.value) {
            newCounts[index] = Math.min(
              newCounts[index] + Math.ceil(stat.value / 100),
              stat.value
            );
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="py-24 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-card ${isVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                {counts[index].toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden">
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="testimonial-card"
              >
                <div className="flex items-center mb-4">
                  {/* <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div> */}
                  <div>
                    <div className="font-medium text-lg text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .stat-card {
          padding: 2rem;
          text-align: center;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          opacity: 0;
          transform: translateY(20px);
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .testimonial-track {
          display: flex;
          gap: 2rem;
          animation: scroll 40s linear infinite;
          width: fit-content;
          padding: 1rem;
        }

        .testimonial-card {
          flex: 0 0 auto;
          width: 320px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateZ(0);
          border: 1px solid rgba(229, 231, 235, 0.2);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(.dark) .testimonial-card {
          background: rgba(17, 24, 39, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .testimonial-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                      0 10px 10px -5px rgba(0, 0, 0, 0.04);
          background: rgba(255, 255, 255, 0.95);
        }

        :global(.dark) .testimonial-card:hover {
          background: rgba(17, 24, 39, 0.95);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .testimonial-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation: none;
          }
          .animate-fade-in {
            animation: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
