"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { workoutRoutines, WorkoutRoutine } from '@/app/(dashboard)/components/workoutRoutines'; // Import workout routines and component

const Suggestions: React.FC = () => {
  const [goal, setGoal] = useState<string>('');
  const [calories, setCalories] = useState<number | null>(null);
  const [workouts, setWorkouts] = useState<string[]>([]);
  const [weeklyRoutine, setWeeklyRoutine] = useState<{ day: string; exercises: string[] }[]>([]);
  const { theme } = useTheme();

  const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGoal = event.target.value;
    setGoal(selectedGoal);
    calculateCaloriesAndWorkouts(selectedGoal);
    setWeeklyRoutine(workoutRoutines[selectedGoal] || []); // Set weekly routine from imported data
    if (selectedGoal !== '') {
      console.log(`To achieve your goal of ${selectedGoal}, you should consume approximately ${calories} calories per day.`);
    } else {
      console.log('Please select a goal to get personalized recommendations.');
    }
  };

  const calculateCaloriesAndWorkouts = (goal: string) => {
    let dailyCalories: number;
    let selectedWorkouts: string[];

    switch (goal) {
      case 'loseFat':
        dailyCalories = 1500;
        selectedWorkouts = ['Cardio', 'Strength Training', 'High-Intensity Interval Training'];
        break;
      case 'gainWeight':
        dailyCalories = 2500;
        selectedWorkouts = ['Weightlifting', 'Compound Exercises', 'Calorie-Dense Meals'];
        break;
      case 'cutting':
        dailyCalories = 1800;
        selectedWorkouts = ['HIIT', 'Bodyweight Exercises', 'Moderate Cardio'];
        break;
      default:
        dailyCalories = 0;
        selectedWorkouts = [];
    }

    setCalories(dailyCalories);
    setWorkouts(selectedWorkouts);
  };

  return (
    <motion.div
      className={`suggestions p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-2xl rounded-xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Caloric Intake and Workout Suggestions
      </h2>
      <label htmlFor="goal" className="block mb-3 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Select your goal:
      </label>
      <motion.select
        id="goal"
        value={goal}
        onChange={handleGoalChange}
        className="mb-6 p-3 w-full border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <option value="">--Select--</option>
        <option value="loseFat">Lose Fat</option>
        <option value="gainWeight">Gain Weight</option>
        <option value="cutting">Cutting</option>
      </motion.select>

      <AnimatePresence>
        {calories !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.p
              className="text-xl mt-6 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              To achieve your goal of{' '}
              <strong className="font-semibold text-blue-500 dark:text-purple-400">{goal}</strong>, you should consume approximately{' '}
              <strong className="font-semibold text-blue-500 dark:text-purple-400">{calories}</strong> calories per day.
            </motion.p>

            {workouts.length > 0 && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Recommended Workouts:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {workouts.map((workout, index) => (
                    <motion.li
                      key={index}
                      className="text-lg text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      {workout}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {weeklyRoutine.length > 0 && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <WorkoutRoutine routine={weeklyRoutine} theme={theme} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Suggestions;