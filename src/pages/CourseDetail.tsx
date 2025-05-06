
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { enrollUserInCourse, getCourseById, isLessonCompleted, markLessonAsCompleted } from '@/utils/database';
import { toast } from 'sonner';
import VoiceRecorder from '@/components/VoiceRecorder';
import Quiz from '@/components/Quiz';
import ResourceVault from '@/components/ResourceVault';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Lock, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  const course = getCourseById(courseId || '');
  
  useEffect(() => {
    // Calculate progress if the user is enrolled
    if (currentUser && course && currentUser.enrolledCourses.includes(course.id)) {
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
  const isEnrolled = currentUser ? currentUser.enrolledCourses.includes(course.id) : false;
  
  const handleLessonClick = (lessonId: string, isLocked: boolean | undefined) => {
    if (!isEnrolled) {
      toast.error('Please enroll in the course to access lessons');
      return;
    }
    
    if (isLocked) {
      toast.error('This lesson is locked. Complete previous lessons to unlock it.');
      return;
    }
    
    // Navigate to the lesson page instead of showing modal
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
      
      <div className="bg-biophilic-earth/5 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
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
                  <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
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
      </div>
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <Tabs defaultValue="curriculum">
            <TabsList className="mb-8">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-2xl font-semibold text-biophilic-earth mb-6">Course Content</h2>
                
                <div className="space-y-6">
                  {course.modules.map((module, moduleIndex) => {
                    // Calculate if this module should be locked
                    // First module is always unlocked for enrolled users
                    const isModuleLocked = moduleIndex > 0 && isEnrolled ? 
                      !course.modules[moduleIndex - 1].lessons.every(prevLesson => 
                        currentUser && isLessonCompleted(currentUser.id, prevLesson.id)
                      ) : module.isLocked;
                    
                    return (
                      <div key={module.id} className="border rounded-md overflow-hidden">
                        <div className="bg-muted p-4 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                              Module {moduleIndex + 1}: {module.title}
                            </h3>
                            {isModuleLocked && !isEnrolled && (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {module.lessons.length} lessons
                          </span>
                        </div>
                        
                        <div className="divide-y">
                          {module.lessons.map((lesson, lessonIndex) => {
                            // Calculate if this lesson should be locked
                            // First lesson in first module is always unlocked for enrolled users
                            const isLessonLocked = moduleIndex === 0 && lessonIndex === 0 ? false : 
                              moduleIndex > 0 ? isModuleLocked : 
                              lessonIndex > 0 && isEnrolled ? 
                                !isLessonCompleted(currentUser?.id || '', module.lessons[lessonIndex - 1].id) : 
                                lesson.isLocked;
                            
                            // Safely check if lesson is completed - handles null currentUser
                            const isCompleted = currentUser ? isLessonCompleted(currentUser.id, lesson.id) : false;
                            
                            return (
                              <div key={lesson.id} className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  {isCompleted && (
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                  )}
                                  {isLessonLocked && (
                                    <Lock className="h-5 w-5 text-muted-foreground mr-2" />
                                  )}
                                  <div>
                                    <p className="font-medium">{lesson.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                      {lesson.duration && ` • ${lesson.duration}`}
                                    </p>
                                  </div>
                                </div>
                                
                                {isEnrolled ? (
                                  <Button 
                                    size="sm" 
                                    variant={isLessonLocked ? "outline" : "outline"}
                                    onClick={() => handleLessonClick(lesson.id, isLessonLocked)}
                                    disabled={isPaidAndLocked}
                                    className={isLessonLocked ? "text-muted-foreground" : ""}
                                  >
                                    {isCompleted ? "Review" : isLessonLocked ? "Locked" : "Start"}
                                  </Button>
                                ) : (
                                  <div className="flex items-center text-muted-foreground">
                                    <Lock className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Locked</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              {course.resources ? (
                <ResourceVault resources={course.resources} />
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-border p-6 text-center">
                  <p className="text-muted-foreground">No resources available for this course.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="instructor">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-2xl font-semibold text-biophilic-earth mb-6">About the Instructor</h2>
                
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={course.instructorImage} alt={course.instructor} />
                    <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{course.instructor}</h3>
                    <p className="text-muted-foreground">Biophilic Design Expert</p>
                  </div>
                </div>
                
                <p className="mt-6 text-foreground/80">
                  With years of experience in sustainable design and biophilic principles, {course.instructor} brings a wealth of knowledge to this course. Their approach combines traditional African wisdom with modern sustainability practices.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="discussion">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-2xl font-semibold text-biophilic-earth mb-6">Discussion with Instructor</h2>
                
                {!isEnrolled ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">
                      Enroll in this course to join discussions with the instructor.
                    </p>
                    <Button onClick={handleEnroll} disabled={isEnrolling || isPaidAndLocked}>
                      {isEnrolling ? 'Processing...' : 'Enroll Now'}
                    </Button>
                  </div>
                ) : (
                  <Link to={`/course/${course.id}/discussion`}>
                    <Button variant="outline" className="w-full">
                      View or Start Discussion Thread
                    </Button>
                  </Link>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-2xl font-semibold text-biophilic-earth mb-6">Student Reviews</h2>
                
                <div className="flex items-center mb-8">
                  <div className="text-4xl font-bold text-biophilic-earth mr-4">
                    {course.rating || 4.8}
                  </div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">
                      {'★'.repeat(Math.round(course.rating || 4.8))}
                      {'☆'.repeat(5 - Math.round(course.rating || 4.8))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {course.studentsCount || 235} student ratings
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground italic">
                    No reviews yet. Be the first to leave one!
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
