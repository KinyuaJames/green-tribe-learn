
// Type definitions for our data models
export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string; // In a real app, this would be hashed
  enrolledCourses: string[]; // Array of course IDs
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  instructor: string;
  instructorImage?: string;
  duration: string;
  modules: Module[];
  level?: string;
  rating?: number;
  studentsCount?: number;
  tags?: string[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'download';
  duration?: string;
  content?: string;
  completed?: boolean;
}

// Database initialization
export const initializeDatabase = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('courses')) {
    const initialCourses = [
      {
        id: '1',
        title: 'Biophilic Foundations: Culturally Rooted Design',
        description: 'Discover the fundamental principles of biophilic design with an African perspective, connecting traditional wisdom with modern sustainability practices.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600',
        price: 1000,
        instructor: 'Wangui Mwangi',
        instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
        duration: '3 weeks',
        level: 'Beginner',
        rating: 4.8,
        studentsCount: 235,
        tags: ['biophilia', 'african-design', 'nature-architecture', 'green-living'],
        modules: [
          {
            id: 'm1',
            title: 'Understanding Biophilia',
            lessons: [
              {
                id: 'l1',
                title: 'What is Biophilic Design?',
                type: 'video',
                duration: '15 minutes',
                content: 'Biophilic design reconnects humans with nature in the spaces we live, work, and learn. It draws on the patterns and principles found in the natural world to promote well-being, creativity, and sustainability.',
              },
              {
                id: 'l2',
                title: 'African Traditions and Nature-Based Living',
                type: 'text',
                duration: '30 minutes',
                content: 'Many African communities historically built in close harmony with their environment. From the earthen homes of West Africa to the shaded compounds of East Africa, our traditions are full of lessons in thermal comfort, social space, and spiritual connectivity.'
              }
            ]
          },
          {
            id: 'm2',
            title: 'Principles in Practice',
            lessons: [
              {
                id: 'l3',
                title: 'Case Study – Mlolongo Heritage House',
                type: 'text',
                duration: '20 minutes',
                content: 'This family home, located in Mlolongo, integrates native vegetation, a shaded inner courtyard, natural clay walls, and rainwater harvesting. Built with both memory and function in mind, it\'s an example of biophilia meeting modern life.'
              },
              {
                id: 'l4',
                title: 'Designing With the Five Senses',
                type: 'download',
                duration: '25 minutes',
                content: 'Biophilic design is not only visual — it engages all five senses. How does your space sound? Smell? Feel? Use this checklist to assess your current environment.'
              }
            ]
          },
          {
            id: 'm3',
            title: 'Your Biophilic Design Journey',
            lessons: [
              {
                id: 'l5',
                title: 'Create Your Nature Map',
                type: 'assignment',
                duration: '45 minutes',
                content: 'Describe your ideal biophilic space using any of the following: A sketch or image upload, a short written paragraph, or a voice note submission.'
              },
              {
                id: 'l6',
                title: 'Reflection & Closing',
                type: 'quiz',
                duration: '15 minutes',
                content: 'How will you carry biophilic wisdom into your everyday life or work? Reflect on one actionable takeaway.'
              }
            ]
          }
        ]
      }
    ];
    
    localStorage.setItem('courses', JSON.stringify(initialCourses));
  }
};

// User related functions
export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const createUser = (userData: Omit<User, 'id' | 'enrolledCourses' | 'createdAt'>): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    ...userData,
    id: crypto.randomUUID(),
    enrolledCourses: [],
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return newUser;
};

export const authenticateUser = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  
  if (user && user.password === password) {
    return user;
  }
  
  return null;
};

// Course related functions
export const getCourses = (): Course[] => {
  return JSON.parse(localStorage.getItem('courses') || '[]');
};

export const getCourseById = (id: string): Course | undefined => {
  const courses = getCourses();
  return courses.find(course => course.id === id);
};

export const enrollUserInCourse = (userId: string, courseId: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  // Check if course exists
  const course = getCourseById(courseId);
  if (!course) {
    return false;
  }
  
  // Check if user is already enrolled
  if (users[userIndex].enrolledCourses.includes(courseId)) {
    return false;
  }
  
  // Enroll user
  users[userIndex].enrolledCourses.push(courseId);
  localStorage.setItem('users', JSON.stringify(users));
  
  return true;
};

export const getUserEnrolledCourses = (userId: string): Course[] => {
  const user = getUserById(userId);
  if (!user) {
    return [];
  }
  
  const allCourses = getCourses();
  return allCourses.filter(course => user.enrolledCourses.includes(course.id));
};
