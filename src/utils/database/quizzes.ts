
import { users } from './mock-data';
import { QuizAttempt } from './types';

// Quiz Functions
export const saveQuizAttempt = (userId: string, quizId: string, score: number, totalQuestions: number) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  const passingScore = 0.6; // 60% passing threshold
  const passed = score / totalQuestions >= passingScore;
  
  const attempt: QuizAttempt = {
    quizId,
    score,
    totalQuestions,
    passed,
    date: new Date().toISOString()
  };
  
  user.quizAttempts.push(attempt);
  return true;
};
