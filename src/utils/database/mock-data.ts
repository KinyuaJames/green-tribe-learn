import { User, Course, Certificate, Badge, CaseStudy, DiscussionThread, QuizAttempt, StudyItem } from './types';
import { generateUniqueId } from '@/lib/utils';

// Helper to generate unique IDs
// export const generateId = () => Math.random().toString(36).substring(2, 11);
export const generateId = (): string => {
  return generateUniqueId();
};
// Mock users data
export const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'Demo User',
    fullName: "Demo User",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    role: "student",
    enrolledCourses: ["1", "2"],
    courses: [],
    completedLessons: [],
    // studyGallery: [],
    // badges: [],
    // certificates: [],
    // completedQuizzes: [],
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
    // createdAt: new Date().toISOString()
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
    courses:[],
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
      'lesson-adv-1',
      'lesson-1', 'lesson-2', 'lesson-3', 
      'lesson-4', 'lesson-5', 'lesson-6',
      'lesson-7', 'lesson-8', 'lesson-9',
      'lesson-adv-1.1', 'lesson-adv-1.2', 'lesson-adv-1.3',
      'lesson-adv-2.1', 'lesson-adv-2.2', 'lesson-adv-2.3',
    ],
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
    completedQuizzes: [],
    courses: [],
    role: 'student'
  },
  {
    id: "demo-user-id",
    email: "demo1@biophilic.edu",
    password: "password123",
    name: "Demo Learner",
    fullName: "Demo Learner",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    role: "student",
    enrolledCourses: ["1", "2"],
    courses: [],
    completedLessons: [
      "lesson-1",
      "lesson-2",
      "lesson-3",
      "lesson-4",
      "lesson-5",
      "lesson-6"
    ],
    quizAttempts: [
      {
        id: "quiz-attempt-1",
        quizId: "quiz-1",
        userId: "demo-user-id",
        score: 95,
        answers: [0, 1, 2, 0],
        completed: true,
        startedAt: "2024-01-01T10:00:00Z",
        completedAt: "2024-01-01T10:15:00Z",
        totalQuestions: 4,
        passed: true,
        date: "2024-01-01"
      },
      {
        id: "quiz-attempt-2",
        quizId: "quiz-2",
        userId: "demo-user-id",
        score: 88,
        answers: [1, 2, 0, 1],
        completed: true,
        startedAt: "2024-02-01T14:00:00Z",
        completedAt: "2024-02-01T14:20:00Z",
        totalQuestions: 4,
        passed: true,
        date: "2024-02-01"
      }
    ],
    badges: [
      {
        id: "badge-1",
        title: "Biophilic Explorer",
        description: "Completed first course module",
        imageUrl: "https://example.com/badges/explorer.png",
        image: "https://images.unsplash.com/photo-1573503947901-276b2c3c4969",
        earnedDate: "2024-01-11",
        dateEarned: "2024-01-11",
        criteria: "Complete first module of any course"
      }
    ],
    certificates: [
      {
        id: "cert-1",
        userId: "demo-user-id",
        courseId: "1",
        completionDate: "2024-01-10",
        issueDate: "2024-01-11",
        certificateUrl:"https://example.com/certificates/cert-1.pdf",
        courseName:"Biophilic Design Fundamentals",
        courseTitle: "Certificate of Completion: Course 1",
        // description: "Awarded for completing Course 1"
      },
      {
        id: "cert-2",
        userId: "demo-user-id",
        courseId: "1",
        completionDate: "2024-01-10",
        issueDate: "2024-01-11",
        certificateUrl:"https://example.com/certificates/cert-1.pdf",
        courseName:"Biophilic Design Fundamentals",
        courseTitle: "Certificate of Completion: Course 1",
        // description: "Awarded for completing Course 1"
      },
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
    ]
  }
  


];

