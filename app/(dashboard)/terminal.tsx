'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const features = [
    '🔍 Analyzing your food with AI...',
    '📊 Calculating precise nutritional values...',
    '📱 Syncing with your personal dashboard...',
    '🎯 Setting up your daily goals...',
    '📈 Preparing your progress charts...',
    '✨ All set! Start tracking with just a photo! 🎉',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalStep((prev) =>
        prev < features.length - 1 ? prev + 1 : prev
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [terminalStep]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(features.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg shadow-2xl overflow-hidden bg-gray-900 text-white font-mono text-base relative">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-6 w-6" />
            ) : (
              <Copy className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                ${index > terminalStep ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} 
                transform transition-all duration-700 ease-out
                ${index === terminalStep ? 'scale-105 text-orange-400 font-bold text-lg' : 'scale-100'}
                ${index < terminalStep ? 'text-gray-400' : ''}
                hover:scale-102 cursor-default
                border-l-3 border-transparent
                ${index === terminalStep ? 'border-orange-400 pl-3' : ''}
                relative tracking-wide leading-relaxed
                font-semibold
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
                animation: index === terminalStep ? 'pulse 2s infinite' : 'none',
                fontFamily: '"JetBrains Mono", monospace'
              }}
            >
              <span className={`
                text-green-400 mr-3 text-xl font-bold
                ${index === terminalStep ? 'animate-bounce' : ''}
              `}>
                {'>'}
              </span>
              {feature}
              {index === terminalStep && (
                <span className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full animate-ping" />
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
      `}</style>
    </div>
  );
}
