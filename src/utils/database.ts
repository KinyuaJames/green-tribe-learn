
// Type definitions for our data models
export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string; // In a real app, this would be hashed
  enrolledCourses: string[]; // Array of course IDs
  createdAt: string;
  completedLessons: string[]; // Array of lesson IDs
  badges: Badge[]; // Achievements earned
  completedQuizzes: QuizAttempt[]; // Quiz results
  certificates: Certificate[]; // Earned certificates
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  image: string;
  dateEarned: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  completionDate: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
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
  isFeatured?: boolean;
  isFree?: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'link';
  url: string;
  icon: string;
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
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number;
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

// Database initialization
export const initializeDatabase = () => {
  if (!localStorage.getItem('users')) {
    // Create our demo user
    const demoUser: User = {
      id: 'user-001',
      fullName: 'Demo User',
      email: 'demo@biophilic.edu',
      password: 'password123',
      enrolledCourses: ['1', 'free-course-001'],
      createdAt: new Date().toISOString(),
      completedLessons: ['l1', 'l2', 'l3'],
      badges: [
        {
          id: 'badge-001',
          title: 'Quick Starter',
          description: 'Completed your first module',
          image: 'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?q=80&w=100',
          dateEarned: new Date().toISOString()
        },
        {
          id: 'badge-002',
          title: 'Eco Warrior',
          description: 'Completed the Biophilic Foundations course',
          image: 'https://images.unsplash.com/photo-1569591159212-b02a8a1f623d?q=80&w=100',
          dateEarned: new Date().toISOString()
        }
      ],
      completedQuizzes: [
        {
          id: 'quiz-attempt-001',
          quizId: 'quiz-001',
          score: 8,
          totalQuestions: 10,
          completedAt: new Date().toISOString()
        }
      ],
      certificates: [
        {
          id: 'cert-001',
          courseId: '1',
          courseTitle: 'Biophilic Foundations: Culturally Rooted Design',
          issueDate: new Date().toISOString(),
          completionDate: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    };
    
    localStorage.setItem('users', JSON.stringify([demoUser]));
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
        isFeatured: true,
        tags: ['biophilia', 'african-design', 'nature-architecture', 'green-living'],
        resources: [
          {
            id: 'res-001',
            title: 'Biophilic Design Handbook',
            description: 'Comprehensive guide to implementing natural elements in architecture',
            type: 'pdf',
            url: '#',
            icon: 'book-open'
          },
          {
            id: 'res-002',
            title: 'Sustainability in Practice',
            description: 'Video lecture by Dr. Nanjala on sustainable building materials',
            type: 'video',
            url: '#',
            icon: 'video'
          },
          {
            id: 'res-003',
            title: 'Traditional Architecture Catalog',
            description: 'Collection of indigenous architectural solutions from across Africa',
            type: 'pdf',
            url: '#',
            icon: 'book'
          }
        ],
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
              },
              {
                id: 'l3',
                title: 'Biophilia Quiz',
                type: 'quiz',
                duration: '10 minutes',
                quiz: {
                  id: 'quiz-001',
                  title: 'Biophilic Design Principles',
                  description: 'Test your understanding of biophilic design concepts',
                  questions: [
                    {
                      id: 'q1',
                      text: 'What is the primary focus of biophilic design?',
                      options: [
                        { id: 'a', text: 'Maximizing profit in construction' },
                        { id: 'b', text: 'Connecting humans with nature' },
                        { id: 'c', text: 'Using only artificial materials' },
                        { id: 'd', text: 'Minimizing outdoor spaces' }
                      ],
                      correctOptionId: 'b'
                    },
                    {
                      id: 'q2',
                      text: 'Which of the following is NOT a benefit of biophilic design?',
                      options: [
                        { id: 'a', text: 'Improved mental health' },
                        { id: 'b', text: 'Enhanced creativity' },
                        { id: 'c', text: 'Increased construction costs only' },
                        { id: 'd', text: 'Better air quality' }
                      ],
                      correctOptionId: 'c'
                    },
                    {
                      id: 'q3',
                      text: 'Which traditional African building material is most aligned with biophilic principles?',
                      options: [
                        { id: 'a', text: 'Plastic sheeting' },
                        { id: 'b', text: 'Fired bricks' },
                        { id: 'c', text: 'Earth/clay' },
                        { id: 'd', text: 'Synthetic fibers' }
                      ],
                      correctOptionId: 'c'
                    }
                  ],
                  passingScore: 2
                }
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
      },
      {
        id: 'free-course-001',
        title: 'Introduction to Sustainable Living',
        description: 'Learn the basics of sustainable living with practical tips you can implement today. This free course covers eco-friendly habits, waste reduction, and simple changes to reduce your environmental footprint.',
        image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600',
        price: 0,
        instructor: 'Amara Okafor',
        instructorImage: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?q=80&w=200',
        duration: '1 week',
        level: 'Beginner',
        rating: 4.5,
        studentsCount: 523,
        isFree: true,
        isFeatured: true,
        tags: ['sustainability', 'eco-friendly', 'beginners'],
        resources: [
          {
            id: 'res-004',
            title: 'Sustainable Living Checklist',
            description: 'A practical guide to implementing sustainable habits in daily life',
            type: 'pdf',
            url: '#',
            icon: 'file-text'
          },
          {
            id: 'res-005',
            title: 'Zero Waste Kitchen Guide',
            description: 'Tips and tricks for reducing waste in your kitchen',
            type: 'pdf',
            url: '#',
            icon: 'file'
          },
          {
            id: 'res-006',
            title: 'Introduction to Composting',
            description: 'A beginner-friendly video guide on starting your composting journey',
            type: 'video',
            url: '#',
            icon: 'video'
          }
        ],
        modules: [
          {
            id: 'm1-free',
            title: 'Sustainability Basics',
            lessons: [
              {
                id: 'l1-free',
                title: 'What is Sustainability?',
                type: 'video',
                duration: '10 minutes',
                content: 'An introduction to sustainability concepts and why they matter in today\'s world.'
              },
              {
                id: 'l2-free',
                title: 'The Three Pillars of Sustainability',
                type: 'text',
                duration: '15 minutes',
                content: 'Environmental, economic, and social sustainability - understanding how they interconnect and reinforce each other.'
              },
              {
                id: 'l3-free',
                title: 'Sustainability Quiz',
                type: 'quiz',
                duration: '5 minutes',
                quiz: {
                  id: 'quiz-002',
                  title: 'Sustainability Basics Quiz',
                  description: 'Test your understanding of key sustainability concepts',
                  questions: [
                    {
                      id: 'q1-free',
                      text: 'What are the three pillars of sustainability?',
                      options: [
                        { id: 'a', text: 'Design, Development, Deployment' },
                        { id: 'b', text: 'Environmental, Economic, Social' },
                        { id: 'c', text: 'Research, Education, Practice' },
                        { id: 'd', text: 'Past, Present, Future' }
                      ],
                      correctOptionId: 'b'
                    },
                    {
                      id: 'q2-free',
                      text: 'Which of these is NOT a benefit of sustainable living?',
                      options: [
                        { id: 'a', text: 'Reduced carbon footprint' },
                        { id: 'b', text: 'Higher quality of life' },
                        { id: 'c', text: 'Increased waste production' },
                        { id: 'd', text: 'Community resilience' }
                      ],
                      correctOptionId: 'c'
                    }
                  ],
                  passingScore: 1
                }
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

// New functions for handling lessons, badges, certificates and quizzes
export const markLessonAsCompleted = (userId: string, lessonId: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  if (!users[userIndex].completedLessons.includes(lessonId)) {
    users[userIndex].completedLessons.push(lessonId);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  return true;
};

export const isLessonCompleted = (userId: string, lessonId: string): boolean => {
  const user = getUserById(userId);
  return user?.completedLessons.includes(lessonId) || false;
};

export const saveQuizAttempt = (userId: string, quizId: string, score: number, totalQuestions: number): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  const quizAttempt: QuizAttempt = {
    id: crypto.randomUUID(),
    quizId,
    score,
    totalQuestions,
    completedAt: new Date().toISOString()
  };
  
  users[userIndex].completedQuizzes.push(quizAttempt);
  localStorage.setItem('users', JSON.stringify(users));
  
  return true;
};

export const awardBadgeToUser = (userId: string, badge: Omit<Badge, 'id' | 'dateEarned'>): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  const newBadge: Badge = {
    ...badge,
    id: crypto.randomUUID(),
    dateEarned: new Date().toISOString()
  };
  
  users[userIndex].badges.push(newBadge);
  localStorage.setItem('users', JSON.stringify(users));
  
  return true;
};

export const issueCertificate = (userId: string, courseId: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  const course = getCourseById(courseId);
  if (!course) {
    return false;
  }
  
  // Check if user already has this certificate
  if (users[userIndex].certificates.some(cert => cert.courseId === courseId)) {
    return false;
  }
  
  const certificate: Certificate = {
    id: crypto.randomUUID(),
    courseId,
    courseTitle: course.title,
    issueDate: new Date().toISOString(),
    completionDate: new Date().toISOString()
  };
  
  users[userIndex].certificates.push(certificate);
  localStorage.setItem('users', JSON.stringify(users));
  
  return true;
};
