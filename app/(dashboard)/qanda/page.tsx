'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, Send, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Add type interface for Question and Answer
interface Answer {
  id: number;
  author: string;
  content: string;  
  likes: number;
  likedBy: string[]; // Track who liked the answer
  timestamp: string; // Add timestamp field
}

interface Question {
  id: number;
  title: string;
  author: string;
  content: string;
  answers: Answer[];
  timestamp: string;
}

// Mock data - In a real app this would come from an API/database
const initialQuestions: Question[] = [
  {
    id: 1,
    title: "How do I track meals when eating out?",
    author: "JohnDoe",
    content: "I often eat at restaurants and find it difficult to accurately track my calories. Any tips?",
    answers: [
      {
        id: 1,
        author: "NutritionPro",
        content: "Try taking photos of your meals and using the AI analysis feature. Also, many restaurant chains have their nutritional information available online.",
        likes: 12,
        likedBy: [],
        timestamp: new Date().toISOString()
      }
    ],
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    title: "Best pre-workout meal suggestions?",
    author: "FitnessLover",
    content: "Looking for meal ideas that provide good energy for morning workouts without being too heavy.",
    answers: [],
    timestamp: new Date().toISOString()
  }
];

export default function QandAPage() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const savedQuestions = localStorage.getItem('questions');
      if (savedQuestions) {
        const parsedQuestions = JSON.parse(savedQuestions);
        // Remove timestamps when loading from localStorage
        return parsedQuestions.map((q: Question) => ({
          ...q,
          timestamp: new Date().toISOString(), // Always use current time
          answers: q.answers.map(a => ({
            ...a,
            timestamp: new Date().toISOString() // Always use current time
          }))
        }));
      }
      return initialQuestions.map(q => ({
        ...q,
        timestamp: new Date().toISOString(),
        answers: q.answers.map(a => ({
          ...a,
          timestamp: new Date().toISOString()
        }))
      }));
    } catch (error) {
      console.error('Error parsing questions from localStorage:', error);
      return initialQuestions.map(q => ({
        ...q,
        timestamp: new Date().toISOString(),
        answers: q.answers.map(a => ({
          ...a,
          timestamp: new Date().toISOString()
        }))
      }));
    }
  });
  const [newQuestion, setNewQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [answerInputs, setAnswerInputs] = useState<{ [key: number]: string }>({});

  const handleAskQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const question: Question = {
      id: questions.length + 1,
      title: newQuestion,
      author: "CurrentUser",
      content: newQuestion,
      answers: [],
      timestamp: new Date().toISOString()
    };
    
    const updatedQuestions = [question, ...questions];
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setNewQuestion('');
  };

  const handleAddAnswer = (questionId: number) => {
    if (!answerInputs[questionId]?.trim()) return;
    
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          answers: [...question.answers, {
            id: question.answers.length + 1,
            author: "CurrentUser",
            content: answerInputs[questionId],
            likes: 0,
            likedBy: [],
            timestamp: new Date().toISOString()
          }]
        };
      }
      return question;
    });

    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setAnswerInputs(prev => ({
      ...prev,
      [questionId]: ''
    }));
  };

  const handleLikeAnswer = (questionId: number, answerId: number) => {
    const currentUser = "CurrentUser"; // In real app, get from auth
    
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedAnswers = question.answers.map(answer => {
          if (answer.id === answerId) {
            const likedBy = answer.likedBy || [];
            const hasLiked = likedBy.includes(currentUser);
            if (hasLiked) {
              return {
                ...answer,
                likes: answer.likes - 1,
                likedBy: likedBy.filter(user => user !== currentUser)
              };
            } else {
              return {
                ...answer,
                likes: answer.likes + 1,
                likedBy: [...likedBy, currentUser]
              };
            }
          }
          return answer;
        });
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });

    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  // Add a function to get current questions with fresh timestamps
  const getQuestionsWithCurrentTime = () => {
    return questions.map(q => ({
      ...q,
      timestamp: new Date().toISOString(),
      answers: q.answers.map(a => ({
        ...a,
        timestamp: new Date().toISOString()
      }))
    }));
  };

  // Modify the filtered questions to always use current time
  const filteredQuestions = getQuestionsWithCurrentTime().filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update the formatTimestamp function to be more robust
  const formatTimestamp = (timestamp: string | undefined) => {
    if (!timestamp) {
      return 'Just now';
    }

    try {
      const date = new Date(timestamp);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid timestamp:', timestamp);
        return 'Just now';
      }
      
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Just now';
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Community Q&A
        </h1>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Ask Question Section */}
        <div className="mb-8 bg-gray-50/50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <textarea
            placeholder="Ask your question..."
            className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-4 min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Button
            onClick={handleAskQuestion}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Post Question <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50/50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{question.title}</h3>
                <span className="text-sm text-gray-500">{formatTimestamp(question.timestamp)}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{question.content}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{question.answers.length} answers</span>
              </div>

              {/* Answers */}
              <div className="space-y-4 mt-6">
                {question.answers.map((answer) => (
                  <div key={answer.id} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{answer.author}</span>
                        <span className="text-sm text-gray-500 ml-2">{formatTimestamp(answer.timestamp)}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`text-gray-500 hover:text-blue-500 ${(answer.likedBy || []).includes("CurrentUser") ? "text-blue-500" : ""}`}
                        onClick={() => handleLikeAnswer(question.id, answer.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {answer.likes}
                      </Button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{answer.content}</p>
                  </div>
                ))}
              </div>

              {/* Answer Input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Write an answer..."
                  className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={answerInputs[question.id] || ''}
                  onChange={(e) => setAnswerInputs(prev => ({
                    ...prev,
                    [question.id]: e.target.value
                  }))}
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleAddAnswer(question.id)}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
