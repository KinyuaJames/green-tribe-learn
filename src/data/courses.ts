
import { getCourseById } from '@/utils/database';

// Make sure the Course interface reflects what's actually used
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  image?: string; 
  modules: any[];
  createdAt: string;
  instructor?: string;
  instructorImage?: string;
  duration?: string;
  level?: string;
  price?: number;
  isFree?: boolean;
  isLocked?: boolean;
  tags?: string[];
  resources?: any[];
  rating?: number;
  studentsCount?: number;
  isFeatured?: boolean;
  category?: string;
}

// Just a re-export to fix the import issue
export { getCourseById };
