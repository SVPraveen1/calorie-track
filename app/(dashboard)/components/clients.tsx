'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const stats = [
  { 
    label: 'Active Users',
    value: 100000
  },
  { 
    label: 'Photos Analyzed', 
    value: 5000000
  },
  { 
    label: 'Calories Tracked',
    value: 25000000
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Fitness Enthusiast',
    message: 'CalTracko has completely transformed my nutrition tracking experience!',
    image: '/testimonials/user-1.jpg'
  },
  {
    name: 'James K.',
    role: 'Amateur Athlete',
    message: 'The AI-powered photo analysis makes tracking meals effortless.',
    image: '/testimonials/user-2.jpg'
  },
  {
    name: 'Emily R.',
    role: 'Nutrition Coach',
    message: 'I recommend CalTracko to all my clients. It is simply revolutionary.',
    image: '/testimonials/user-3.jpg'
  },
  {
    name: 'Michael P.',
    role: 'Weight Loss Journey',
    message: 'Lost 30 pounds in 6 months thanks to accurate tracking with CalTracko!',
    image: '/testimonials/user-4.jpg'
  },
  {
    name: 'Lisa T.',
    role: 'Busy Professional',
    message: 'Finally, a nutrition app that fits into my hectic schedule.',
    image: '/testimonials/user-5.jpg'
  },
];

export function ClientsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
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
    <div className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="testimonial-card"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
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
          background-color: rgb(255, 255, 255);
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateZ(0);
          border: 1px solid rgba(229, 231, 235, 0.1);
          transition: all 0.3s ease;
        }

        :global(.dark) .testimonial-card {
          background-color: rgb(17, 24, 39);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -6px rgba(0, 0, 0, 0.15);
        }

        :global(.dark) .testimonial-card:hover {
          box-shadow: 0 12px 20px -6px rgba(0, 0, 0, 0.3);
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
      `}</style>
    </div>
  );
}
