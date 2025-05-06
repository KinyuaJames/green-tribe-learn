
// Basic types for our database objects

export interface Badge {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageUrl: string;
  dateEarned?: string;
  earnedDate: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  courseTitle?: string;
  issueDate: string;
  completionDate: string;
  certificateUrl: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  fullName?: string;
  avatar?: string;
  enrolledCourses: string[];
  completedLessons: string[];
  quizAttempts: QuizAttempt[];
  studyGallery: StudyItem[];
  role: 'student' | 'instructor' | 'admin';
  badges: Badge[];
  certificates: Certificate[];
  completedQuizzes?: string[];
  createdAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorImage?: string;
  price: number;
  isFree: boolean;
  duration: string;
  level?: string;
  rating?: number;
  studentsCount?: number;
  image: string;
  isLocked: boolean;
  isFeatured: boolean;
  modules: Module[];
  resources?: Resource[];
  tags?: string[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  isLocked: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content?: string;
  duration?: string;
  isLocked: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  quiz?: Quiz;
  requiresAudioFeedback?: boolean; // For lessons requiring audio feedback
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in seconds
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  date: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'link';
  url: string;
}

export interface StudyItem {
  id: string;
  title: string;
  type: 'image' | 'note' | 'voice';
  content: string;
  thumbnail?: string;
  createdAt: string;
  moduleId?: string;
  moduleName?: string;
  courseId?: string;
  lessonId?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  location: string;
  year: number;
  images: string[];
  tags: string[];
  author: string;
  authorId: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface DiscussionMessage {
  id: string;
  threadId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'instructor';
  content: string;
  createdAt: string;
}

export interface DiscussionThread {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  title: string;
  status: 'open' | 'closed';
  createdAt: string;
  lastMessageAt: string;
  messages: DiscussionMessage[];
}

export interface StudyNoteInput {
  title: string;
  content: string;
  type: 'image' | 'note' | 'voice';
  moduleId?: string;
  moduleName?: string;
  courseId?: string;
  lessonId?: string;
}

export interface ThreadInput {
  courseId: string;
  studentId: string;
  studentName: string;
  title: string;
  message: string;
}

export interface MessageInput {
  threadId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'instructor';
  content: string;
}
