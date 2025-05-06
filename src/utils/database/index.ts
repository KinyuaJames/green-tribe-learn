
// Main entry point that re-exports all functionality

// Types
export type * from './types';

// Database initialization
export { initializeDatabase } from './auth';

// Auth functions
export { authenticateUser, createUser } from './auth';

// User functions
export { 
  getUserById,
  updateUser,
  addStudyNote,
  getStudyGallery,
  deleteStudyItem,
  getUserEnrolledCourses
} from './users';

// Course functions
export { 
  getCourses,
  getCourseById,
  enrollUserInCourse,
  enrollCourse,
  getLessonById,
  getModuleByLessonId,
  getNextLesson,
  getPreviousLesson,
  isLessonCompleted,
  markLessonAsCompleted,
  completeLesson,
  completeCourse
} from './courses';

// Quiz functions
export { saveQuizAttempt } from './quizzes';

// Case studies functions
export {
  getCaseStudies,
  getCaseStudyById,
  addCaseStudy,
  publishCaseStudy
} from './case-studies';

// Discussion functions
export {
  getCourseDiscussions,
  createDiscussionThread,
  addDiscussionMessage
} from './discussions';

// Mock data
export { 
  users,
  courses,
  caseStudiesData as caseStudies,
  discussionThreads,
  generateId
} from './mock-data';
