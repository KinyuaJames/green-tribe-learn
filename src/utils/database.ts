
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
  isLocked?: boolean; // Whether the course is locked (requires payment)
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
  isLocked?: boolean; // Whether the module is locked (requires previous completion)
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'download';
  duration?: string;
  content?: string;
  completed?: boolean;
  quiz?: Quiz;
  isLocked?: boolean; // Whether the lesson is locked (requires previous completion)
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // Time limit in seconds
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
    // Get all lessons IDs from the free course to mark them as completed
    const freeLessonIds: string[] = [];
    
    // Create all courses first to gather lesson IDs
    const initialCourses = getInitialCourses();
    
    // Find the free course and extract all lesson IDs
    const freeCourse = initialCourses.find(course => course.id === 'free-course-001');
    if (freeCourse) {
      freeCourse.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          freeLessonIds.push(lesson.id);
        });
      });
    }
    
    // Create our demo user with completed free course lessons
    const demoUser: User = {
      id: 'user-001',
      fullName: 'Demo User',
      email: 'demo@biophilic.edu',
      password: 'password123',
      enrolledCourses: ['1', 'free-course-001'],
      createdAt: new Date().toISOString(),
      completedLessons: freeLessonIds,
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
        },
        {
          id: 'badge-003',
          title: 'Sustainable Living Pro',
          description: 'Completed the Introduction to Sustainable Living course',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=100',
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
        },
        {
          id: 'quiz-attempt-002',
          quizId: 'quiz-002',
          score: 2,
          totalQuestions: 2,
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
        },
        {
          id: 'cert-002',
          courseId: 'free-course-001',
          courseTitle: 'Introduction to Sustainable Living',
          issueDate: new Date().toISOString(),
          completionDate: new Date().toISOString()
        }
      ]
    };
    
    localStorage.setItem('users', JSON.stringify([demoUser]));
  }
  
  if (!localStorage.getItem('courses')) {
    const initialCourses = getInitialCourses();
    localStorage.setItem('courses', JSON.stringify(initialCourses));
  }
};

