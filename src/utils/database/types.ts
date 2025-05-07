
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  image?: string; // Added for compatibility
  modules: Module[];
  createdAt: string;
  instructor?: string;
  instructorImage?: string;
  duration?: string;
  level?: string;
  price?: number;
  isFree?: boolean;
  isLocked?: boolean;
  tags?: string[];
  resources?: Resource[];
  rating?: number;
  studentsCount?: number;
  isFeatured?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isLocked?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  resources: Resource[];
  studyItems: StudyItem[];
  type?: "video" | "text" | "quiz" | "assignment";
  duration?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  quiz?: Quiz;
  requiresAudioFeedback?: boolean;
  isLocked?: boolean;
}

export interface StudyItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  type: string;
  content: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "link" | "audio" | "video" | "pdf";
  url: string;
  description: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'student' | 'instructor' | 'admin';
  courses: Course[];
  password?: string;
  fullName?: string;
  enrolledCourses?: Course[];
  completedLessons?: string[];
  quizAttempts?: QuizAttempt[];
  studyGallery?: StudyItem[];
}

export interface DiscussionMessage {
  id: string;
  threadId: string;
  userId: string;
  userName: string;
  userImage?: string;
  userRole: 'student' | 'instructor' | 'admin';
  content: string;
  createdAt: string;
  likes?: number;
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

export interface ThreadInput {
  courseId: string;
  title: string;
  studentId: string;
  studentName: string;
  message: string;
}

export interface MessageInput {
  threadId: string;
  userId: string;
  userName: string;
  content: string;
  userRole: 'student' | 'instructor' | 'admin';
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  answers: number[];
  completed: boolean;
  startedAt: string;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  userId: string;
  issueDate: string;
  completionDate: string;
  certificateUrl: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  criteria: string;
  dateEarned: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  author: string;
  authorId: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  location: string;
  year: number;
}
