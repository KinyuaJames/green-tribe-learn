// This file simulates a database with mock data
// In a real application, this would be replaced with actual API calls to a backend

import { toast } from 'sonner';

export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  earnedDate: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  completionDate: string;
  certificateUrl: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  fullName?: string;
  avatar?: string;
  enrolledCourses: string[];
  completedLessons: string[];
  quizAttempts: QuizAttempt[];
  studyGallery: StudyItem[];
  role: 'student' | 'instructor' | 'admin';
  badges: Badge[];
  certificates: Certificate[];
  createdAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorImage?: string;
  price: number;
  isFree: boolean;
  duration: string;
  level?: string;
  rating?: number;
  studentsCount?: number;
  image: string;
  isLocked: boolean;
  isFeatured: boolean;
  modules: Module[];
  resources?: Resource[];
  tags?: string[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  isLocked: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content?: string;
  duration?: string;
  isLocked: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  quiz?: Quiz;
  requiresAudioFeedback?: boolean; // For lessons requiring audio feedback
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in seconds
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

export interface QuizAttempt {
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  date: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'link';
  url: string;
}

export interface StudyItem {
  id: string;
  title: string;
  type: 'image' | 'note' | 'voice';
  content: string;
  thumbnail?: string;
  createdAt: string;
  moduleId?: string;
  moduleName?: string;
  courseId?: string;
  lessonId?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  author: string;
  authorId: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface DiscussionMessage {
  id: string;
  threadId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'instructor';
  content: string;
  createdAt: string;
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

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Mock users data
const users: User[] = [
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
        earnedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    certificates: [
      {
        id: 'cert-1',
        courseId: '1',
        courseName: 'Biophilic Design Fundamentals',
        issueDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        completionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        certificateUrl: '/certificates/biophilic-fundamentals.pdf'
      }
    ],
    role: 'student'
  }
];

// Mock courses data
const courses: Course[] = [
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
      {
        id: 'module-2',
        title: 'Principles in Practice',
        isLocked: false,
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Case Study – Mlolongo Heritage House',
            type: 'text',
            content: 'The Mlolongo Heritage House in Kenya represents a modern interpretation of traditional biophilic design principles. Built in 2018, the residence combines contemporary needs with time-tested approaches to creating harmony with nature.\n\nKey features include:\n- A central courtyard with indigenous plants that provides natural cooling\n- Walls constructed of local earth with natural pigments\n- Strategically placed windows that create dynamic light patterns throughout the day\n- Rainwater harvesting system integrated into the landscape design\n- Semi-permeable outdoor spaces that serve as transition zones between indoors and outdoors',
            duration: '15 min',
            isLocked: false
          },
          {
            id: 'lesson-2-2',
            title: 'Designing With the Five Senses',
            type: 'assignment',
            content: 'For this assignment, you will conduct a sensory assessment of a space you use regularly (your home, workplace, or a public space). Consider how the space engages each of your five senses: sight, sound, touch, smell, and even taste.\n\nRecord a voice note (3 minutes maximum) describing:\n1. The space you chose to assess\n2. At least one positive sensory experience in the space\n3. One sensory aspect that could be improved through biophilic design\n4. A specific suggestion for how you would enhance the connection to nature through sensory design',
            duration: '30 min',
            isLocked: false
          },
          {
            id: 'lesson-2-3',
            title: 'Module 2 Assessment Quiz with Reflection',
            type: 'quiz',
            duration: '20 min',
            isLocked: false,
            requiresAudioFeedback: true,
            quiz: {
              id: 'quiz-2',
              title: 'Biophilic Design Application Quiz',
              description: 'Test your understanding of applied biophilic design concepts',
              questions: [
                {
                  id: 'q1',
                  text: 'Which of the following is NOT a key feature of the Mlolongo Heritage House case study?',
                  options: [
                    { id: 'a1', text: 'Central courtyard with indigenous plants' },
                    { id: 'a2', text: 'Walls made of local earth' },
                    { id: 'a3', text: 'Advanced electronic climate control system' },
                    { id: 'a4', text: 'Rainwater harvesting system' }
                  ],
                  correctOptionId: 'a3'
                },
                {
                  id: 'q2',
                  text: 'When designing for the sense of sound, which approach best exemplifies biophilic design?',
                  options: [
                    { id: 'a1', text: 'Installing speakers that play nature sounds' },
                    { id: 'a2', text: 'Complete soundproofing to eliminate all outdoor noise' },
                    { id: 'a3', text: 'Creating spaces where natural sounds like water or rustling leaves can be heard' },
                    { id: 'a4', text: 'Using bright colors to distract from sound issues' }
                  ],
                  correctOptionId: 'a3'
                },
                {
                  id: 'q3',
                  text: 'Which sensory design element would be most appropriate for enhancing the tactile experience in a biophilic space?',
                  options: [
                    { id: 'a1', text: 'Smooth plastic surfaces throughout' },
                    { id: 'a2', text: 'Varied natural textures like stone, wood, and textiles' },
                    { id: 'a3', text: 'Uniformly polished surfaces' },
                    { id: 'a4', text: 'Synthetic carpeting throughout' }
                  ],
                  correctOptionId: 'a2'
                },
                {
                  id: 'q4',
                  text: 'Semi-permeable outdoor spaces in the Mlolongo Heritage House serve as:',
                  options: [
                    { id: 'a1', text: 'Security checkpoints' },
                    { id: 'a2', text: 'Transition zones between indoors and outdoors' },
                    { id: 'a3', text: 'Storage areas' },
                    { id: 'a4', text: 'Purely decorative elements' }
                  ],
                  correctOptionId: 'a2'
                },
                {
                  id: 'q5',
                  text: 'Which approach best supports biophilic design for the sense of smell?',
                  options: [
                    { id: 'a1', text: 'Using artificial air fresheners with nature scents' },
                    { id: 'a2', text: 'Eliminating all odors with air purifiers' },
                    { id: 'a3', text: 'Incorporating fragrant natural elements like herbs or flowers' },
                    { id: 'a4', text: 'Keeping windows closed to prevent outside smells' }
                  ],
                  correctOptionId: 'a3'
                }
              ],
              passingScore: 3,
              timeLimit: 300 // 5 minutes
            }
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Your Biophilic Design Journey',
        isLocked: false,
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'Create Your Nature Map',
            type: 'assignment',
            content: "For this assignment, you will create a \"Nature Map\" of a space you'd like to transform using biophilic design principles.\n\nYou can submit either:\n1. A voice recording describing your vision (3 minutes maximum)\n2. A sketch or image with annotations showing your ideas\n\nInclude the following elements:\n- The type of space you're designing (home, office, public space, etc.)\n- At least 3 specific biophilic elements you would incorporate\n- How these elements connect to the local environment and culture\n- One challenge you might face in implementation and how you would address it",
            duration: '45 min',
            isLocked: false
          },
          {
            id: 'lesson-3-2',
            title: 'Reflection & Course Completion',
            type: 'assignment',
            content: "Congratulations on reaching the end of the course! For this final assignment, record a brief reflection (2-3 minutes) on your learning journey:\n\n1. The most important concept you learned about biophilic design\n2. How you plan to apply biophilic principles in your life or work\n3. One question or area you'd like to explore further\n\nAfter submitting your reflection, you'll be able to download your course completion certificate.",
            duration: '20 min',
            isLocked: false
          }
        ]
      }
    ],
    resources: [
      {
        id: 'resource-1',
        title: 'Biophilic Design Glossary',
        description: 'Key terms and concepts for understanding biophilic design principles',
        type: 'pdf',
        url: '/resources/biophilic-glossary.pdf'
      },
      {
        id: 'resource-2',
        title: 'Traditional African Architecture and Biophilia',
        description: 'Audio lecture exploring indigenous design approaches',
        type: 'audio',
        url: '/resources/traditional-architecture-lecture.mp3'
      },
      {
        id: 'resource-3',
        title: '5 Senses Biophilic Checklist',
        description: 'Downloadable worksheet for evaluating spaces through sensory design',
        type: 'pdf',
        url: '/resources/sensory-checklist.pdf'
      },
      {
        id: 'resource-4',
        title: 'Virtual Tour: Eastgate Centre, Harare',
        description: 'Video exploration of biomimicry in commercial architecture',
        type: 'video',
        url: '/resources/eastgate-tour.mp4'
      }
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
const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Eastgate Centre: Biomimicry in Zimbabwe',
    description: 'The Eastgate Centre in Harare, Zimbabwe is a remarkable example of biomimetic architecture, drawing inspiration from termite mounds. Designed by architect Mick Pearce in collaboration with engineers at Arup Associates, the building uses passive cooling strategies observed in termite colonies.\n\nTermites maintain the temperature inside their mounds within one degree day and night, despite external temperatures ranging from 42°C to 3°C. Similarly, the Eastgate Centre uses a ventilation system that draws in cool air at night to lower the building\'s temperature and expels heat during the day, significantly reducing energy consumption compared to conventional air-conditioned buildings.',
    images: [
      'https://images.unsplash.com/photo-1518005068251-37900150dfca',
      'https://images.unsplash.com/photo-1464195244916-405fa0a82545'
    ],
    tags: ['biomimicry', 'passive cooling', 'commercial architecture', 'Zimbabwe'],
    author: 'System',
    authorId: 'system',
    featured: true,
    published: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'case-2',
    title: 'Bosco Verticale: Vertical Forest Towers',
    description: 'The Bosco Verticale (Vertical Forest) in Milan, Italy consists of two residential towers designed by Stefano Boeri Architetti. These towers host over 900 trees and thousands of plants distributed according to sun exposure on the facades.\n\nThis living facade helps mitigate air pollution, produces oxygen, and regulates temperature within the building. The vegetation also provides natural shading in summer while allowing sunlight to penetrate in winter when deciduous plants lose their leaves. Beyond environmental benefits, the constant presence of lush greenery provides psychological benefits to residents who experience a connection to nature despite living in a dense urban setting.',
    images: [
      'https://images.unsplash.com/photo-1545566898-4a44e508aa26',
      'https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2'
    ],
    tags: ['vertical forest', 'urban greening', 'residential', 'Italy'],
    author: 'System',
    authorId: 'system',
    featured: false,
    published: true,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock discussion threads
const discussionThreads: DiscussionThread[] = [
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
      {
        id: 'msg-2',
        threadId: 'thread-1',
        userId: '2',
        userName: 'Jane Instructor',
        userRole: 'instructor',
        content: 'Great question! Kenya has a wealth of natural materials that work well for biophilic design. Consider sisal for textiles, locally quarried stone like Nairobi blue stone, sustainably harvested bamboo, and reclaimed wood. Local clay is also excellent for earth wall construction techniques.',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'msg-3',
        threadId: 'thread-1',
        userId: '3',
        userName: 'Demo Student',
        userRole: 'student',
        content: 'Thank you for these suggestions! Do you know of any suppliers for these materials, particularly the bamboo and reclaimed wood?',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'msg-4',
        threadId: 'thread-1',
        userId: '2',
        userName: 'Jane Instructor',
        userRole: 'instructor',
        content: 'I\'ll compile a list of verified sustainable suppliers and share it as a resource in the course. For now, check out EcoBuilders Kenya for bamboo and the Reclaim Green initiative for reclaimed wood. They both have good reputations for sustainable sourcing.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

// Initialize the database
export const initializeDatabase = () => {
  // This would typically connect to a real database
  console.log('Database initialized');
  return true;
};

// Authentication Functions
export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    // Create a copy without the password
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword };
  }
  return null;
};

