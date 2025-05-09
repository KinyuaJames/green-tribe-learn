import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
