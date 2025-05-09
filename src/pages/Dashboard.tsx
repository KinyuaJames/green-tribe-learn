
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, MessageSquare, User, FileText } from 'lucide-react';
import { getStudyGallery } from '@/utils/database/users';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');

  // Get user study items if user is logged in
  const studyItems = currentUser ? getStudyGallery(currentUser.id) : [];

  // Filter study items by type
  const notes = studyItems.filter(item => item.type === 'note');
  const voiceNotes = studyItems.filter(item => item.type === 'voice');
  const images = studyItems.filter(item => item.type === 'image');

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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="courses" className="rounded-md data-[state=active]:bg-white">
                <BookOpen className="mr-2 h-4 w-4" /> My Courses
              </TabsTrigger>
              <TabsTrigger value="certificates" className="rounded-md data-[state=active]:bg-white">
                <Award className="mr-2 h-4 w-4" /> Badges & Certificates
              </TabsTrigger>
              <TabsTrigger value="notes" className="rounded-md data-[state=active]:bg-white">
                <FileText className="mr-2 h-4 w-4" /> Study Notes
              </TabsTrigger>
              <TabsTrigger value="discussions" className="rounded-md data-[state=active]:bg-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Discussions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentUser?.enrolledCourses?.length > 0 ? (
                  currentUser.enrolledCourses.map((courseId, index) => {
                    // Use index as fallback key if courseId isn't a string
                    const courseKey = typeof courseId === 'string' ? courseId : index;
                    // Mock course data for now
                    const course = {
                      id: typeof courseId === 'string' ? courseId : courseId.id,
                      title: courseKey === "1" ? "Biophilic Design Fundamentals" : "Advanced Course",
                      instructor: "Wangui Mwangi",
                      progress: 65,
                      lastLesson: "Traditional Materials in Modern Context",
                      image: "https://images.unsplash.com/photo-1618220179428-22790b461013"
                    };
                    
                    return (
                      <Card key={courseKey} className="overflow-hidden">
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
                    );
                  })
                ) : (
                  <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-muted-foreground/20 bg-muted/5">
                    <div className="text-center space-y-4">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/70" />
                      <div>
                        <h3 className="text-lg font-medium">No Enrolled Courses</h3>
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
                )}
                
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentUser?.badges?.map(badge => (
                  <Card key={badge.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden bg-biophilic-earth/5 flex items-center justify-center">
                      <img 
                        src={badge.imageUrl || badge.image} 
                        alt={badge.title} 
                        className="w-1/2 h-auto"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-biophilic-earth">{badge.title}</CardTitle>
                      <CardDescription>{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Earned on: {new Date(badge.dateEarned || badge.earnedDate).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                
                {currentUser?.certificates?.map(cert => (
                  <Card key={cert.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden bg-biophilic-earth/5 flex items-center justify-center">
                      <Award className="w-1/3 h-auto text-biophilic-earth" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-biophilic-earth">{cert.courseTitle || cert.courseName}</CardTitle>
                      <CardDescription>Issued: {new Date(cert.issueDate).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1"
                          onClick={() => window.open(cert.certificateUrl, '_blank')}>
                          View
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {(!currentUser?.badges?.length && !currentUser?.certificates?.length) && (
                  <Card className="p-8 text-center col-span-full">
                    <CardContent className="pt-6">
                      <Award className="mx-auto h-12 w-12 text-muted-foreground/70 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Badges or Certificates Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Complete a course to earn your first badge or certificate
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
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.length > 0 ? (
                  notes.map(note => (
                    <Card key={note.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-biophilic-earth">{note.title}</CardTitle>
                        <CardDescription>
                          {note.moduleId ? `From: ${note.moduleName}` : 'Personal Note'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground/80 whitespace-pre-wrap">
                          {note.content.length > 100 
                            ? `${note.content.substring(0, 100)}...` 
                            : note.content}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                          <Button variant="outline" size="sm">
                            View Full Note
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-muted-foreground/20 bg-muted/5 col-span-full">
                    <div className="text-center space-y-4">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground/70" />
                      <div>
                        <h3 className="text-lg font-medium">No Study Notes Yet</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Take notes while learning to build your knowledge base
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => navigate('/study-gallery')}
                      >
                        View Study Gallery
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button onClick={() => navigate('/study-gallery')} className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                  View All Study Materials
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {currentUser ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Discussions</CardTitle>
                      <CardDescription>Your contributions to the community</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center py-8">
                        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/70 mb-2" />
                        <p className="text-muted-foreground">
                          Join discussions in your courses or visit the Biophilic Tribe
                        </p>
                      </div>
                      <Button 
                        className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90"
                        onClick={() => navigate('/tribe')}
                      >
                        Visit Biophilic Tribe
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="p-6 text-center">
                    <CardContent className="pt-6">
                      <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/70 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Log in to see your discussions</h3>
                      <p className="text-muted-foreground mb-6">
                        Join our community to participate in discussions
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/login')}
                      >
                        Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
