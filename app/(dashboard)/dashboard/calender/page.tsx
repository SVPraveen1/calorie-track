"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';

interface Meal {
  id: number;
  name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  createdAt: string;
}

function FoodAnalysisPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const { theme } = useTheme();

  // Fetch meals based on date range
  const fetchMeals = async () => {
    if (!startDate || !endDate) {
      setMeals([]);
      setIsAnalyzed(false);
      return;
    }

    try {
      const response = await fetch(`/api/meals?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      setMeals(data);
      setIsAnalyzed(true);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setIsAnalyzed(false);
    }
  };

  // Updated Calculate total nutrients with proper number parsing
  const totals = meals.reduce((acc, meal) => ({
    calories: acc.calories + (Number(meal.calories) || 0),
    protein: acc.protein + (Number(meal.protein) || 0),
    carbs: acc.carbs + (Number(meal.carbs) || 0),
    fat: acc.fat + (Number(meal.fat) || 0)
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  // Updated Format number function to handle decimals better
  const formatNumber = (num: number) => {
    if (num === 0 || isNaN(num)) return '0';
    return num.toFixed(1);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">
          Food Analysis Dashboard
        </h1>

        {/* Date Filter Section */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm-bold font-medium mb-2 dark:text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm-bold font-medium mb-2 dark:text-gray-300">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          <button
            onClick={fetchMeals}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Analyze
          </button>
        </div>

        {/* Statistics Cards - Only show when analyzed */}
        {isAnalyzed && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Calories', value: totals.calories || 0, bgColor: 'bg-red-100 dark:bg-red-900/30', textColor: 'text-red-600 dark:text-red-400' },
              { label: 'Total Protein', value: totals.protein || 0, unit: 'g', bgColor: 'bg-green-100 dark:bg-green-900/30', textColor: 'text-green-600 dark:text-green-400' },
              { label: 'Total Carbs', value: totals.carbs || 0, unit: 'g', bgColor: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-600 dark:text-blue-400' },
              { label: 'Total Fat', value: totals.fat || 0, unit: 'g', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30', textColor: 'text-yellow-600 dark:text-yellow-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${stat.bgColor} p-6 rounded-lg shadow-md overflow-hidden transform transition-all duration-200 hover:scale-105`}
              >
                <h3 className={`text-sm font-extrabold ${stat.textColor} uppercase tracking-wider mb-2`}>
                  {stat.label}
                </h3>
                <p className={`text-2xl font-bold ${stat.textColor} truncate`}>
                  {formatNumber(stat.value)}{stat.unit}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Meals List - Only show when analyzed */}
        {isAnalyzed && meals.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Meal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Calories
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Protein
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Carbs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Fat
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {meals.map((meal) => (
                    <tr key={meal.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(meal.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{meal.name}</td>
                      <td className="px-6 py-4">{meal.calories || '-'}</td>
                      <td className="px-6 py-4">{meal.protein || '-'}g</td>
                      <td className="px-6 py-4">{meal.carbs || '-'}g</td>
                      <td className="px-6 py-4">{meal.fat || '-'}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Data Message */}
        {isAnalyzed && meals.length === 0 && (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400">
              No meals found for the selected date range
            </p>
          </div>
        )}

        {/* Initial State Message */}
        {!isAnalyzed && (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400">
              Select a date range and click Analyze to view your meal data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodAnalysisPage;