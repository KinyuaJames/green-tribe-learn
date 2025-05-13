
export interface Course {
  id: string;
  title: string;
  description: string;
  progress?:number;
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
  category?: string;

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
  moduleId?: string; 
  moduleName?: string;
  courseId?: string;
  lessonId?: string;
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
  enrolledCourses: (Course | string)[];
  completedLessons: string[];
  quizAttempts: QuizAttempt[];
  studyGallery: StudyItem[];
  badges?: Badge[];
  certificates?: Certificate[];
  completedQuizzes?: string[];
  avatar?: string;
  createdAt?: string;
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
  description?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerIndex: number;
  explanation?: string;
  correctOptionId?: string;
  text?: string; // For compatibility with existing code
}

export interface QuizOption {
  id: string;
  text: string;
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
  totalQuestions?: number;
  passed?: boolean;
  date?: string; // Added for compatibility with existing code
}

export interface Certificate {
  id: string;
  courseId: string;
  userId: string;
  issueDate: string;
  completionDate: string;
  certificateUrl: string;
  courseTitle?: string;
  courseName?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  criteria: string;
  dateEarned: string;
  image?: string; // Added for compatibility
  earnedDate?: string; // Added for compatibility
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

export interface StudyNoteInput {
  title: string;
  content: string;
  userId: string;
  courseId?: string;
  lessonId?: string;
  type?: string;
  moduleId?: string;
  moduleName?: string;
}
