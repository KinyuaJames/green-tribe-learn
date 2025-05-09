
import { User, Course, Certificate, Badge, CaseStudy, DiscussionThread, QuizAttempt, StudyItem } from './types';
import { generateUniqueId } from '@/lib/utils';

// Helper function to generate simple IDs
export const generateId = (): string => {
  return generateUniqueId();
};

// Users data
export const users: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    fullName: "Demo User",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    role: "student",
    enrolledCourses: ["1", "2"],
    courses: [],
    completedLessons: ["lesson-1", "lesson-2", "lesson-3"],
    quizAttempts: [
      {
        id: "quiz-attempt-1",
        quizId: "quiz-1",
        userId: "1",
        score: 85,
        answers: [0, 1, 2, 0],
        completed: true,
        startedAt: "2024-02-15T10:30:00Z",
        completedAt: "2024-02-15T10:45:00Z",
        totalQuestions: 5,
        passed: true,
        date: "2024-02-15"
      },
      {
        id: "quiz-attempt-2",
        quizId: "quiz-2",
        userId: "1",
        score: 90,
        answers: [1, 0, 2, 1],
        completed: true,
        startedAt: "2024-03-05T14:20:00Z",
        completedAt: "2024-03-05T14:35:00Z",
        totalQuestions: 5,
        passed: true,
        date: "2024-03-05"
      }
    ],
    studyGallery: [
      {
        id: "note-1",
        title: "Benefits of Natural Light",
        imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
        description: "Key benefits of natural light in biophilic design",
        type: "note",
        content: "Natural light has numerous benefits in biophilic design:\n\n1. Improves mood and productivity\n2. Reduces energy consumption\n3. Enhances connection to natural cycles\n4. Provides vitamin D exposure\n5. Highlights natural materials and textures",
        createdAt: "2024-01-20T08:15:00Z",
        moduleId: "module-1",
        moduleName: "Introduction to Biophilic Design",
        courseId: "1",
        lessonId: "lesson-1"
      },
      {
        id: "note-2",
        title: "African Clay Materials",
        imageUrl: "https://images.unsplash.com/photo-1604762525953-f7fbcf6f9a25",
        description: "Notes on traditional clay applications",
        type: "note",
        content: "Traditional clay applications in East African architecture:\n\n- Red earth mixed with straw for thermal mass\n- Natural pigments for decorative elements\n- Water-resistant techniques using cow dung and ash mixtures\n- Ventilation considerations for hot climates",
        createdAt: "2024-02-02T14:30:00Z",
        moduleId: "module-2",
        moduleName: "Natural Materials",
        courseId: "1",
        lessonId: "lesson-4"
      },
      {
        id: "note-3",
        title: "Sustainable Cooling Techniques",
        imageUrl: "https://images.unsplash.com/photo-1594292608216-69e4771be05f",
        description: "Traditional cooling methods",
        type: "note",
        content: "Passive cooling techniques observed in traditional architecture:\n\n- Cross ventilation principles\n- Courtyard designs for air movement\n- Water features for evaporative cooling\n- Orientation to prevailing winds\n- Strategic tree placement",
        createdAt: "2024-02-15T11:45:00Z",
        moduleId: "module-3",
        moduleName: "Climate Responsive Design",
        courseId: "2",
        lessonId: "lesson-7"
      },
      {
        id: "voice-1",
        title: "Reflections on Site Visit",
        imageUrl: "https://images.unsplash.com/photo-1484299991459-87d3564925e3",
        description: "Voice recording from field trip",
        type: "voice",
        content: "https://example.com/audio/recording-1.mp3",
        createdAt: "2024-03-01T10:00:00Z"
      }
    ],
    badges: [
      {
        id: "badge-1",
        title: "Biophilic Explorer",
        description: "Completed first course module",
        imageUrl: "https://example.com/badges/explorer.png",
        image: "https://images.unsplash.com/photo-1573503947901-276b2c3c4969",
        earnedDate: "2024-01-15",
        dateEarned: "2024-01-15",
        criteria: "Complete first module of any course"
      }
    ],
    certificates: [
      {
        id: "cert-1",
        courseId: "1",
        userId: "1",
        courseName: "Biophilic Design Fundamentals",
        courseTitle: "Biophilic Design Fundamentals",
        issueDate: "2024-03-10",
        completionDate: "2024-03-09",
        certificateUrl: "https://example.com/certificates/cert-1.pdf"
      }
    ],
    completedQuizzes: ["quiz-1", "quiz-2"],
    createdAt: "2023-12-01"
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    fullName: "Admin User",
    avatar: "https://images.unsplash.com/photo-1573497019707-1c04de26e58c",
    role: "admin",
    enrolledCourses: [],
    courses: [],
    completedLessons: [],
    quizAttempts: [],
    studyGallery: [],
    badges: [],
    certificates: [],
    completedQuizzes: [],
    createdAt: "2023-11-15"
  }
];

