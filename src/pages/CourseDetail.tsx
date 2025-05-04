
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, FileText, Download, Video, Mic, MessageSquare } from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();
  
  // In a real application, you would fetch the course data based on courseId
  const course = {
    id: '1',
    title: 'Biophilic Foundations: Culturally Rooted Design',
    instructor: 'Wangui Mwangi',
    instructorTitle: 'Biophilic Design Advocate & Strategist',
    price: 1000,
    priceUSD: 10,
    duration: '3 hours',
    moduleCount: 3,
    lessonCount: 9,
    description: 'Learn how to incorporate biophilic design principles with a focus on African cultural traditions and sustainable practices.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600',
    modules: [
      {
        id: '1',
        title: 'Understanding Biophilia',
        lessons: [
          {
            id: '1.1',
            title: 'What is Biophilic Design?',
            description: 'The origins and principles of biophilic thinking',
            type: 'video',
            resources: ['video', 'pdf']
          },
          {
            id: '1.2',
            title: 'African Traditions and Nature-Based Living',
            description: 'Overview of indigenous environmental design logic',
            type: 'audio',
            resources: ['audio', 'discussion']
          },
        ],
      },
      {
        id: '2',
        title: 'Principles in Practice',
        lessons: [
          {
            id: '2.1',
            title: 'Case Study – Mlolongo Heritage House',
            description: 'Image gallery + short writeup on natural materials and spatial arrangement',
            type: 'text',
            resources: ['gallery']
          },
          {
            id: '2.2',
            title: 'Designing With the Five Senses',
            description: 'Interactive self-assessment form and downloadable checklist',
            type: 'interactive',
            resources: ['pdf']
          },
        ],
      },
      {
        id: '3',
        title: 'Your Biophilic Design Journey',
        lessons: [
          {
            id: '3.1',
            title: 'Create Your Nature Map',
            description: 'Assignment: Upload image or voice note describing your ideal nature-connected space',
            type: 'assignment',
            resources: ['upload']
          },
          {
            id: '3.2',
            title: 'Reflection & Closing',
            description: 'Written or voice-submitted reflection and certificate completion',
            type: 'reflection',
            resources: ['text']
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Course Header */}
        <div className="bg-biophilic-earth/10 py-8 md:py-12 border-b border-biophilic-sand/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <Badge className="mb-4 bg-biophilic-earth">Course</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-biophilic-earth">{course.title}</h1>
                <p className="text-lg text-foreground/80 mb-6">{course.description}</p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" />
                    <AvatarFallback>WM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-foreground/70">{course.instructorTitle}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{course.moduleCount} Modules</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>{course.lessonCount} Lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Resources</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="aspect-video overflow-hidden rounded-md mb-4">
                      <img 
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-2xl">KES {course.price}</span>
                      <span className="text-sm text-muted-foreground">≈ ${course.priceUSD} USD</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Button className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90">
                      Enroll Now
                    </Button>
                  </CardContent>
                  <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
                    <div className="space-y-2 w-full">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-biophilic-earth" />
                        <span>Lifetime Access</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-biophilic-earth" />
                        <span>Certificate of Completion</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-biophilic-earth" />
                        <span>Downloadable Resources</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Tabs defaultValue="curriculum">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum">
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {course.modules.map(module => (
                  <AccordionItem key={module.id} value={`module-${module.id}`}>
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      <div className="flex items-center">
                        <Badge className="mr-2 bg-biophilic-earth">Module {module.id}</Badge>
                        {module.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-l-2 border-biophilic-sand ml-4 pl-4">
                      <div className="space-y-4">
                        {module.lessons.map(lesson => (
                          <div key={lesson.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Lesson {lesson.id}: {lesson.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {lesson.description}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                {lesson.resources.includes('video') && (
                                  <Video className="h-4 w-4 text-muted-foreground" />
                                )}
                                {lesson.resources.includes('pdf') && (
                                  <Download className="h-4 w-4 text-muted-foreground" />
                                )}
                                {lesson.resources.includes('audio') && (
                                  <Mic className="h-4 w-4 text-muted-foreground" />
                                )}
                                {lesson.resources.includes('discussion') && (
                                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                )}
                                {lesson.resources.includes('text') && (
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="overview">
              <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  In this foundational course on Biophilic Design with an African perspective, you will explore the 
                  rich intersection of traditional ecological knowledge and contemporary sustainable design practices.
                </p>
                <p className="mt-4">
                  Biophilic design reconnects humans with nature in the spaces we live, work, and learn. It draws on 
                  the patterns and principles found in the natural world to promote well-being, creativity, and sustainability.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-3">What You'll Learn</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The core principles of biophilic design and their scientific basis</li>
                  <li>How African communities historically built in harmony with their environment</li>
                  <li>Practical applications of biophilic design in contemporary spaces</li>
                  <li>Methods to assess and enhance the sensory qualities of your spaces</li>
                  <li>Techniques to create your own nature-connected environments</li>
                </ul>
                <h3 className="text-xl font-bold mt-6 mb-3">Course Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No prior design experience required</li>
                  <li>An open mind and willingness to connect with nature</li>
                  <li>Basic materials for optional sketching exercises</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="instructor">
              <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300" />
                    <AvatarFallback>WM</AvatarFallback>
                  </Avatar>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                  <p className="text-foreground/70 mb-4">{course.instructorTitle}</p>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Wangui Mwangi is a TEDx speaker on Biophilia, a Biophilic Design Advocate & Strategist, an EDGE Certified 
                      Green Expert, a Bio-Leadership Fellow, a Nature-Inspired Coach, and Rewild Yourself 2025 Champion. 
                      She is also an experienced Interior Designer.
                    </p>
                    <p className="mt-4">
                      She is passionate about research and the incorporation of African vernacular architecture into 
                      modern design and the interconnectedness between nature and humans. She has previously worked at 
                      Italbuild Imports as an interior designer, at Kenya Green Building Society as a Youth chapter 
                      board member, and as a research and dissemination lead.
                    </p>
                    <p className="mt-4">
                      Wangui holds a bachelor's degree in Art and design from Kenyatta University and an Edge Green 
                      building Certificate from International Finance Corporation.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
              <p className="text-foreground/70">Be the first to leave a review for this course!</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
