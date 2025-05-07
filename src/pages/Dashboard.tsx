
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Achievements from '@/components/Achievements';
import StudyGallery from '@/components/StudyGallery';
import ResourceVault from '@/components/ResourceVault';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Calendar, BookOpen } from 'lucide-react';
import { getUserEnrolledCourses, Course } from '@/utils/database';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState('courses');
  
  useEffect(() => {
    if (currentUser) {
      // Fix: Get course objects directly
      const userCourses = getUserEnrolledCourses(currentUser.id);
      setEnrolledCourses(userCourses);
    }
  }, [currentUser]);

  // Calculate course completion percentage
  const calculateCompletion = (course: Course) => {
    if (!currentUser || !course) return 0;
    
    let totalLessons = 0;
    let completedLessons = 0;
    
    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
      
      module.lessons.forEach(lesson => {
        if (currentUser.completedLessons.includes(lesson.id)) {
          completedLessons++;
        }
      });
    });
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {currentUser && (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-biophilic-earth">Welcome, {currentUser.fullName || currentUser.email}</h1>
                  <p className="text-muted-foreground mt-1">Track your learning journey</p>
                </div>
                
                <div className="flex gap-3">
                  <Link to="/courses">
                    <Button variant="outline" className="border-biophilic-earth text-biophilic-earth">
                      Explore Courses
                    </Button>
                  </Link>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className="w-full md:w-auto mb-6 bg-background border">
                  <TabsTrigger value="courses" className="flex-1 md:flex-auto">My Courses</TabsTrigger>
                  <TabsTrigger value="achievements" className="flex-1 md:flex-auto">Achievements</TabsTrigger>
                  <TabsTrigger value="gallery" className="flex-1 md:flex-auto">Study Gallery</TabsTrigger>
                  <TabsTrigger value="resources" className="flex-1 md:flex-auto">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="mt-0">
                  {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {enrolledCourses.map((course) => (
                        <Card key={course.id} className="flex flex-col">
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="course-card-image"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-biophilic-earth">{course.title}</CardTitle>
                            <CardDescription>By {course.instructor}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{calculateCompletion(course)}%</span>
                            </div>
                            <Progress value={calculateCompletion(course)} className="h-2" />
                            
                            <div className="flex gap-1 items-center text-sm text-muted-foreground mt-4">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Last completed: Module 2 - Lesson 1</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Link to={`/course/${course.id}`} className="w-full">
                              <Button className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90">
                                Continue Learning
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium text-biophilic-earth mb-2">No enrolled courses yet</h3>
                      <p className="text-muted-foreground mb-6">Start your learning journey by exploring our courses</p>
                      <Link to="/courses">
                        <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                          Browse Courses
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="achievements">
                  <Achievements />
                </TabsContent>
                
                <TabsContent value="gallery">
                  <StudyGallery />
                </TabsContent>
                
                <TabsContent value="resources">
                  <ResourceVault />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
