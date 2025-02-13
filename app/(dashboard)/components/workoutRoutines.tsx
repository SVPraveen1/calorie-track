import React from 'react';
import { motion } from 'framer-motion';

// Define the structure of a workout day
interface WorkoutDay {
  day: string;
  exercises: string[];
}

// Define the structure of the workout routines object
interface WorkoutRoutines {
  [key: string]: WorkoutDay[];
}

// Define the props for the WorkoutRoutine component
interface WorkoutRoutineProps {
  routine: WorkoutDay[];
  theme: string | undefined;
}

// Workout routines data (gym-only exercises)
export const workoutRoutines: WorkoutRoutines = {
  loseFat: [
    {
      day: 'Monday - Chest & Triceps',
      exercises: [
        'Bench Press (4 sets of 10)',
        'Incline Dumbbell Press (3 sets of 12)',
        'Cable Flys (3 sets of 15)',
        'Tricep Dips (3 sets of 12)',
        'Overhead Tricep Extension (3 sets of 15)',
        'Treadmill (20 mins moderate pace)',
      ],
    },
    {
      day: 'Tuesday - Back & Biceps',
      exercises: [
        'Deadlifts (4 sets of 8)',
        'Lat Pulldown (3 sets of 12)',
        'Barbell Rows (3 sets of 10)',
        'Dumbbell Curls (3 sets of 12)',
        'Hammer Curls (3 sets of 15)',
        'Rowing Machine (20 mins moderate pace)',
      ],
    },
    {
      day: 'Wednesday - Legs & Shoulders',
      exercises: [
        'Squats (4 sets of 10)',
        'Leg Press (3 sets of 12)',
        'Lunges (3 sets of 10 each leg)',
        'Overhead Press (3 sets of 12)',
        'Lateral Raises (3 sets of 15)',
        'Stair Climber (20 mins moderate pace)',
      ],
    },
    {
      day: 'Thursday - Chest & Triceps',
      exercises: [
        'Incline Bench Press (4 sets of 10)',
        'Dumbbell Flys (3 sets of 12)',
        'Push-ups (3 sets to failure)',
        'Tricep Pushdowns (3 sets of 15)',
        'Skull Crushers (3 sets of 12)',
        'Elliptical (20 mins moderate pace)',
      ],
    },
    {
      day: 'Friday - Back & Biceps',
      exercises: [
        'Pull-ups (4 sets of 8)',
        'T-Bar Rows (3 sets of 10)',
        'Seated Cable Rows (3 sets of 12)',
        'Preacher Curls (3 sets of 12)',
        'Concentration Curls (3 sets of 15)',
        'Stationary Bike (20 mins moderate pace)',
      ],
    },
    {
      day: 'Saturday - Legs & Shoulders',
      exercises: [
        'Deadlifts (4 sets of 8)',
        'Leg Curls (3 sets of 12)',
        'Calf Raises (3 sets of 15)',
        'Arnold Press (3 sets of 12)',
        'Front Raises (3 sets of 15)',
        'Treadmill HIIT (20 mins)',
      ],
    },
    {
      day: 'Sunday - Abs & Recovery',
      exercises: [
        'Cable Crunches (3 sets of 15)',
        'Hanging Leg Raises (3 sets of 12)',
        'Russian Twists (3 sets of 20)',
        'Plank (3 sets of 1 min)',
        'Yoga or Stretching (30 mins)',
      ],
    },
  ],
  gainWeight: [
    {
      day: 'Monday - Chest & Triceps',
      exercises: [
        'Bench Press (4 sets of 8)',
        'Incline Dumbbell Press (4 sets of 10)',
        'Cable Flys (3 sets of 12)',
        'Tricep Dips (3 sets of 12)',
        'Overhead Tricep Extension (3 sets of 15)',
        'Treadmill (10 mins warm-up)',
      ],
    },
    {
      day: 'Tuesday - Back & Biceps',
      exercises: [
        'Deadlifts (4 sets of 6)',
        'Lat Pulldown (4 sets of 10)',
        'Barbell Rows (4 sets of 8)',
        'Dumbbell Curls (3 sets of 12)',
        'Hammer Curls (3 sets of 15)',
        'Rowing Machine (10 mins warm-up)',
      ],
    },
    {
      day: 'Wednesday - Legs & Shoulders',
      exercises: [
        'Squats (4 sets of 8)',
        'Leg Press (4 sets of 10)',
        'Lunges (3 sets of 10 each leg)',
        'Overhead Press (4 sets of 10)',
        'Lateral Raises (3 sets of 15)',
        'Stair Climber (10 mins warm-up)',
      ],
    },
    {
      day: 'Thursday - Chest & Triceps',
      exercises: [
        'Incline Bench Press (4 sets of 8)',
        'Dumbbell Flys (3 sets of 12)',
        'Push-ups (3 sets to failure)',
        'Tricep Pushdowns (3 sets of 15)',
        'Skull Crushers (3 sets of 12)',
        'Elliptical (10 mins warm-up)',
      ],
    },
    {
      day: 'Friday - Back & Biceps',
      exercises: [
        'Pull-ups (4 sets of 6)',
        'T-Bar Rows (4 sets of 8)',
        'Seated Cable Rows (3 sets of 12)',
        'Preacher Curls (3 sets of 12)',
        'Concentration Curls (3 sets of 15)',
        'Stationary Bike (10 mins warm-up)',
      ],
    },
    {
      day: 'Saturday - Legs & Shoulders',
      exercises: [
        'Deadlifts (4 sets of 6)',
        'Leg Curls (3 sets of 12)',
        'Calf Raises (3 sets of 15)',
        'Arnold Press (3 sets of 12)',
        'Front Raises (3 sets of 15)',
        'Treadmill (10 mins warm-up)',
      ],
    },
    {
      day: 'Sunday - Abs & Recovery',
      exercises: [
        'Cable Crunches (3 sets of 15)',
        'Hanging Leg Raises (3 sets of 12)',
        'Russian Twists (3 sets of 20)',
        'Plank (3 sets of 1 min)',
        'Yoga or Stretching (30 mins)',
      ],
    },
  ],
  cutting: [
    {
      day: 'Monday - Chest & Triceps',
      exercises: [
        'Bench Press (4 sets of 10)',
        'Incline Dumbbell Press (3 sets of 12)',
        'Cable Flys (3 sets of 15)',
        'Tricep Dips (3 sets of 12)',
        'Overhead Tricep Extension (3 sets of 15)',
        'Treadmill HIIT (20 mins)',
      ],
    },
    {
      day: 'Tuesday - Back & Biceps',
      exercises: [
        'Deadlifts (4 sets of 8)',
        'Lat Pulldown (3 sets of 12)',
        'Barbell Rows (3 sets of 10)',
        'Dumbbell Curls (3 sets of 12)',
        'Hammer Curls (3 sets of 15)',
        'Rowing Machine HIIT (20 mins)',
      ],
    },
    {
      day: 'Wednesday - Legs & Shoulders',
      exercises: [
        'Squats (4 sets of 10)',
        'Leg Press (3 sets of 12)',
        'Lunges (3 sets of 10 each leg)',
        'Overhead Press (3 sets of 12)',
        'Lateral Raises (3 sets of 15)',
        'Stair Climber HIIT (20 mins)',
      ],
    },
    {
      day: 'Thursday - Chest & Triceps',
      exercises: [
        'Incline Bench Press (4 sets of 10)',
        'Dumbbell Flys (3 sets of 12)',
        'Push-ups (3 sets to failure)',
        'Tricep Pushdowns (3 sets of 15)',
        'Skull Crushers (3 sets of 12)',
        'Elliptical HIIT (20 mins)',
      ],
    },
    {
      day: 'Friday - Back & Biceps',
      exercises: [
        'Pull-ups (4 sets of 8)',
        'T-Bar Rows (3 sets of 10)',
        'Seated Cable Rows (3 sets of 12)',
        'Preacher Curls (3 sets of 12)',
        'Concentration Curls (3 sets of 15)',
        'Stationary Bike HIIT (20 mins)',
      ],
    },
    {
      day: 'Saturday - Legs & Shoulders',
      exercises: [
        'Deadlifts (4 sets of 8)',
        'Leg Curls (3 sets of 12)',
        'Calf Raises (3 sets of 15)',
        'Arnold Press (3 sets of 12)',
        'Front Raises (3 sets of 15)',
        'Treadmill HIIT (20 mins)',
      ],
    },
    {
      day: 'Sunday - Abs & Recovery',
      exercises: [
        'Cable Crunches (3 sets of 15)',
        'Hanging Leg Raises (3 sets of 12)',
        'Russian Twists (3 sets of 20)',
        'Plank (3 sets of 1 min)',
        'Yoga or Stretching (30 mins)',
      ],
    },
  ],
};

// WorkoutRoutine component
export const WorkoutRoutine: React.FC<WorkoutRoutineProps> = ({ routine, theme }) => {
  return (
    <div className="mt-6 ">
      <h3 className="text-lg font-semibold mb-4">Weekly Workout Routine:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routine.map((day, index) => (
          <motion.div
            key={day.day}
            className={`p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }} // Subtle hover effect
          >
            <h4 className="font-semibold text-blue-500">{day.day}</h4>
            <ul className="list-disc pl-5 mt-2">
              {day.exercises.map((exercise, i) => (
                <li key={i} className="mt-1">
                  {exercise}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};