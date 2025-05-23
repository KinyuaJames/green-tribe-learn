import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, FileText, Download, Video, Mic, Upload, MessageSquare, Book } from 'lucide-react';
import { getCourses, Course } from '@/utils/database';
import { useAuth } from '@/contexts/AuthContext';


const Courses = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  const course1 = courses[0];
  console.log(course1);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  useEffect(() => {
    const allCourses = getCourses();
    setCourses(allCourses);
  }, []);

  // Check if user is enrolled in a specific course
  const isEnrolled = (courseId: string) => {
    return currentUser?.enrolledCourses?.includes(courseId) || false;
  };

  // Determine if free badge should be shown
  const shouldShowFreeBadge = (course: Course) => {
    return course.isFree && (!currentUser || !isEnrolled(course.id));
  };

  // Determine price display text
  const getPriceDisplay = (course: Course) => {
    if (isEnrolled(course.id)) {
      return 'ENROLLED';
    } else if (shouldShowFreeBadge(course)) {
      return 'FREE';
    } else {
      return `KES ${course.price}`;
    }
  };
  
  // Handle enrollment clicks when user is not logged in
  const handleEnrollClick = (e: React.MouseEvent, courseId: string) => {
    if (!currentUser) {
      e.preventDefault();
      setShowLoginDialog(true);
    }
  };
  
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-biophilic-earth mb-4">
              Our Courses
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Explore our specialized courses that blend indigenous knowledge with modern sustainability practices.
            </p>
          </div>
          
          <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Login Required</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="mb-4">Please log in to enroll in this course</p>
                <Button onClick={redirectToLogin} className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90">
                  Go to Login
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {courses.map(course => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="course-card-image"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-biophilic-earth">{course.title}</CardTitle>
                    {shouldShowFreeBadge(course) && (
                      <Badge className="bg-green-500">Free</Badge>
                    )}
                  </div>
                  <CardDescription>By {course.instructor} • {course.duration}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4 flex-grow">
                  <p className="text-foreground/80 line-clamp-3">{course.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {course.tags?.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-biophilic-sand/10">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="font-bold text-lg text-biophilic-clay">
                    {getPriceDisplay(course)}
                  </span>
                  <Link 
                    to={`/course/${course.id}`} 
                    onClick={(e) => !isEnrolled(course.id) && handleEnrollClick(e, course.id)}
                  >
                    <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
                      {isEnrolled(course.id) ? 'View Course' : 'Enroll Now'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="bg-biophilic-earth text-white">
                  <CardTitle>Biophilic Foundations: Culturally Rooted Design

                    {/* {course} */}
                  </CardTitle>
                  <CardDescription className="text-white/90">Instructor: Wangui Mwangi</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>3 Modules</span>
                      </div>
                      <Badge variant="outline" className="bg-biophilic-sand/10 text-biophilic-earth">
                        Certificate
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>9 Lessons</span>
                      </div>
                      <span className="text-foreground/70">3 hours</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-2xl">KES 1,000</span>
                      <span className="text-sm text-muted-foreground">≈ $10 USD</span>
                    </div>
                    
                    <Link to="/course/1">
                      <Button className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90">
                        {isEnrolled('1') ? 'Continue Learning' : 'Enroll Now'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-biophilic-earth" />
                      <span>Lifetime Access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-biophilic-earth" />
                      <span>Downloadable Resources</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-biophilic-earth" />
                      <span>Certificate of Completion</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            
            {/* Course Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Course Syllabus</CardTitle>
                  <CardDescription>Discover the journey through biophilic design principles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {/* Module 1 */}
                    <AccordionItem value="module-1">
                      <AccordionTrigger className="text-lg font-medium hover:no-underline">
                        <div className="flex items-center">
                          <Badge className="mr-2 bg-biophilic-earth">Module 1</Badge>
                          Understanding Biophilia
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-l-2 border-biophilic-sand ml-4 pl-4">
                        <div className="space-y-4">
                          {/* Lesson 1.1 */}
                          <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Lesson 1.1: What is Biophilic Design?</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  African Traditions and Nature-Based Living
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Video className="h-4 w-4 text-muted-foreground" />
                                <Download className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Lesson 1.2 */}
                          <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Lesson 1.2: African Traditions and Nature-Based Living</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Overview of indigenous environmental design logic
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Mic className="h-4 w-4 text-muted-foreground" />
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Module 2 */}
                    <AccordionItem value="module-2">
                      <AccordionTrigger className="text-lg font-medium hover:no-underline">
                        <div className="flex items-center">
                          <Badge className="mr-2 bg-biophilic-earth">Module 2</Badge>
                          Principles in Practice
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-l-2 border-biophilic-sand ml-4 pl-4">
                        <div className="space-y-4">
                          {/* Lesson 2.1 */}
                          <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Lesson 2.1: Case Study – Mlolongo Heritage House</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Image gallery + short writeup on natural materials and spatial arrangement
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Lesson 2.2 */}
                          <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Lesson 2.2: Designing With the Five Senses</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Interactive self-assessment form and downloadable checklist
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Download className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Module 3 */}
                    <AccordionItem value="module-3">
                      <AccordionTrigger className="text-lg font-medium hover:no-underline">
                        <div className="flex items-center">
                          <Badge className="mr-2 bg-biophilic-earth">Module 3</Badge>
                          Your Biophilic Design Journey
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-l-2 border-biophilic-sand ml-4 pl-4">
                        <div className="space-y-4">
                          {/* Lesson 3.1 */}
                          <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Lesson 3.1: Create Your Nature Map</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Assignment: Upload image or voice note describing your ideal nature-connected space
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Lesson 3.2 */}
                          <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Lesson 3.2: Reflection & Closing</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Written or voice-submitted reflection and certificate completion
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              
              {/* Course Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Downloads & Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-biophilic-earth" />
                        <span>Biophilic Design Glossary PDF</span>
                      </li>
                      <li className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-biophilic-earth" />
                        <span>5 Senses Biophilic Checklist</span>
                      </li>
                      <li className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-biophilic-earth" />
                        <span>Bonus reading list with TED Talks</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Assessment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-biophilic-earth" />
                        <span>Biophilic Basics Quiz (5 questions)</span>
                      </li>
                      <li className="flex items-center">
                        <Mic className="h-4 w-4 mr-2 text-biophilic-earth" />
                        <span>Voice Note Assignment (3 min max)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-biophilic-earth" />
                        <span>Certificate upon completion</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                <Badge variant="outline" className="bg-biophilic-sand/10">#biophilia</Badge>
                <Badge variant="outline" className="bg-biophilic-sand/10">#african-design</Badge>
                <Badge variant="outline" className="bg-biophilic-sand/10">#nature-architecture</Badge>
                <Badge variant="outline" className="bg-biophilic-sand/10">#green-living</Badge>
              </div>
              
              {/* CTA */}
              <div className="mt-8 flex justify-center">
                <Link to={isEnrolled('1') ? "/course/1" : "/signup"}>
                  <Button size="lg" className="bg-biophilic-earth hover:bg-biophilic-earth/90 px-8">
                    {isEnrolled('1') ? 'Continue Learning' : 'Enroll in this Course'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
