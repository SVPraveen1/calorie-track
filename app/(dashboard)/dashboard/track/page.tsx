"use client";

import { FoodAnalyzer } from "@/app/(dashboard)/components/food-analyzer";
import { useEffect, useState } from "react";

interface ImageInfo {
  src: string;
  name: string;
  size: number;
  type: string;
}

export default function Page() {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);

  useEffect(() => {
    const header = document.querySelector("h1");
    if (header) {
      header.classList.add("animate-fade-in");
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageInfo({
          src: reader.result as string,
          name: file.name,
          size: Math.round(file.size / 1024),
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-10 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400 transition-transform transform hover:scale-105">
        Food Analyzer
      </h1>
      <FoodAnalyzer imageSrc={imageInfo?.src || null} />
    </div>
  );
}