// Sample course data
export const courses: Course[] = [
  {
    id: "1",
    title: "Biophilic Design Fundamentals",
    description: "Learn the core principles of biophilic design and how to incorporate natural elements into architecture for improved well-being and sustainability.",
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013",
    modules: [
      {
        id: "module-1",
        title: "Introduction to Biophilic Design",
        description: "Understanding the basic concepts and benefits of biophilic design.",
        lessons: [
          {
            id: "lesson-1",
            title: "What is Biophilic Design?",
            type: "video",
            content: "Biophilic design is an approach to architecture that seeks to connect building occupants more closely to nature. The term 'biophilia' means 'love of life or living systems' and suggests that humans have an innate connection with nature.",
            duration: "15 min",
            resources: [],
            studyItems: [],
            isLocked: false
          },
          {
            id: "lesson-2",
            title: "Benefits of Biophilic Design",
            type: "text",
            content: "Research has shown multiple benefits of incorporating biophilic design principles, including improved cognitive function, reduced stress, enhanced creativity, and accelerated healing.",
            duration: "10 min",
            resources: [],
            studyItems: [],
            isLocked: false
          }
        ],
        isLocked: false
      },
      {
        id: "module-2",
        title: "Design Patterns and Elements",
        description: "Exploring the various patterns and elements used in biophilic design.",
        lessons: [
          {
            id: "lesson-3",
            title: "Natural Materials in Design",
            type: "video",
            content: "Natural materials like wood, stone, and clay connect us to nature and provide unique sensory experiences. This lesson explores how to select and incorporate these elements effectively.",
            videoUrl: "https://example.com/videos/natural-materials.mp4",
            thumbnailUrl: "https://images.unsplash.com/photo-1604762525953-f7fbcf6f9a25",
            duration: "20 min",
            resources: [],
            studyItems: [],
            isLocked: false
          },
          {
            id: "lesson-4",
            title: "Quiz: Biophilic Elements",
            type: "quiz",
            content: "Test your knowledge of biophilic design elements and their applications.",
            duration: "15 min",
            resources: [],
            studyItems: [],
            quiz: {
              id: "quiz-1",
              title: "Biophilic Elements Quiz",
              questions: [
                {
                  id: "q1",
                  question: "Which of the following is NOT a direct experience of nature in biophilic design?",
                  text: "Which of the following is NOT a direct experience of nature in biophilic design?",
                  options: [
                    { id: "a", text: "Plants" },
                    { id: "b", text: "Water" },
                    { id: "c", text: "Geometric patterns" },
                    { id: "d", text: "Natural light" }
                  ],
                  correctAnswerIndex: 2,
                  correctOptionId: "c",
                  explanation: "Geometric patterns are an indirect experience of nature, representing natural shapes and forms rather than being direct natural elements."
                },
                {
                  id: "q2",
                  question: "Which traditional African building material provides excellent thermal mass properties?",
                  text: "Which traditional African building material provides excellent thermal mass properties?",
                  options: [
                    { id: "a", text: "Woven grass" },
                    { id: "b", text: "Mud brick/Adobe" },
                    { id: "c", text: "Bamboo" },
                    { id: "d", text: "Palm leaves" }
                  ],
                  correctAnswerIndex: 1,
                  correctOptionId: "b",
                  explanation: "Mud brick or adobe has excellent thermal mass, absorbing heat during the day and releasing it at night, helping to regulate indoor temperatures."
                },
                {
                  id: "q3",
                  question: "What is a primary benefit of incorporating water features in biophilic design?",
                  text: "What is a primary benefit of incorporating water features in biophilic design?",
                  options: [
                    { id: "a", text: "Reduced maintenance costs" },
                    { id: "b", text: "Increased property value only" },
                    { id: "c", text: "Multi-sensory engagement" },
                    { id: "d", text: "Protection from fire" }
                  ],
                  correctAnswerIndex: 2,
                  correctOptionId: "c",
                  explanation: "Water features provide multi-sensory engagement through sound, movement, touch, and visual qualities, creating rich sensory experiences."
                },
                {
                  id: "q4",
                  question: "What aspect of traditional Ndebele houses demonstrates biophilic principles?",
                  text: "What aspect of traditional Ndebele houses demonstrates biophilic principles?",
                  options: [
                    { id: "a", text: "Metal roofing" },
                    { id: "b", text: "Colorful geometric patterns" },
                    { id: "c", text: "Solar panels" },
                    { id: "d", text: "Central air conditioning" }
                  ],
                  correctAnswerIndex: 1,
                  correctOptionId: "b",
                  explanation: "Ndebele geometric patterns often represent natural elements and forms, connecting inhabitants to nature through symbolic representation."
                },
                {
                  id: "q5",
                  question: "Which natural ventilation strategy is commonly seen in traditional East African architecture?",
                  text: "Which natural ventilation strategy is commonly seen in traditional East African architecture?",
                  options: [
                    { id: "a", text: "Mechanical fans" },
                    { id: "b", text: "Central courtyard design" },
                    { id: "c", text: "Electric air purifiers" },
                    { id: "d", text: "Sealed windows" }
                  ],
                  correctAnswerIndex: 1,
                  correctOptionId: "b",
                  explanation: "Central courtyard designs create natural air circulation, drawing fresh air through the building and providing natural cooling."
                }
              ],
              passingScore: 70,
              description: "Test your knowledge of biophilic elements and their applications in design."
            },
            isLocked: false
          }
        ],
        isLocked: false
      },
      {
        id: "module-3",
        title: "African Indigenous Design",
        description: "Exploring traditional African design approaches that embody biophilic principles.",
        lessons: [
          {
            id: "lesson-5",
            title: "Case Study: Maasai Architecture",
            type: "video",
            content: "Learn about traditional Maasai construction techniques that create harmony with the natural environment.",
            duration: "25 min",
            resources: [
              {
                id: "resource-1",
                title: "Maasai Building Techniques Guide",
                type: "pdf",
                url: "https://example.com/resources/maasai-techniques.pdf",
                description: "Comprehensive guide to traditional Maasai building methods",
                category: "Reference"
              }
            ],
            studyItems: [],
            isLocked: true
          },
          {
            id: "lesson-6",
            title: "Assignment: Local Materials Analysis",
            type: "text",
            content: "Research and document locally available natural building materials in your region.",
            duration: "30 min",
            resources: [],
            studyItems: [],
            isLocked: true
          }
        ],
        isLocked: true
      }
    ],
    createdAt: "2023-12-10",
    instructor: "Wangui Mwangi",
    instructorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    duration: "4 weeks",
    level: "Beginner",
    price: 0,
    isFree: true,
    tags: ["design", "architecture", "sustainability"],
    resources: [],
    rating: 4.8,
    studentsCount: 128,
    isFeatured: true
  },
  {
    id: "2",
    title: "Advanced Biophilic Design Applications",
    description: "Take your biophilic design skills to the next level with advanced techniques for complex projects.",
    imageUrl: "https://images.unsplash.com/photo-1545566898-4a44e508aa26",
    image: "https://images.unsplash.com/photo-1545566898-4a44e508aa26",
    modules: [
      {
        id: "module-4",
        title: "Commercial Applications",
        description: "Implementing biophilic design in commercial spaces for productivity and wellbeing.",
        lessons: [
          {
            id: "lesson-7",
            title: "Office Space Design",
            type: "video",
            content: "Learn how to transform office environments with biophilic elements that enhance productivity and employee wellbeing.",
            duration: "30 min",
            resources: [],
            studyItems: [],
            isLocked: true
          },
          {
            id: "lesson-8",
            title: "Retail Environments",
            type: "text",
            content: "Discover how biophilic retail design can improve customer experience and increase sales.",
            duration: "25 min",
            resources: [],
            studyItems: [],
            isLocked: true
          }
        ],
        isLocked: true
      },
      {
        id: "module-5",
        title: "Urban Planning Integration",
        description: "Scaling biophilic design to urban planning and public spaces.",
        lessons: [
          {
            id: "lesson-9",
            title: "Urban Gardens & Green Spaces",
            type: "video",
            duration: "35 min",
            content: "Techniques for integrating natural elements into urban environments to create healthier cities.",
            resources: [],
            studyItems: [],
            isLocked: true
          },
          {
            id: "lesson-10",
            title: "Green Infrastructure Planning",
            type: "video",
            duration: "40 min",
            content: "Learn to plan city-wide green infrastructure that supports biodiversity and human wellbeing.",
            resources: [],
            studyItems: [],
            isLocked: true
          }
        ],
        isLocked: true
      }
    ],
    createdAt: "2024-01-15",
    instructor: "Dr. Francis Kéré",
    instructorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    duration: "6 weeks",
    level: "Intermediate",
    price: 49.99,
    isFree: false,
    isLocked: true,
    tags: ["design", "architecture", "urban planning"],
    resources: [],
    rating: 4.9,
    studentsCount: 75,
    isFeatured: true
  }
];

// Case studies data
export const caseStudiesData: CaseStudy[] = [
  {
    id: "case-1",
    title: "Earth Lodge Community Center",
    description: "A community center built using traditional rammed earth techniques combined with modern sustainable technologies.",
    images: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90",
      "https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90"
    ],
    tags: ["earth building", "community", "sustainability"],
    author: "Wangui Mwangi",
    authorId: "1",
    featured: true,
    published: true,
    createdAt: "2024-01-20",
    location: "Nairobi, Kenya",
    year: 2023
  }
];

// Discussion threads data
export const discussionThreads: DiscussionThread[] = [
  {
    id: "thread-1",
    courseId: "1",
    studentId: "1",
    studentName: "Demo User",
    title: "Natural material sourcing in urban areas",
    status: "open",
    createdAt: "2024-02-05T09:15:00Z",
    lastMessageAt: "2024-02-05T14:30:00Z",
    messages: [
      {
        id: "msg-1",
        threadId: "thread-1",
        userId: "1",
        userName: "Demo User",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        userRole: "student",
        content: "I'm struggling to find natural building materials in my city. Does anyone have suggestions for sourcing sustainable materials in urban environments?",
        createdAt: "2024-02-05T09:15:00Z",
        likes: 2
      }
    ]
  }
];