// Mock courses data
export const courses: Course[] = [
  {
    id: '1',
    title: 'Biophilic Foundations: Culturally Rooted Design',
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
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013',
    isLocked: false,
    isFeatured: true,
    createdAt: "2023-12-10",
    tags: ['biophilia', 'sustainable-design', 'beginners'],
    modules: [
      {
        id: 'module-1',
        title: 'Understanding Biophilia',
        description:'',
        isLocked: false,
        lessons: [
          {
            id: 'lesson-1',
            title: 'What is Biophilic Design?',
            type: 'video',
            content: 'Biophilic design is an approach to architecture and interior design that seeks to connect building occupants more closely to nature. It incorporates natural elements, materials, and forms into the built environment to enhance human well-being.\n\nThe term "biophilia" was popularized by biologist Edward O. Wilson, who suggested that humans have an innate connection to nature. In design, this translates to creating spaces that incorporate natural light, ventilation, plants, water features, natural materials, and views of nature.',
            duration: '10 min',
            resources: [],
            studyItems: [],
            isLocked: false
          },
          {
            id: 'lesson-2',
            title: 'African Traditions and Nature-Based Living',
            type: 'text',
            content: 'Traditional African architecture and design has long incorporated biophilic principles, often out of necessity and deep cultural connections to the natural world. Many traditional building techniques work in harmony with the local climate and available materials.\n\nExamples include:\n- Courtyards that bring light, air, and greenery into homes\n- Natural material use like clay, wood, and thatch\n- Orientation of buildings to maximize natural ventilation and minimize heat gain\n- Integration of indoor and outdoor living spaces\n- Community layouts that respect and preserve significant natural features',
            duration: '15 min',
            resources: [],
            studyItems: [],
            isLocked: false
          },
          {
            id: 'lesson-3',
            title: 'Module 1 Assessment Quiz',
            type: 'quiz',
            duration: '15 min',
            resources:[],
            studyItems:[],
            content: "Test your knowledge of biophilic design elements and their applications.",
            isLocked: false,
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
              timeLimit: 300
            }
          }
        ],
      },
      {
        id: "module-2",
        title: "Design Patterns and Elements",
        description: "Exploring the various patterns and elements used in biophilic design.",
        lessons: [
          {
            id: "lesson-4",
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
            id: "lesson-5",
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
            id: "lesson-6",
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
            isLocked: false
          },
          {
            id: "lesson-7",
            title: "Assignment: Local Materials Analysis",
            type: "text",
            content: "Research and document locally available natural building materials in your region.",
            duration: "30 min",
            resources: [],
            studyItems: [],
            isLocked: false
          }
        ],
        isLocked: false
      }
    ],
    resources: [
      {
        id: 'resource-1',
        title: 'Biophilic Design Glossary',
        description: 'Key terms and concepts for understanding biophilic design principles',
        type: 'pdf',
        url: '/resources/biophilic-glossary.pdf',
        category:'Reference',
      },
      // ... more resources
      
    ]
  },  
  {
    id: "2",
    title: "Advanced Biophilic Design Applications",
    description: "Take your biophilic design skills to the next level with advanced techniques for complex projects.",
    imageUrl: "https://images.unsplash.com/photo-1545566898-4a44e508aa26",
    image: "https://images.unsplash.com/photo-1545566898-4a44e508aa26",
    modules: [
      {
        id: "module-adv-1",
        title: "Commercial Applications",
        description: "Implementing biophilic design in commercial spaces for productivity and wellbeing.",
        lessons: [
          {
            id: "lesson-adv-1.1",
            title: "Office Space Design",
            type: "video",
            content: "Learn how to transform office environments with biophilic elements that enhance productivity and employee wellbeing.",
            duration: "30 min",
            resources: [],
            studyItems: [],
            isLocked: true
          },
          {
            id: "lesson-adv-1.2",
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
        id: "module-adv-2",
        title: "Urban Planning Integration",
        description: "Scaling biophilic design to urban planning and public spaces.",
        lessons: [
          {
            id: "lesson-adv-2.1",
            title: "Urban Gardens & Green Spaces",
            type: "video",
            duration: "35 min",
            content: "Techniques for integrating natural elements into urban environments to create healthier cities.",
            resources: [],
            studyItems: [],
            isLocked: true
          },
          {
            id: "lesson-4",
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
    imageUrl: 'https://images.unsplash.com/photo-1545566898-4a44e508aa26',
    isLocked: true,
    isFeatured: false,
    tags: ['wellness', 'healthcare', 'interior-design'],
    modules: [
      {
        id: 'module-well-1',
        title: 'Healing Environments',
        description: "Scaling biophilic design to urban planning and public spaces.",
        isLocked: true,
        lessons: [
          {
            id: 'lesson-well-1.1',
            title: 'Evidence-Based Design in Healthcare',
            type: 'video',
            duration: '20 min',
            content: "Techniques for integrating natural elements into urban environments to create healthier cities.",
            resources: [],
            studyItems: [],
            isLocked: true
          }
        ]
      }
    ],
    createdAt: "2024-01-15"
  }];

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
