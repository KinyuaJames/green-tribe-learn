
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Book, FileText, Video, Check, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getCourseById, enrollUserInCourse, isLessonCompleted, markLessonAsCompleted } from '@/utils/database';
import { Course } from '@/data/courses';
import { toast } from 'sonner';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("curriculum");
  
  const course = getCourseById(courseId || '');
  
  useEffect(() => {
    // Calculate progress if the user is enrolled
    if (currentUser && course && currentUser.enrolledCourses.some(c => 
      typeof c === 'string' ? c === course.id : c.id === course.id)) {
      // Count completed lessons
      let totalLessons = 0;
      let completedCount = 0;
      
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          totalLessons++;
          if (currentUser && isLessonCompleted(currentUser.id, lesson.id)) {
            completedCount++;
          }
        });
      });
      
      const calculatedProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
      setProgress(calculatedProgress);
    }
  }, [currentUser, course, selectedLesson]);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-biophilic-earth">Course Not Found</h1>
            <p className="mt-4">The course you're looking for doesn't exist or has been removed.</p>
            <Link to="/courses" className="mt-6 inline-block">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleEnroll = () => {
    if (!currentUser) {
      toast.error('Please log in to enroll in this course');
      navigate('/login');
      return;
    }
    
    setIsEnrolling(true);
    
    try {
      const success = enrollUserInCourse(currentUser.id, course.id);
      
      if (success) {
        toast.success('Successfully enrolled in course!');
        navigate('/dashboard');
      } else {
        toast.error('You are already enrolled in this course');
      }
    } catch (error) {
      toast.error('Failed to enroll in course');
    } finally {
      setIsEnrolling(false);
    }
  };

  // Safe check if user is enrolled - prevents errors when currentUser is null
  const isEnrolled = currentUser ? 
    currentUser.enrolledCourses.some(c => typeof c === 'string' ? c === course.id : c.id === course.id) : false;
  
  const handleLessonClick = (lessonId: string, isLocked: boolean | undefined) => {
    if (!isEnrolled) {
      toast.error('Please enroll in the course to access lessons');
      return;
    }
    
    if (isLocked) {
      toast.error('This lesson is locked. Complete previous lessons to unlock it.');
      return;
    }
    
    // Navigate to the lesson page
    navigate(`/course/${course.id}/lesson/${lessonId}`);
    
    // Mark lesson as completed when user views it
    if (currentUser) {
      markLessonAsCompleted(currentUser.id, lessonId);
    }
  };
  
  const handleVoiceSubmission = (audioBlob: Blob) => {
    // In a real app, you'd upload this to your storage/database
    toast.success('Voice note recorded successfully! It has been added to your study gallery.');
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) {
      toast.success(`Congratulations! You passed the quiz with a score of ${score}!`);
    } else {
      toast.error(`You didn't pass the quiz. Keep learning and try again!`);
    }
  };
  
  // Check if this is a paid course that requires payment to access
  const isPaidAndLocked = !course.isFree && course.isLocked;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-biophilic-earth leading-tight">
                {course.title}
              </h1>
              
              <p className="mt-4 text-lg text-foreground/80">
                {course.description}
              </p>
              
              <div className="flex items-center mt-6 space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={course.instructorImage} alt={course.instructor} />
                  <AvatarFallback>{course.instructor?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Created by</p>
                  <p className="text-biophilic-earth font-medium">{course.instructor}</p>
                </div>
              </div>
              
              {isEnrolled && (
                <div className="mt-6 bg-white rounded-lg p-4 border">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Your Progress</p>
                    <p className="text-sm text-biophilic-earth">{Math.round(progress)}% Complete</p>
                  </div>
                  <Progress value={progress} className="h-2.5 bg-muted" />
                </div>
              )}
              
              {isEnrolled && (
                <div className="mt-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="discussions">Discussions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="curriculum" className="p-4 border rounded-md mt-2">
                      {course.modules.map((module, moduleIndex) => (
                        <div key={module.id} className="mb-6 last:mb-0">
                          <h3 className="text-lg font-semibold mb-2">
                            Module {moduleIndex + 1}: {module.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                          
                          <div className="space-y-2">
                            {module.lessons.map((lesson) => {
                              const isCompleted = currentUser && isLessonCompleted(currentUser.id, lesson.id);
                              return (
                                <div 
                                  key={lesson.id} 
                                  className={`p-3 border rounded-md flex justify-between items-center cursor-pointer ${
                                    isCompleted ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-muted/20'
                                  } ${lesson.isLocked ? 'opacity-70' : ''}`}
                                  onClick={() => handleLessonClick(lesson.id, lesson.isLocked)}
                                >
                                  <div className="flex items-center">
                                    {lesson.type === 'video' ? (
                                      <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                                    ) : (
                                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                    )}
                                    <div>
                                      <p className="text-sm font-medium">{lesson.title}</p>
                                      <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                    </div>
                                  </div>
                                  <div>
                                    {lesson.isLocked ? (
                                      <Lock className="h-4 w-4 text-muted-foreground" />
                                    ) : isCompleted ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Book className="h-4 w-4 text-biophilic-earth" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="resources" className="p-4 border rounded-md mt-2">
                      {course.resources && course.resources.length > 0 ? (
                        <div className="space-y-4">
                          {course.resources.map(resource => (
                            <div key={resource.id} className="p-3 border rounded-md">
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                              <a 
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-biophilic-earth hover:underline inline-flex items-center"
                              >
                                Access Resource
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">No resources available for this course</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="discussions" className="p-4 border rounded-md mt-2">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">Join the discussion with other students and instructors</p>
                        <Button 
                          onClick={() => navigate(`/course/${course.id}/discussion`)}
                          className="bg-biophilic-earth hover:bg-biophilic-earth/90"
                        >
                          View Discussions
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <div className="aspect-video rounded-md overflow-hidden mb-6">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-biophilic-clay">
                    {course.isFree ? 'FREE' : `KES ${course.price}`}
                  </div>
                  
                  {isPaidAndLocked && !isEnrolled && (
                    <Badge className="bg-yellow-500 text-white">Payment Required</Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  {isEnrolled ? (
                    <Link to="/dashboard">
                      <Button className="w-full bg-biophilic-leaf hover:bg-biophilic-leaf/90">
                        Continue Learning
                      </Button>
                    </Link>
                  ) : isPaidAndLocked ? (
                    <Alert variant="default" className="mb-4 border-yellow-500">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <AlertTitle>Payment Features Coming Soon</AlertTitle>
                      <AlertDescription>
                        This is a premium course that will be available for purchase soon.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Button 
                      onClick={handleEnroll} 
                      disabled={isEnrolling}
                      className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90"
                    >
                      {isEnrolling ? 'Processing...' : course.isFree ? 'Enroll for Free' : 'Enroll Now'}
                    </Button>
                  )}
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">{course.level || 'All Levels'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{course.studentsCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="font-medium">{course.modules.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
