
import { User, StudyNoteInput, StudyItem } from './types';
import { users, generateId } from './mock-data';

// User Functions
export const getUserById = (id: string) => {
  const user = users.find(u => u.id === userId);
  if (user) {
    // Create a copy without the password
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword };
  }
  return null;
};

export const updateUser = (userId: string, userData: Partial<User>): boolean => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return false;
  
  users[userIndex] = { ...users[userIndex], ...userData };
  return true;
};

// Study Gallery Functions
export const addStudyNote = (userId: string, note: StudyNoteInput) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  const studyItem: StudyItem = {
    id: generateId(),
    title: note.title,
    content: note.content,
    type: note.type || 'note',
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6', // Default image
    description: note.title,
    createdAt: new Date().toISOString(),
    moduleId: note.moduleId,
    moduleName: note.moduleName,
    courseId: note.courseId,
    lessonId: note.lessonId
  };
  
  user.studyGallery.push(studyItem);
  return studyItem.id;
};

export const getStudyGallery = (userId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return [];
  
  return user.studyGallery;
};

export const deleteStudyItem = (userId: string, itemId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  const itemIndex = user.studyGallery.findIndex(item => item.id === itemId);
  if (itemIndex === -1) return false;
  
  user.studyGallery.splice(itemIndex, 1);
  return true;
};

export const getUserEnrolledCourses = (userId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return [];
  
  return user.enrolledCourses;
};
