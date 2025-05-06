
import { Course, Lesson, Module } from './types';
import { users, courses } from './mock-data';

// Course Functions
export const getCourses = () => {
  return courses;
};

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id) || null;
};

export const enrollUserInCourse = (userId: string, courseId: string) => {
  const user = users.find(u => u.id === userId);
  const course = courses.find(c => c.id === courseId);
  
  if (!user || !course) {
    return false;
  }
  
  // Check if already enrolled
  if (user.enrolledCourses.includes(courseId)) {
    return false;
  }
  
  // Enroll user
  user.enrolledCourses.push(courseId);
  return true;
};

// Alias function for compatibility
export const enrollCourse = enrollUserInCourse;

// Lesson and Module Functions
export const getLessonById = (id: string) => {
  for (const course of courses) {
    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === id);
      if (lesson) {
        return lesson;
      }
    }
  }
  return null;
};

export const getModuleByLessonId = (lessonId: string) => {
  for (const course of courses) {
    for (const module of course.modules) {
      if (module.lessons.some(l => l.id === lessonId)) {
        return module;
      }
    }
  }
  return null;
};

export const getNextLesson = (courseId: string, currentLessonId: string) => {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  let foundCurrent = false;
  let nextLesson = null;
  
  for (const module of course.modules) {
    for (let i = 0; i < module.lessons.length; i++) {
      if (foundCurrent) {
        nextLesson = module.lessons[i];
        return nextLesson;
      }
      
      if (module.lessons[i].id === currentLessonId) {
        foundCurrent = true;
        if (i < module.lessons.length - 1) {
          nextLesson = module.lessons[i + 1];
          return nextLesson;
        }
      }
    }
  }
  
  return null;
};

export const getPreviousLesson = (courseId: string, currentLessonId: string) => {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  let previousLesson = null;
  
  for (const module of course.modules) {
    for (let i = 0; i < module.lessons.length; i++) {
      if (module.lessons[i].id === currentLessonId) {
        if (i > 0) {
          return module.lessons[i - 1];
        } else if (module !== course.modules[0]) {
          // Try to get the last lesson of the previous module
          const moduleIndex = course.modules.indexOf(module);
          const prevModule = course.modules[moduleIndex - 1];
          return prevModule.lessons[prevModule.lessons.length - 1];
        }
        return null;
      }
      previousLesson = module.lessons[i];
    }
  }
  
  return null;
};

export const isLessonCompleted = (userId: string, lessonId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  return user.completedLessons.includes(lessonId);
};

export const markLessonAsCompleted = (userId: string, lessonId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  if (!user.completedLessons.includes(lessonId)) {
    user.completedLessons.push(lessonId);
  }
  
  return true;
};

// Alias function for backwards compatibility
export const completeLesson = markLessonAsCompleted;

// Mark a course as completed
export const completeCourse = (userId: string, courseId: string): boolean => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  // Here you might add courseId to a completedCourses array
  // or issue a certificate
  
  return true;
};