// Function to get initial courses data
function getInitialCourses() {
  return [
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
      isLocked: true, // Paid course is locked until payment
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
          isLocked: false,
          lessons: [
            {
              id: 'l1',
              title: 'What is Biophilic Design?',
              type: 'video',
              duration: '15 minutes',
              content: 'Biophilic design reconnects humans with nature in the spaces we live, work, and learn. It draws on the patterns and principles found in the natural world to promote well-being, creativity, and sustainability.',
              isLocked: false
            },
            {
              id: 'l2',
              title: 'African Traditions and Nature-Based Living',
              type: 'text',
              duration: '30 minutes',
              content: 'Many African communities historically built in close harmony with their environment. From the earthen homes of West Africa to the shaded compounds of East Africa, our traditions are full of lessons in thermal comfort, social space, and spiritual connectivity.',
              isLocked: true
            },
            {
              id: 'l3',
              title: 'Biophilia Quiz',
              type: 'quiz',
              duration: '10 minutes',
              isLocked: true,
              quiz: {
                id: 'quiz-001',
                title: 'Biophilic Design Principles',
                description: 'Test your understanding of biophilic design concepts',
                timeLimit: 300, // 5 minutes
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
          isLocked: true,
          lessons: [
            {
              id: 'l3',
              title: 'Case Study – Mlolongo Heritage House',
              type: 'text',
              duration: '20 minutes',
              content: 'This family home, located in Mlolongo, integrates native vegetation, a shaded inner courtyard, natural clay walls, and rainwater harvesting. Built with both memory and function in mind, it\'s an example of biophilia meeting modern life.',
              isLocked: true
            },
            {
              id: 'l4',
              title: 'Designing With the Five Senses',
              type: 'download',
              duration: '25 minutes',
              content: 'Biophilic design is not only visual — it engages all five senses. How does your space sound? Smell? Feel? Use this checklist to assess your current environment.',
              isLocked: true
            }
          ]
        },
        {
          id: 'm3',
          title: 'Your Biophilic Design Journey',
          isLocked: true,
          lessons: [
            {
              id: 'l5',
              title: 'Create Your Nature Map',
              type: 'assignment',
              duration: '45 minutes',
              content: 'Describe your ideal biophilic space using any of the following: A sketch or image upload, a short written paragraph, or a voice note submission.',
              isLocked: true
            },
            {
              id: 'l6',
              title: 'Reflection & Closing',
              type: 'quiz',
              duration: '15 minutes',
              content: 'How will you carry biophilic wisdom into your everyday life or work? Reflect on one actionable takeaway.',
              isLocked: true
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
      isLocked: false, // Free course is not locked
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
        },
        {
          id: 'res-007',
          title: 'Sustainable Living Podcast',
          description: 'Listen to our podcast about sustainable living practices',
          type: 'audio',
          url: '#',
          icon: 'mic'
        },
        {
          id: 'res-008',
          title: 'Recycling Reference Guide',
          description: 'Learn what can and cannot be recycled in your area',
          type: 'pdf',
          url: '#',
          icon: 'file'
        }
      ],
      modules: [
        {
          id: 'm1-free',
          title: 'Sustainability Basics',
          isLocked: false,
          lessons: [
            {
              id: 'l1-free',
              title: 'What is Sustainability?',
              type: 'video',
              duration: '10 minutes',
              content: 'An introduction to sustainability concepts and why they matter in today\'s world.',
              isLocked: false
            },
            {
              id: 'l2-free',
              title: 'The Three Pillars of Sustainability',
              type: 'text',
              duration: '15 minutes',
              content: 'Environmental, economic, and social sustainability - understanding how they interconnect and reinforce each other.',
              isLocked: false
            },
            {
              id: 'l3-free',
              title: 'Sustainability Quiz',
              type: 'quiz',
              duration: '5 minutes',
              isLocked: false,
              quiz: {
                id: 'quiz-002',
                title: 'Sustainability Basics Quiz',
                description: 'Test your understanding of key sustainability concepts',
                timeLimit: 180, // 3 minutes
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
        },
        {
          id: 'm2-free',
          title: 'Daily Sustainable Practices',
          isLocked: true,
          lessons: [
            {
              id: 'l4-free',
              title: 'Reducing Household Waste',
              type: 'video',
              duration: '12 minutes',
              content: 'Learn practical ways to reduce waste generation in your home through mindful consumption and reuse strategies.',
              isLocked: true
            },
            {
              id: 'l5-free',
              title: 'Energy Conservation Tips',
              type: 'text',
              duration: '15 minutes',
              content: 'Simple but effective ways to reduce your energy consumption and lower your carbon footprint.',
              isLocked: true
            },
            {
              id: 'l6-free',
              title: 'Daily Practices Quiz',
              type: 'quiz',
              duration: '5 minutes',
              isLocked: true,
              quiz: {
                id: 'quiz-003',
                title: 'Sustainable Daily Practices Quiz',
                description: 'Test your knowledge of everyday sustainable actions',
                timeLimit: 240, // 4 minutes
                questions: [
                  {
                    id: 'q3-free',
                    text: 'Which of these actions saves the most energy in a typical home?',
                    options: [
                      { id: 'a', text: 'Turning off lights when not in use' },
                      { id: 'b', text: 'Proper insulation of walls and ceilings' },
                      { id: 'c', text: 'Using energy-efficient appliances' },
                      { id: 'd', text: 'Unplugging electronics when not in use' }
                    ],
                    correctOptionId: 'b'
                  },
                  {
                    id: 'q4-free',
                    text: 'Which waste reduction strategy is most effective?',
                    options: [
                      { id: 'a', text: 'Recycling all materials' },
                      { id: 'b', text: 'Reducing consumption in the first place' },
                      { id: 'c', text: 'Using biodegradable packaging' },
                      { id: 'd', text: 'Composting food waste' }
                    ],
                    correctOptionId: 'b'
                  },
                  {
                    id: 'q5-free',
                    text: 'What is the most effective way to reduce water usage in a household?',
                    options: [
                      { id: 'a', text: 'Taking shorter showers' },
                      { id: 'b', text: 'Installing low-flow fixtures' },
                      { id: 'c', text: 'Fixing leaky faucets' },
                      { id: 'd', text: 'Using a dishwasher instead of hand washing' }
                    ],
                    correctOptionId: 'b'
                  }
                ],
                passingScore: 2
              }
            }
          ]
        },
        {
          id: 'm3-free',
          title: 'Sustainable Living Project',
          isLocked: true,
          lessons: [
            {
              id: 'l7-free',
              title: 'Planning Your Sustainability Project',
              type: 'text',
              duration: '20 minutes',
              content: 'Learn how to identify an area in your life where you can make a meaningful sustainable change and how to plan for its implementation.',
              isLocked: true
            },
            {
              id: 'l8-free',
              title: 'Document Your Sustainability Journey',
              type: 'assignment',
              duration: '30 minutes',
              content: 'Record a short audio reflection about your sustainability goals and the changes you plan to implement in your daily life.',
              isLocked: true
            },
            {
              id: 'l9-free',
              title: 'Final Assessment',
              type: 'quiz',
              duration: '10 minutes',
              isLocked: true,
              quiz: {
                id: 'quiz-004',
                title: 'Sustainable Living Comprehensive Assessment',
                description: 'Test your overall understanding of sustainable living concepts',
                timeLimit: 300, // 5 minutes
                questions: [
                  {
                    id: 'q6-free',
                    text: 'Which approach best exemplifies the concept of circular economy?',
                    options: [
                      { id: 'a', text: 'Recycling all waste materials' },
                      { id: 'b', text: 'Designing products for multiple lifecycles' },
                      { id: 'c', text: 'Using biodegradable materials only' },
                      { id: 'd', text: 'Purchasing carbon offsets' }
                    ],
                    correctOptionId: 'b'
                  },
                  {
                    id: 'q7-free',
                    text: 'What is the most important factor in creating lasting sustainable change?',
                    options: [
                      { id: 'a', text: 'Government regulations' },
                      { id: 'b', text: 'Corporate responsibility' },
                      { id: 'c', text: 'Individual habits and behaviors' },
                      { id: 'd', text: 'Technological innovation' }
                    ],
                    correctOptionId: 'c'
                  },
                  {
                    id: 'q8-free',
                    text: 'Which statement best describes the relationship between sustainability and equity?',
                    options: [
                      { id: 'a', text: 'They are unrelated concepts' },
                      { id: 'b', text: 'Sustainability often comes at the expense of equity' },
                      { id: 'c', text: 'True sustainability must include social equity' },
                      { id: 'd', text: 'Equity is important but separate from environmental concerns' }
                    ],
                    correctOptionId: 'c'
                  }
                ],
                passingScore: 2
              }
            }
          ]
        }
      ]
    }
  ];
}

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
    
    // After completing a lesson, check if we need to unlock new modules or lessons
    unlockNextLessons(userId);
  }
  
  return true;
};

export const isLessonCompleted = (userId: string | undefined, lessonId: string): boolean => {
  // If userId is undefined or null, return false
  if (!userId) return false;
  
  const user = getUserById(userId);
  // Check if user exists and has completedLessons property before using includes
  return user?.completedLessons?.includes(lessonId) || false;
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

// New function to unlock next lessons based on completion
export const unlockNextLessons = (userId: string): void => {
  const user = getUserById(userId);
  if (!user) return;
  
  const courses = getCourses();
  let hasChanges = false;
  
  // For each course the user is enrolled in
  user.enrolledCourses.forEach(courseId => {
    const courseIndex = courses.findIndex(course => course.id === courseId);
    if (courseIndex === -1) return;
    
    const course = courses[courseIndex];
    
    // Process each module
    for (let i = 0; i < course.modules.length; i++) {
      const module = course.modules[i];
      
      // First module is always unlocked for enrolled users
      if (i === 0) {
        if (module.isLocked) {
          module.isLocked = false;
          module.lessons[0].isLocked = false; // First lesson is always unlocked
          hasChanges = true;
        }
      } 
      // For subsequent modules, check if previous module has enough completed lessons
      else {
        const previousModule = course.modules[i-1];
        const previousModuleLessons = previousModule.lessons;
        const completedLessonsInPreviousModule = previousModuleLessons.filter(
          lesson => user.completedLessons.includes(lesson.id)
        ).length;
        
        // If user completed at least half of the previous module's lessons
        if (completedLessonsInPreviousModule >= Math.ceil(previousModuleLessons.length / 2)) {
          if (module.isLocked) {
            module.isLocked = false;
            module.lessons[0].isLocked = false; // First lesson of the newly unlocked module
            hasChanges = true;
          }
        }
      }
      
      // For each module, unlock subsequent lessons based on completed lessons
      if (!module.isLocked) {
        for (let j = 0; j < module.lessons.length - 1; j++) {
          const currentLesson = module.lessons[j];
          const nextLesson = module.lessons[j + 1];
          
          if (user.completedLessons.includes(currentLesson.id) && nextLesson.isLocked) {
            nextLesson.isLocked = false;
            hasChanges = true;
          }
        }
      }
    }
  });
  
  if (hasChanges) {
    localStorage.setItem('courses', JSON.stringify(courses));
  }
};
