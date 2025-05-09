
import { User } from './types';
import { users, generateId } from './mock-data';

// Authentication Functions
export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (user) {
    // Return a user object without the password
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword };
  }
  
  return null;
};

export const createUser = (userData: { email: string; password: string; fullName: string; }) => {
  // Check if user already exists
  if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, message: 'A user with this email already exists.' };
  }
  
  // Create new user
  const newUser: User = {
    id: generateId(),
    email: userData.email,
    password: userData.password,
    fullName: userData.fullName,
    name: userData.fullName.split(' ')[0] || userData.fullName,
    role: 'student',
    courses: [],
    enrolledCourses: [],
    completedLessons: [],
    quizAttempts: [],
    studyGallery: [],
    badges: [],
    certificates: [],
    completedQuizzes: [],
    avatar: `https://avatar.vercel.sh/${Math.random().toString(36).substring(2, 8)}`,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...newUserWithoutPassword } = newUser;
  return { 
    success: true, 
    user: newUserWithoutPassword,
    message: 'User created successfully.' 
  };
};

// Database Initialization
export const initializeDatabase = () => {
  console.info('Database initialized');
};
