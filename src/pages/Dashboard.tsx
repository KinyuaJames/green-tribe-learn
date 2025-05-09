import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, MessageSquare, User } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 'course-1',
      title: 'Introduction to African Biophilic Design',
      progress: 65,
      lastLesson: 'Traditional Materials in Modern Context',
      instructor: 'Dr. Amara Okafor',
      image: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    },
    {
      id: 'course-2',
      title: 'Sustainable Building Techniques',
      progress: 30,
      lastLesson: 'Natural Cooling Systems',
      instructor: 'Prof. Kwame Mensah',
      image: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    }
  ];

  // Mock data for certificates
  const certificates = [
    {
      id: 'cert-1',
      title: 'Fundamentals of Biophilic Design',
      issueDate: 'June 15, 2023',
      image: '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
    }
  ];

  // Mock data for discussion activity
  const discussionActivity = [
    {
      id: 'disc-1',
      course: 'Introduction to African Biophilic Design',
      topic: 'Traditional vs Modern Materials',
      lastActivity: '2 days ago',
      unreadReplies: 3
    },
    {
      id: 'disc-2',
      course: 'Sustainable Building Techniques',
      topic: 'Passive Cooling Case Studies',
      lastActivity: '1 week ago',
      unreadReplies: 0
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-biophilic-earth">My Dashboard</h1>
              <p className="text-foreground/70">Welcome back, {currentUser?.name || 'Student'}!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                className="border-biophilic-earth/20 hover:border-biophilic-earth/50 text-biophilic-earth"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="courses" className="rounded-md data-[state=active]:bg-white">
                <BookOpen className="mr-2 h-4 w-4" /> My Courses
              </TabsTrigger>
              <TabsTrigger value="certificates" className="rounded-md data-[state=active]:bg-white">
                <Award className="mr-2 h-4 w-4" /> Certificates
              </TabsTrigger>
              <TabsTrigger value="discussions" className="rounded-md data-[state=active]:bg-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Discussions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-biophilic-earth">{course.title}</CardTitle>
                      <CardDescription>Instructor: {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="text-sm">
                        <span className="text-foreground/70">Last lesson: </span>
                        <span className="font-medium">{course.lastLesson}</span>
                      </div>
                      <Button 
                        className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-muted-foreground/20 bg-muted/5">
                  <div className="text-center space-y-4">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/70" />
                    <div>
                      <h3 className="text-lg font-medium">Discover More Courses</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explore our catalog to find your next learning journey
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => navigate('/courses')}
                    >
                      Browse Courses
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates" className="space-y-6">
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map(cert => (
                    <Card key={cert.id} className="overflow-hidden">
                      <div className="h-40 overflow-hidden bg-biophilic-earth/5 flex items-center justify-center">
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-3/4 h-auto"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-biophilic-earth">{cert.title}</CardTitle>
                        <CardDescription>Issued: {cert.issueDate}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            View
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent className="pt-6">
                    <Award className="mx-auto h-12 w-12 text-muted-foreground/70 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Complete a course to earn your first certificate
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/courses')}
                    >
                      Explore Courses
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-6">
              {discussionActivity.map(discussion => (
                <Card key={discussion.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{discussion.topic}</CardTitle>
                    <CardDescription>{discussion.course}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Last activity: {discussion.lastActivity}
                      </span>
                      {discussion.unreadReplies > 0 && (
                        <span className="bg-biophilic-earth text-white text-xs px-2 py-1 rounded-full">
                          {discussion.unreadReplies} new {discussion.unreadReplies === 1 ? 'reply' : 'replies'}
                        </span>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => navigate(`/course/${discussion.id}/discussion`)}
                    >
                      View Discussion
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="p-6 border-dashed border-2 border-muted-foreground/20 bg-muted/5">
                <CardContent className="p-0 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/70 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Join the Conversation</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with fellow students and instructors in course discussions
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/tribe')}
                  >
                    Visit Biophilic Tribe
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
