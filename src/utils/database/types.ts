export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  modules: Module[];
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  resources: Resource[];
  studyItems: StudyItem[];
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
