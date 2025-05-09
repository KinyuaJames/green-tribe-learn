
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LessonDetail = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(0);
  
  // In a real app, you would fetch the course and lesson data
  // and handle completion status
  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      setProgress(85);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4">
        <div className="container mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/courses')}>
                Courses
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate(`/course/${courseId}`)}>
                Course Name
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              Current Lesson
            </BreadcrumbItem>
          </Breadcrumb>
          
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
      </main>
      
      <Footer />
    </div>
  );
};

export default LessonDetail;