export const createUser = (userData: Partial<User>) => {
  // Check if user already exists
  if (users.find(u => u.email.toLowerCase() === userData.email?.toLowerCase())) {
    throw new Error('Email already in use');
  }
  
  // Create new user with required fields
  const newUser: User = {
    id: generateId(),
    email: userData.email || '',
    password: userData.password || '',
    fullName: userData.fullName,
    name: userData.fullName, // For backward compatibility
    enrolledCourses: userData.enrolledCourses || [],
    completedLessons: userData.completedLessons || [],
    quizAttempts: userData.quizAttempts || [],
    studyGallery: userData.studyGallery || [],
    badges: userData.badges || [],
    certificates: userData.certificates || [],
    role: userData.role || 'student',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword };
};

export const getUserById = (id: string) => {
  const user = users.find(u => u.id === id);
  if (user) {
    // Create a copy without the password
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword };
  }
  return null;
};

export const getUserEnrolledCourses = (userId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return [];
  
  return user.enrolledCourses
    .map(courseId => courses.find(c => c.id === courseId))
    .filter(Boolean) as Course[];
};

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

// Quiz Functions
export const saveQuizAttempt = (userId: string, quizId: string, score: number, totalQuestions: number) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  const passingScore = 0.6; // 60% passing threshold
  const passed = score / totalQuestions >= passingScore;
  
  const attempt: QuizAttempt = {
    quizId,
    score,
    totalQuestions,
    passed,
    date: new Date().toISOString()
  };
  
  user.quizAttempts.push(attempt);
  return true;
};

