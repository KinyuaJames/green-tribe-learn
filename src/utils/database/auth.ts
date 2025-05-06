
import { toast } from 'sonner';
import { User } from './types';
import { users } from './mock-data';
import { getUserById } from './users';

// Initialize the database
export const initializeDatabase = () => {
  // This would typically connect to a real database
  console.log('Database initialized');
  return true;
};

// Authentication Functions
export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    // Create a copy without the password
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword };
  }
  return null;
};

export const createUser = (userData: Partial<User>) => {
  // Check if user already exists
  if (users.find(u => u.email.toLowerCase() === userData.email?.toLowerCase())) {
    throw new Error('Email already in use');
  }
  
  // Create new user with required fields
  const newUser: User = {
    id: crypto.randomUUID(),
    email: userData.email || '',
    password: userData.password || '',
    fullName: userData.fullName,
    name: userData.fullName, // For backward compatibility
    enrolledCourses: userData.enrolledCourses || [],
    completedLessons: userData.completedLessons || [],
    quizAttempts: userData.quizAttempts || [],
    studyGallery: userData.studyGallery || [],
    badges: userData.badges || [],
    certificates: userData.certificates || [],
    completedQuizzes: userData.completedQuizzes || [],
    role: userData.role || 'student',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword };
};
