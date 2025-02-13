"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes'; 
import { WorkoutRoutine, workoutRoutines } from '../../components/workoutRoutines';

const Suggestions: React.FC = () => {
  const [userInputs, setUserInputs] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: '',
    manualCalories: ''
  });

  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    macros: {
      protein: number;
      fats: number;
      carbs: number;
    };
  } | null>(null);

  const { theme } = useTheme();
  const [selectedRoutine, setSelectedRoutine] = useState<any[]>([]);
  const [workoutSuggestions, setWorkoutSuggestions] = useState<string[]>([]);

  const activityFactors = {
    sedentary: 1.2,      // Little/no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Heavy exercise 6-7 days/week
    extra: 1.9          // Very heavy exercise, physical job
  };

  const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
    // Mifflin-St Jeor Equation
    const baseBMR = (10 * weight) + (6.25 * height) - (5 * age);
    return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
  };

  const calculateTDEE = (bmr: number, activityLevel: string): number => {
    const factor = activityFactors[activityLevel as keyof typeof activityFactors];
    return Math.round(bmr * factor);
  };

  const calculateMacros = (calories: number, weight: number, goal: string) => {
    let protein = 0, fats = 0, carbs = 0;

    switch(goal) {
      case 'lose':
        protein = weight * 2.2; // 2.2g per kg
        fats = Math.round((calories * 0.25) / 9); // 25% of calories from fat
        carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
        break;
      case 'gain':
        protein = weight * 2; // 2g per kg
        fats = Math.round((calories * 0.3) / 9); // 30% of calories from fat
        carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
        break;
      default: // maintain
        protein = weight * 1.8; // 1.8g per kg
        fats = Math.round((calories * 0.25) / 9); // 25% of calories from fat
        carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
    }

    return {
      protein: Math.round(protein),
      fats: Math.round(fats),
      carbs: Math.round(carbs)
    };
  };

  const getWorkoutSuggestions = (goal: string) => {
    switch(goal) {
      case 'lose':
        return [
          "Include 3-4 days of cardio",
          "Add HIIT workouts for fat burning",
          "Focus on compound exercises",
          "Maintain shorter rest periods"
        ];
      case 'gain':
        return [
          "Focus on heavy compound lifts",
          "Include progressive overload",
          "Limit cardio sessions",
          "Rest 2-3 minutes between sets"
        ];
      default:
        return [
          "Mix cardio and strength training",
          "Focus on form and technique",
          "Include flexibility work",
          "Stay consistent with routine"
        ];
    }
  };

  const handleCalculate = () => {
    const weight = parseFloat(userInputs.weight);
    const height = parseFloat(userInputs.height);
    const age = parseFloat(userInputs.age);
    
    if (!weight || !height || !age || !userInputs.gender || !userInputs.activityLevel || !userInputs.goal) {
      alert('Please fill in all fields');
      return;
    }

    const bmr = calculateBMR(weight, height, age, userInputs.gender);
    const tdee = calculateTDEE(bmr, userInputs.activityLevel);
    let targetCalories = tdee;

    // Adjust calories based on goal
    switch(userInputs.goal) {
      case 'lose':
        targetCalories = tdee - 500;
        break;
      case 'gain':
        targetCalories = tdee + 500;
        break;
    }

    const macros = calculateMacros(targetCalories, weight, userInputs.goal);

    const workouts = getWorkoutSuggestions(userInputs.goal);
    setWorkoutSuggestions(workouts);
    
    // Map the user goals to workout routine types
    const routineMap = {
      'lose': 'loseFat',
      'gain': 'gainWeight',
      'maintain': 'cutting'
    };
    const routineKey = routineMap[userInputs.goal as keyof typeof routineMap];
    setSelectedRoutine(workoutRoutines[routineKey] || []);

    setResults({
      bmr: Math.round(bmr),
      tdee: tdee,
      targetCalories: targetCalories,
      macros
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5
      }
    })
  };

  const buttonAnimation = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.95 }
  };

  const selectOptions = {
    gender: [
      { value: "", label: "Select Gender" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" }
    ],
    activityLevel: [
      { value: "", label: "Activity Level" },
      { value: "sedentary", label: "Sedentary (little/no exercise)" },
      { value: "light", label: "Light (1-3 days/week)" },
      { value: "moderate", label: "Moderate (3-5 days/week)" },
      { value: "active", label: "Active (6-7 days/week)" },
      { value: "extra", label: "Extra Active (physical job + training)" }
    ],
    goal: [
      { value: "", label: "Select Goal" },
      { value: "lose", label: "Weight Loss" },
      { value: "maintain", label: "Maintenance" },
      { value: "gain", label: "Weight Gain" }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Nutrition Calculator
      </motion.h1>
      
      <motion.div
        variants={formAnimation}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {[
          { name: "weight", placeholder: "Weight (kg)" },
          { name: "height", placeholder: "Height (cm)" },
          { name: "age", placeholder: "Age" }
        ].map((field, index) => (
          <motion.input
            key={field.name}
            custom={index}
            variants={inputAnimation}
            type="number"
            name={field.name}
            placeholder={field.placeholder}
            value={userInputs[field.name as keyof typeof userInputs]}
            onChange={handleInputChange}
            className="input-field"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          />
        ))}

        {/* Select inputs */}
        {Object.entries(selectOptions).map(([field, options], index) => (
          <motion.select
            key={field}
            custom={index + 3}
            variants={inputAnimation}
            name={field}
            value={userInputs[field as keyof typeof userInputs]}
            onChange={handleInputChange}
            className="input-field"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
        ))}
      </motion.div>

      <motion.button
        variants={buttonAnimation}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={handleCalculate}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Calculate
      </motion.button>

      <AnimatePresence>
        {results && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Your Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Daily Calories</h3>
                  <p>BMR: {results.bmr} calories</p>
                  <p>TDEE: {results.tdee} calories</p>
                  <p>Target: {results.targetCalories} calories</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Macronutrients</h3>
                  <p>Protein: {results.macros.protein}g ({results.macros.protein * 4} calories)</p>
                  <p>Fats: {results.macros.fats}g ({results.macros.fats * 9} calories)</p>
                  <p>Carbs: {results.macros.carbs}g ({results.macros.carbs * 4} calories)</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold mb-4"
              >
                Workout Recommendations
              </motion.h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {workoutSuggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {suggestion}
                  </motion.li>
                ))}
              </ul>

              {selectedRoutine.length > 0 && (
                <WorkoutRoutine routine={selectedRoutine} theme={theme} />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Suggestions;