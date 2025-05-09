
import { users, generateId } from './mock-data';
import { QuizAttempt } from './types';

// Quiz Functions
export const saveQuizAttempt = (
  userId: string, 
  quizId: string, 
  score: number, 
  answers: number[], 
  totalQuestions: number,
  passed: boolean
) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  const now = new Date().toISOString();
  
  const attempt: QuizAttempt = {
    id: generateId(),
    quizId,
    userId,
    score,
    answers,
    completed: true,
    startedAt: now,
    completedAt: now,
    totalQuestions,
    passed,
    date: new Date().toLocaleDateString()
  };
  
  user.quizAttempts.push(attempt);
  
  if (passed && !user.completedQuizzes.includes(quizId)) {
    user.completedQuizzes.push(quizId);
  }
  
  return true;
};

export const getQuizAttempts = (userId: string, quizId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return [];
  
  return user.quizAttempts.filter(attempt => attempt.quizId === quizId);
};
