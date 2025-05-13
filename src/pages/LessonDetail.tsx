
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, FileText, MessageSquare, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getCourseById, 
  getLessonById, 
  getModuleByLessonId,
  getNextLesson,
  getPreviousLesson,
  isLessonCompleted,
  markLessonAsCompleted,
  addStudyNote 
} from '@/utils/database';
import { toast } from 'sonner';
import Quiz from '@/components/Quiz';
import VoiceRecorder from '@/components/VoiceRecorder';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';




const LessonDetail = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const course = getCourseById(courseId || '');
  const lesson = getLessonById(lessonId || '');
  const module = getModuleByLessonId(lessonId || '');
  
  const nextLesson = getNextLesson(courseId || '', lessonId || '');
  const previousLesson = getPreviousLesson(courseId || '', lessonId || '');
  
  const isCompleted = currentUser && isLessonCompleted(currentUser.id, lessonId || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(85);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!course || !lesson || !module) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-biophilic-earth">Lesson Not Found</h1>
            <p className="mt-4">The lesson you're looking for doesn't exist or has been removed.</p>
            <Link to={`/course/${courseId}`} className="mt-6 inline-block">
              <Button>Back to Course</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentUser.enrolledCourses.includes(course.id)) {
    useEffect(() => {
      navigate(`/course/${courseId}`);
      toast.error('Please enroll in this course to access lessons');
    }, [navigate, courseId]);
    
    return null;
  }
  
  const handleSaveNote = () => {
    if (!noteTitle.trim()) {
      toast.error('Please add a title for your note');
      return;
    }
    
    if (!note.trim()) {
      toast.error('Please add some content to your note');
      return;
    }
    
    try {
      addStudyNote(currentUser.id, {
        userId: currentUser.id,
        title: noteTitle,
        content: note,
        type: 'note',
        moduleId: module.id,
        moduleName: module.title,
        courseId: course.id,
        lessonId: lesson.id
      });
      
      toast.success('Note saved to your Study Gallery');
      setNote('');
      setNoteTitle('');
    } catch (error) {
      toast.error('Failed to save note');
    }
  };  

  const handleVoiceSubmission = (audioBlob: Blob) => {
    try {
      const audioUrl = URL.createObjectURL(audioBlob);
      
      addStudyNote(currentUser.id, {
        userId: currentUser.id,
        title: `Voice note - ${lesson.title}`,
        content: audioUrl,
        type: 'voice',
        moduleId: module.id,
        moduleName: module.title,
        courseId: course.id,
        lessonId: lesson.id
      });
      
      toast.success('Voice recording saved to your Study Gallery');
      setShowVoiceRecorder(false);
    } catch (error) {
      toast.error('Failed to save voice recording');
    }
  }; 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleImageSubmission = () => {
    if (!selectedImage) {
      toast.error('Please select an image');
      return;
    }
    
    if (!noteTitle.trim()) {
      toast.error('Please add a title for your image');
      return;
    }
    
    try {
      addStudyNote(currentUser.id, {
        userId: currentUser.id,
        title: noteTitle,
        content: previewUrl || '',
        type: 'image',
        moduleId: module.id,
        moduleName: module.title,
        courseId: course.id,
        lessonId: lesson.id
      });
      
      toast.success('Image saved to your Study Gallery');
      setSelectedImage(null);
      setPreviewUrl(null);
      setNoteTitle('');
      setShowImageUpload(false);
    } catch (error) {
      toast.error('Failed to save image');
    }
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) {
      toast.success(`Congratulations! You passed the quiz with a score of ${score}!`);

      if (currentUser && lessonId) {
        markLessonAsCompleted(currentUser.id, lessonId);
      }

      if (lesson.requiresAudioFeedback) {
        setShowVoiceRecorder(true);
        toast.info('Please record your reflection to complete this lesson', {
          duration: 5000
        });
      } else if (nextLesson) {
        setTimeout(() => {
          navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
        }, 2000);
      }
    } else {
      toast.error(`You didn't pass the quiz. Keep learning and try again!`);
    }
  };

  const handleNavigateToPreviousLesson = () => {
    if (previousLesson) {
      navigate(`/course/${courseId}/lesson/${previousLesson.id}`);
    }
  };

  const handleNavigateToNextLesson = () => {
    if (nextLesson) {
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-biophilic-earth/5 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2 text-sm">
            <Link to={`/course/${courseId}`} className="hover:underline text-biophilic-earth">
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-muted-foreground">{module.title}</span>
            <span>/</span>
            <span className="font-medium">{lesson.title}</span>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-8 px-4">
        <div className='container mx-auto'>
          <Breadcrumb className="mb-6 gap-1 flex ">
            <BreadcrumbItem className='cursor-pointer text-biophilic-earth hover:underline flex items-center'>
              <BreadcrumbLink onClick={() => navigate('/')}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem className='cursor-pointer text-biophilic-earth hover:underline flex items-center'>
              <BreadcrumbLink onClick={() => navigate('/courses')}>
                Course-List
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem className='cursor-pointer text-biophilic-earth hover:underline flex items-center'>
              <BreadcrumbLink onClick={() => navigate(`/course/${courseId}`)}>
                Modules
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbItem>
              Current Lesson
            </BreadcrumbItem> */}
          </Breadcrumb>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
            <div className=" lg:col-span-2 container mx-auto max-w-4xl">
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{module.title}</p>
                      <CardTitle className="text-2xl text-biophilic-earth">{lesson.title}</CardTitle>
                    </div>
                    {isCompleted && (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {lesson.type === 'video' && (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                      {lesson.videoUrl ? (
                        <video 
                          controls 
                          className="w-full h-full rounded-lg"
                          src={lesson.videoUrl}
                          poster={lesson.thumbnailUrl || course.image}
                        >
                          Your browser does not support video playback.
                        </video>
                      ) : (
                        <p>Video Placeholder</p>
                      )}
                    </div>
                  )}

                  {lesson.content && (
                    <div className="prose max-w-none">
                      <p>{lesson.content}</p>
                    </div>
                  )}

                  {lesson.type === 'quiz' && lesson.quiz && (
                    <div className="mt-6">
                      <Quiz 
                        quiz={lesson.quiz} 
                        onComplete={handleQuizComplete}
                      />
                    </div>
                  )}

                  {lesson.type === 'assignment' && (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-medium text-xl">Assignment: {lesson.title}</h3>
                      {lesson.content && <p>{lesson.content}</p>}
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Submit Your Response</h4>
                        <VoiceRecorder 
                          onRecordingComplete={handleVoiceSubmission} 
                          maxDuration={180}
                          showSubmitButton={true}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h3 className="text-xl font-medium text-biophilic-earth">Study Notes</h3>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add to Your Study Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex space-x-4 mb-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setShowVoiceRecorder(!showVoiceRecorder);
                            setShowImageUpload(false);
                          }}
                        >
                          <Mic className="mr-2 h-4 w-4" /> Voice Note
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setShowImageUpload(!showImageUpload);
                            setShowVoiceRecorder(false);
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> Upload Image
                        </Button>
                      </div>
                      
                      {showVoiceRecorder && (
                        <div className="mb-4 p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Record Voice Note</h4>
                          <VoiceRecorder 
                            onRecordingComplete={handleVoiceSubmission} 
                            maxDuration={180}
                            showSubmitButton={true}
                          />
                        </div>
                      )}
                      
                      {showImageUpload && (
                        <div className="mb-4 p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Upload Image</h4>
                          <div className="space-y-4">
                            <Input 
                              type="text" 
                              placeholder="Image Title" 
                              value={noteTitle}
                              onChange={(e) => setNoteTitle(e.target.value)}
                            />
                            
                            <Input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            
                            {previewUrl && (
                              <div className="mt-2">
                                <img 
                                  src={previewUrl} 
                                  alt="Preview" 
                                  className="max-h-64 max-w-full mx-auto rounded-md"
                                />
                              </div>
                            )}
                            
                            <Button 
                              type="button" 
                              onClick={handleImageSubmission}
                              disabled={!selectedImage || !noteTitle.trim()}
                            >
                              Save to Gallery
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <Input 
                          type="text" 
                          placeholder="Note Title" 
                          value={noteTitle}
                          onChange={(e) => setNoteTitle(e.target.value)}
                        />
                        
                        <Textarea 
                          placeholder="Write your notes here..." 
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          rows={5}
                          className="resize-none"
                        />
                        
                        <Button 
                          onClick={handleSaveNote}
                          disabled={!noteTitle.trim() || !note.trim()}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Save Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </div>
              
            </div>
            
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-4">Your Progress</h3>
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
                    
                    <div className="mt-6 space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/course/${courseId}/discussion`)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Join Discussion
                      </Button>
                      
                      <Button 
                        className="w-full justify-start bg-biophilic-earth hover:bg-biophilic-earth/90"
                        onClick={() => navigate(`/course/${courseId}`)}
                      >
                        Back to Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-biophilic-earth hover:underline flex items-center">
                          Lesson PDF Transcript
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-biophilic-earth hover:underline flex items-center">
                          Additional Reading Materials
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-biophilic-earth hover:underline flex items-center">
                          Case Study Examples
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      {/* Navigation Footer */}
      <div className="py-4 px-20 border-t grid grid-cols-1 lg:grid-cols-3 justify-items-start">
        <div className="container lg:col-span-2 px-8 mx-auto max-w-4xl ">
          <div className="flex justify-between ">
            <Button 
              variant="outline" 
              onClick={handleNavigateToPreviousLesson}
              disabled={!previousLesson}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            
            <Link to={`/course/${courseId}`}>
              <Button variant="secondary">Back to Course</Button>
            </Link>
            
            <Button 
              onClick={handleNavigateToNextLesson}
              disabled={!nextLesson}
              className={!nextLesson ? 'opacity-50' : 'bg-biophilic-earth hover:bg-biophilic-earth/90'}
            >
              Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate(`/course/${courseId}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={() => navigate(`/course/${courseId}/lesson/next-lesson`)}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div> */}

      <Footer />
    </div>
  );
};export default LessonDetail;




{/* <main className="flex-grow pt-36 pb-16 px-4">
  <div className="container mx-auto">
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-biophilic-earth mb-4">
          Introduction to Biophilic Design Principles
        </h1>
        
        <div className="aspect-video bg-muted mb-8 rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png"
            alt="Lesson video placeholder" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <h2>Overview</h2>
              <p>
                Biophilic design is a concept that aims to increase occupant connectivity to the natural environment through 
                the use of direct and indirect nature, and space and place conditions.
              </p>
              
              <h3>Learning Objectives</h3>
              <ul>
                <li>Understand the core principles of biophilic design</li>
                <li>Recognize the health benefits associated with connecting to nature</li>
                <li>Identify opportunities to incorporate natural elements in design</li>
                <li>Analyze successful case studies of biophilic design in Africa</li>
              </ul>
              
              <h3>Key Concepts</h3>
              <p>
                The concept of biophilia suggests that humans possess an innate tendency to seek connections with nature. 
                Biophilic design seeks to satisfy our innate need to affiliate with nature in modern buildings and cities.
              </p>
              
              <blockquote>
                "Indigenous architecture has always understood the principles of what we now call 'biophilic design.' 
                Traditional building techniques across Africa demonstrate a natural harmony with the environment that modern 
                designers are only now beginning to appreciate fully."
              </blockquote>
              
              <p>
                In the following sections, we will explore how traditional African building techniques incorporated natural 
                elements and created spaces that maintained connection with the surrounding environment.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate(`/course/${courseId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={() => navigate(`/course/${courseId}/lesson/next-lesson`)}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Your Progress</h3>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
              
              <div className="mt-6 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(`/course/${courseId}/discussion`)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Join Discussion
                </Button>
                
                <Button 
                  className="w-full justify-start bg-biophilic-earth hover:bg-biophilic-earth/90"
                  onClick={() => navigate(`/course/${courseId}`)}
                >
                  Back to Course
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-biophilic-earth hover:underline flex items-center">
                    Lesson PDF Transcript
                  </a>
                </li>
                <li>
                  <a href="#" className="text-biophilic-earth hover:underline flex items-center">
                    Additional Reading Materials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-biophilic-earth hover:underline flex items-center">
                    Case Study Examples
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</main> */}