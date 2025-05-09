
import { getCourseById } from '@/utils/database';
import { Course as DatabaseCourse } from '@/utils/database/types';

// This Course interface aligns with what's used in the components
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  image?: string; 
  modules: any[];
  createdAt?: string;
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

// Helper function to convert database course to component course
export const convertDatabaseCourse = (dbCourse: DatabaseCourse): Course => {
  return {
    ...dbCourse,
    imageUrl: dbCourse.image || dbCourse.imageUrl,
    image: dbCourse.imageUrl || dbCourse.image,
  };
};

// Get course by ID with proper conversion
export const getCourse = (id: string): Course | null => {
  const dbCourse = getCourseById(id);
  return dbCourse ? convertDatabaseCourse(dbCourse) : null;
};

// Just a re-export to fix the import issue
export { getCourseById };