// Study Gallery Functions
interface StudyNoteInput {
  title: string;
  content: string;
  type: 'image' | 'note' | 'voice';
  moduleId?: string;
  moduleName?: string;
  courseId?: string;
  lessonId?: string;
}

export const addStudyNote = (userId: string, note: StudyNoteInput) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  const studyItem: StudyItem = {
    id: generateId(),
    title: note.title,
    content: note.content,
    type: note.type,
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

// Case Study Functions
export const getCaseStudies = () => {
  return caseStudies;
};

export const getCaseStudyById = (id: string) => {
  return caseStudies.find(study => study.id === id) || null;
};

interface CaseStudyInput {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  author: string;
  authorId: string;
}

export const addCaseStudy = (study: CaseStudyInput) => {
  const newCaseStudy: CaseStudy = {
    id: generateId(),
    title: study.title,
    description: study.description,
    images: study.images,
    tags: study.tags,
    author: study.author,
    authorId: study.authorId,
    featured: false,
    published: false, // Requires instructor approval
    createdAt: new Date().toISOString()
  };
  
  caseStudies.push(newCaseStudy);
  return newCaseStudy.id;
};

export const publishCaseStudy = (studyId: string, shouldPublish: boolean = true) => {
  const study = caseStudies.find(s => s.id === studyId);
  if (!study) return false;
  
  study.published = shouldPublish;
  return true;
};

// Discussion Functions
export const getCourseDiscussions = (courseId: string) => {
  return discussionThreads.filter(thread => thread.courseId === courseId);
};

interface ThreadInput {
  courseId: string;
  studentId: string;
  studentName: string;
  title: string;
  message: string;
}

export const createDiscussionThread = (input: ThreadInput) => {
  const threadId = generateId();
  const timestamp = new Date().toISOString();
  
  const newThread: DiscussionThread = {
    id: threadId,
    courseId: input.courseId,
    studentId: input.studentId,
    studentName: input.studentName,
    title: input.title,
    status: 'open',
    createdAt: timestamp,
    lastMessageAt: timestamp,
    messages: [
      {
        id: generateId(),
        threadId: threadId,
        userId: input.studentId,
        userName: input.studentName,
        userRole: 'student',
        content: input.message,
        createdAt: timestamp
      }
    ]
  };
  
  discussionThreads.push(newThread);
  return threadId;
};

interface MessageInput {
  threadId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'instructor';
  content: string;
}

export const addDiscussionMessage = (input: MessageInput) => {
  const thread = discussionThreads.find(t => t.id === input.threadId);
  if (!thread) return false;
  
  const timestamp = new Date().toISOString();
  
  const message: DiscussionMessage = {
    id: generateId(),
    threadId: input.threadId,
    userId: input.userId,
    userName: input.userName,
    userRole: input.userRole,
    content: input.content,
    createdAt: timestamp
  };
  
  thread.messages.push(message);
  thread.lastMessageAt = timestamp;
  
  return message.id;
};
