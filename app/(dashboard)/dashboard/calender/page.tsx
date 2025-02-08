"use client";

import React, { useState } from "react";
import { Calendar } from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from 'next-themes';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const { theme } = useTheme();

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Custom styles for the calendar
  const calendarStyles = `
    .react-calendar {
      width: 100%;
      max-width: 100%;
      background: ${theme === 'dark' ? '#374151' : '#f3f4f6'};
      border: 1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'};
      border-radius: 0.5rem;
      font-family: Arial, sans-serif;
      line-height: 1.125em;
    }
    .react-calendar__navigation {
      display: flex;
      height: 44px;
      margin-bottom: 1em;
    }
    .react-calendar__navigation button {
      min-width: 44px;
      background: none;
      border: none;
      color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};
      font-size: 16px;
      cursor: pointer;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: ${theme === 'dark' ? '#4b5563' : '#e5e7eb'};
    }
    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.75em;
      color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};
    }
    .react-calendar__month-view__days__day {
      padding: 0.5em;
      color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};
    }
    .react-calendar__month-view__days__day--weekend {
      color: ${theme === 'dark' ? '#ef4444' : '#dc2626'};
    }
    .react-calendar__tile {
      max-width: 100%;
      text-align: center;
      padding: 0.75em 0.5em;
      background: none;
      border: none;
      border-radius: 0.5rem;
      color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: ${theme === 'dark' ? '#4b5563' : '#e5e7eb'};
    }
    .react-calendar__tile--now {
      background: ${theme === 'dark' ? '#1e40af' : '#3b82f6'};
      color: white;
    }
    .react-calendar__tile--active {
      background: ${theme === 'dark' ? '#2563eb' : '#1d4ed8'};
      color: white;
    }
  `;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <style>{calendarStyles}</style>
      <h1 className="text-5xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400 transition-transform transform hover:scale-105">
        Calendar
      </h1>
      <AnimatePresence>
        <motion.div
          key="calendar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            {date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}
          </div>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="rounded-lg shadow-2xl p-6 transition-all duration-300"
            tileClassName={({ date: tileDate, view }) =>
              view === 'month' && tileDate.toDateString() === date.toDateString()
                ? 'bg-blue-500 text-white rounded-full'
                : null
            }
          />
        </motion.div>
      </AnimatePresence>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="selected-date text-xl font-medium mt-8 text-blue-600 dark:text-blue-400"
      >
        Selected date: {formattedDate}
      </motion.p>
    </div>
  );
}

export default CalendarPage;