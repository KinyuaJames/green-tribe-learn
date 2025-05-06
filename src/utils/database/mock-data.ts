
import { User, Course, CaseStudy, DiscussionThread } from './types';

// Helper to generate unique IDs
export const generateId = () => Math.random().toString(36).substring(2, 11);

// Mock users data
export const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'Demo User',
    fullName: 'Demo User',
    enrolledCourses: ['1'],
    completedLessons: [],
    quizAttempts: [],
    studyGallery: [],
    role: 'student',
    badges: [],
    certificates: [],
    completedQuizzes: [],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'instructor@biophilic.edu',
    password: 'password123',
    name: 'Jane Instructor',
    fullName: 'Jane Instructor',
    avatar: 'https://i.pravatar.cc/150?img=48',
    enrolledCourses: [],
    completedLessons: [],
    quizAttempts: [],
    studyGallery: [],
    role: 'instructor',
    badges: [],
    certificates: [],
    completedQuizzes: [],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    email: 'demo@biophilic.edu',
    password: 'password123',
    name: 'Demo Student',
    fullName: 'Demo Student',
    enrolledCourses: ['1', '2'],
    completedLessons: [
      'lesson-1-1', 'lesson-1-2', 'lesson-1-3', 
      'lesson-2-1', 'lesson-2-2', 'lesson-2-3'
    ],
    quizAttempts: [
      {
        quizId: 'quiz-1',
        score: 9,
        totalQuestions: 10,
        passed: true,
        date: new Date().toISOString()
      },
      {
        quizId: 'quiz-2',
        score: 8,
        totalQuestions: 10,
        passed: true,
        date: new Date().toISOString()
      }
    ],
    studyGallery: [
      {
        id: 'note-1',
        title: 'Introduction Notes',
        type: 'note',
        content: 'Biophilic design integrates natural elements into built environments to enhance human well-being. Key principles include direct exposure to nature, indirect references to nature, and space/place conditions that promote comfort and engagement.',
        createdAt: new Date().toISOString(),
        moduleId: 'module-1',
        moduleName: 'Understanding Biophilia',
        courseId: '1',
        lessonId: 'lesson-1-1'
      },
      {
        id: 'voice-1',
        title: 'Reflection on Traditional Design',
        type: 'voice',
        content: 'audio-url-placeholder',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        moduleId: 'module-1',
        moduleName: 'Understanding Biophilia',
        courseId: '1',
        lessonId: 'lesson-1-2'
      },
      {
        id: 'image-1',
        title: 'Biophilic Case Example',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1618220179428-22790b461013',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        moduleId: 'module-2',
        moduleName: 'Principles in Practice',
        courseId: '1',
        lessonId: 'lesson-2-1'
      },
      {
        id: 'note-2',
        title: 'Personal Design Ideas',
        type: 'note',
        content: 'Ideas for my own garden: 1. Use local plants to attract native birds, 2. Create a small water feature, 3. Use natural materials like wood and stone for boundaries.',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    badges: [
      {
        id: 'badge-1',
        title: 'Biophilia Explorer',
        description: 'Completed the Fundamentals course',
        imageUrl: '/badges/explorer.svg',
        image: '/badges/explorer.svg',
        earnedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        dateEarned: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    certificates: [
      {
        id: 'cert-1',
        courseId: '1',
        courseName: 'Biophilic Design Fundamentals',
        courseTitle: 'Biophilic Design Fundamentals',
        issueDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        completionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        certificateUrl: '/certificates/biophilic-fundamentals.pdf'
      }
    ],
    completedQuizzes: [],
    role: 'student'
  }
];

// Mock courses data
export const courses: Course[] = [
  {
    id: '1',
    title: 'Biophilic Design Fundamentals',
    description: 'Learn the core principles of biophilic design and how to incorporate nature-inspired elements into your living and working spaces.',
    instructor: 'Wangui Mwangi',
    instructorImage: 'https://i.pravatar.cc/150?img=48',
    price: 0,
    isFree: true,
    duration: '3 weeks',
    level: 'Beginner',
    rating: 4.8,
    studentsCount: 243,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013',
    isLocked: false,
    isFeatured: true,
    tags: ['biophilia', 'sustainable-design', 'beginners'],
    modules: [
      {
        id: 'module-1',
        title: 'Understanding Biophilia',
        isLocked: false,
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'What is Biophilic Design?',
            type: 'video',
            content: 'Biophilic design is an approach to architecture and interior design that seeks to connect building occupants more closely to nature. It incorporates natural elements, materials, and forms into the built environment to enhance human well-being.\n\nThe term "biophilia" was popularized by biologist Edward O. Wilson, who suggested that humans have an innate connection to nature. In design, this translates to creating spaces that incorporate natural light, ventilation, plants, water features, natural materials, and views of nature.',
            duration: '10 min',
            isLocked: false
          },
          {
            id: 'lesson-1-2',
            title: 'African Traditions and Nature-Based Living',
            type: 'text',
            content: 'Traditional African architecture and design has long incorporated biophilic principles, often out of necessity and deep cultural connections to the natural world. Many traditional building techniques work in harmony with the local climate and available materials.\n\nExamples include:\n- Courtyards that bring light, air, and greenery into homes\n- Natural material use like clay, wood, and thatch\n- Orientation of buildings to maximize natural ventilation and minimize heat gain\n- Integration of indoor and outdoor living spaces\n- Community layouts that respect and preserve significant natural features',
            duration: '15 min',
            isLocked: false
          },
          {
            id: 'lesson-1-3',
            title: 'Module 1 Assessment Quiz',
            type: 'quiz',
            duration: '15 min',
            isLocked: false,
            quiz: {
              id: 'quiz-1',
              title: 'Biophilic Design Fundamentals Quiz',
              description: 'Test your understanding of basic biophilic design concepts',
              questions: [
                {
                  id: 'q1',
                  text: 'What does the term "biophilia" refer to?',
                  options: [
                    { id: 'a1', text: 'Fear of natural environments' },
                    { id: 'a2', text: 'Love of living systems and nature' },
                    { id: 'a3', text: 'A type of architectural software' },
                    { id: 'a4', text: 'A construction material' }
                  ],
                  correctOptionId: 'a2'
                },
                {
                  id: 'q2',
                  text: 'Which is NOT a typical benefit of biophilic design?',
                  options: [
                    { id: 'a1', text: 'Reduced stress' },
                    { id: 'a2', text: 'Improved cognitive function' },
                    { id: 'a3', text: 'Lower energy consumption' },
                    { id: 'a4', text: 'Increased property taxes' }
                  ],
                  correctOptionId: 'a4'
                },
                {
                  id: 'q3',
                  text: 'Which is an example of direct experience of nature in biophilic design?',
                  options: [
                    { id: 'a1', text: 'Printed images of landscapes' },
                    { id: 'a2', text: 'Natural shapes in furniture' },
                    { id: 'a3', text: 'Indoor plants and water features' },
                    { id: 'a4', text: 'Nature documentaries playing on screens' }
                  ],
                  correctOptionId: 'a3'
                },
                {
                  id: 'q4',
                  text: 'Traditional African architecture often incorporates biophilic elements like:',
                  options: [
                    { id: 'a1', text: 'Air conditioning systems' },
                    { id: 'a2', text: 'Synthetic materials for durability' },
                    { id: 'a3', text: 'Courtyard designs that bring in light and air' },
                    { id: 'a4', text: 'Complete separation from the outdoor environment' }
                  ],
                  correctOptionId: 'a3'
                },
                {
                  id: 'q5',
                  text: 'Who popularized the term "biophilia"?',
                  options: [
                    { id: 'a1', text: 'Frank Lloyd Wright' },
                    { id: 'a2', text: 'Edward O. Wilson' },
                    { id: 'a3', text: 'Leonardo da Vinci' },
                    { id: 'a4', text: 'Rachel Carson' }
                  ],
                  correctOptionId: 'a2'
                }
              ],
              passingScore: 3,
              timeLimit: 300 // 5 minutes
            }
          }
        ]
      },
      // ... more modules with lessons
    ],
    resources: [
      {
        id: 'resource-1',
        title: 'Biophilic Design Glossary',
        description: 'Key terms and concepts for understanding biophilic design principles',
        type: 'pdf',
        url: '/resources/biophilic-glossary.pdf'
      },
      // ... more resources
    ]
  },
  {
    id: '2',
    title: 'Advanced Biophilic Architecture',
    description: 'Explore complex biophilic design strategies for large-scale architectural projects, with a focus on African contexts and sustainable approaches.',
    instructor: 'Daniel Owiti',
    instructorImage: 'https://i.pravatar.cc/150?img=33',
    price: 1200,
    isFree: false,
    duration: '6 weeks',
    level: 'Advanced',
    rating: 4.9,
    studentsCount: 87,
    image: 'https://images.unsplash.com/photo-1518005068251-37900150dfca',
    isLocked: true,
    isFeatured: true,
    tags: ['architecture', 'advanced', 'sustainable'],
    modules: [
      {
        id: 'module-adv-1',
        title: 'Biomimicry in Architecture',
        isLocked: true,
        lessons: [
          {
            id: 'lesson-adv-1-1',
            title: 'Introduction to Biomimetic Design',
            type: 'video',
            duration: '25 min',
            isLocked: true
          },
          {
            id: 'lesson-adv-1-2',
            title: 'Case Study: Termite Mound Ventilation',
            type: 'text',
            duration: '30 min',
            isLocked: true
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Biophilic Design for Wellness Spaces',
    description: 'Learn how to design healing environments that leverage the restorative power of nature-inspired elements in healthcare and wellness settings.',
    instructor: 'Amina Njoki',
    instructorImage: 'https://i.pravatar.cc/150?img=23',
    price: 800,
    isFree: false,
    duration: '4 weeks',
    level: 'Intermediate',
    rating: 4.7,
    studentsCount: 124,
    image: 'https://images.unsplash.com/photo-1545566898-4a44e508aa26',
    isLocked: true,
    isFeatured: false,
    tags: ['wellness', 'healthcare', 'interior-design'],
    modules: [
      {
        id: 'module-well-1',
        title: 'Healing Environments',
        isLocked: true,
        lessons: [
          {
            id: 'lesson-well-1-1',
            title: 'Evidence-Based Design in Healthcare',
            type: 'video',
            duration: '20 min',
            isLocked: true
          }
        ]
      }
    ]
  }
];

// Mock case studies data
export const caseStudiesData: CaseStudy[] = [
  {
    id: "cs1",
    title: "Eastgate Centre",
    description: "The Eastgate Centre in Harare, Zimbabwe is a shopping centre and office block designed by architect Mick Pearce with engineers Arup. The building uses passive cooling systems inspired by termite mounds found in Zimbabwe. The building maintains its temperature without conventional air-conditioning or heating, using only 10% of the energy of a conventional building of its size.\n\nThe building is modeled on the self-cooling mounds made by termites in Africa. The termites achieve this by constantly opening and closing vents throughout the mound to manage convection currents that draw in cool air from underground chambers and venting hot air out through channels to the peak of the mound.",
    location: "Harare, Zimbabwe",
    year: 1996,
    images: [
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
      "https://images.unsplash.com/photo-1486718448742-163732cd1544",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1439337153520-7082a56a81f4"
    ],
    tags: ["biomimicry", "passive cooling", "sustainable architecture", "termite-inspired", "energy efficiency"],
    author: "System",
    authorId: "system",
    featured: true,
    published: true,
    createdAt: "2023-06-15T10:30:00Z"
  },
  // More case studies...
];

// Mock discussion threads
export const discussionThreads: DiscussionThread[] = [
  {
    id: 'thread-1',
    courseId: '1',
    studentId: '3',
    studentName: 'Demo Student',
    title: 'Question about Biophilic Materials',
    status: 'open',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessageAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 'msg-1',
        threadId: 'thread-1',
        userId: '3',
        userName: 'Demo Student',
        userRole: 'student',
        content: 'Hello instructor! I\'m wondering if you could recommend some locally available materials in Kenya that would be good for biophilic design projects?',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      // More messages...
    ]
  }
];
