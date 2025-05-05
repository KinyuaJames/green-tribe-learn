
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { enrollUserInCourse, getCourseById } from '@/utils/database';
import { toast } from 'sonner';
import VoiceRecorder from '@/components/VoiceRecorder';

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
      // This is just a placeholder. In a real app, you'd track lesson completion
      setProgress(Math.random() * 100);
    }
  }, [currentUser, course]);
  
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

  const isEnrolled = currentUser?.enrolledCourses.includes(course.id);
  
  const handleLessonClick = (lessonId: string) => {
    if (!isEnrolled) {
      toast.error('Please enroll in the course to access lessons');
      return;
    }
    
    setSelectedLesson(lessonId);
  };
  
  const handleVoiceSubmission = (audioBlob: Blob) => {
    // In a real app, you'd upload this to your storage/database
    toast.success('Voice note recorded successfully! It has been added to your study gallery.');
  };
  
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
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="bg-biophilic-earth h-2.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
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
                  <div className="text-2xl font-bold text-biophilic-clay">KES {course.price}</div>
                </div>
                
                <div className="space-y-4">
                  {isEnrolled ? (
                    <Link to="/dashboard">
                      <Button className="w-full bg-biophilic-leaf hover:bg-biophilic-leaf/90">
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      onClick={handleEnroll} 
                      disabled={isEnrolling}
                      className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90"
                    >
                      {isEnrolling ? 'Processing...' : 'Enroll Now'}
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-2xl font-semibold text-biophilic-earth mb-6">Course Content</h2>
                
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <div key={module.id} className="border rounded-md overflow-hidden">
                      <div className="bg-muted p-4 flex justify-between items-center">
                        <h3 className="font-medium">
                          Module {index + 1}: {module.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {module.lessons.length} lessons
                        </span>
                      </div>
                      
                      <div className="divide-y">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="p-4 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                {lesson.duration && ` • ${lesson.duration}`}
                              </p>
                            </div>
                            
                            {isEnrolled ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleLessonClick(lesson.id)}
                              >
                                View
                              </Button>
                            ) : (
                              <span className="text-sm text-muted-foreground">Locked</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Lesson Modal */}
              {selectedLesson && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                    {(() => {
                      let lesson;
                      let moduleTitle = '';
                      
                      for (const module of course.modules) {
                        const found = module.lessons.find(l => l.id === selectedLesson);
                        if (found) {
                          lesson = found;
                          moduleTitle = module.title;
                          break;
                        }
                      }
                      
                      if (!lesson) return null;
                      
                      return (
                        <>
                          <div className="p-4 border-b flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">{moduleTitle}</p>
                              <h3 className="font-medium">{lesson.title}</h3>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setSelectedLesson(null)}
                            >
                              ✕
                            </Button>
                          </div>
                          
                          <div className="p-6">
                            {lesson.type === 'video' ? (
                              <div className="aspect-video bg-muted flex items-center justify-center mb-6">
                                <p>Video Placeholder</p>
                              </div>
                            ) : null}
                            
                            {lesson.content && (
                              <div className="prose max-w-none mb-6">
                                <p>{lesson.content}</p>
                              </div>
                            )}
                            
                            {(lesson.type === 'assignment' || lesson.type === 'quiz') && (
                              <div className="mt-8">
                                <h4 className="font-medium mb-4">Submit Your Response</h4>
                                
                                {lesson.type === 'assignment' && (
                                  <VoiceRecorder 
                                    onRecordingComplete={handleVoiceSubmission} 
                                    maxDuration={180}
                                  />
                                )}
                                
                                {lesson.type === 'quiz' && (
                                  <div className="bg-muted/30 p-4 rounded-lg">
                                    <p className="mb-4">Quiz coming soon!</p>
                                    <textarea
                                      placeholder="Write your answer here..."
                                      className="w-full px-3 py-2 border rounded-md"
                                      rows={4}
                                    ></textarea>
                                    <Button className="mt-4 bg-biophilic-earth hover:bg-biophilic-earth/90">
                                      Submit Answer
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4 border-t flex justify-between">
                            <Button variant="outline">Previous Lesson</Button>
                            <Button variant="outline" onClick={() => setSelectedLesson(null)}>
                              Close
                            </Button>
                            <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                              Next Lesson
                            </Button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="overview">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-2xl font-semibold text-biophilic-earth mb-6">Course Overview</h2>
                <p className="text-foreground/80">{course.description}</p>
                
                {/* Tags */}
                {course.tags && course.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map(tag => (
                        <span key={tag} className="bg-biophilic-sand/20 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
