
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getUserEnrolledCourses, Course } from '@/utils/database';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, User, Image } from 'lucide-react';
import StudyGallery from '@/components/StudyGallery';
import VoiceRecorder from '@/components/VoiceRecorder';
import { toast } from 'sonner';

// Study gallery item type
interface StudyItem {
  id: string;
  title: string;
  type: 'image' | 'note' | 'voice';
  content: string;
  thumbnail?: string;
  createdAt: string;
}

// Helper function to get study items from localStorage
const getStudyItems = (userId: string): StudyItem[] => {
  const itemsJson = localStorage.getItem(`studyItems_${userId}`);
  return itemsJson ? JSON.parse(itemsJson) : [];
};

// Helper function to save study items to localStorage
const saveStudyItems = (userId: string, items: StudyItem[]) => {
  localStorage.setItem(`studyItems_${userId}`, JSON.stringify(items));
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [studyItems, setStudyItems] = useState<StudyItem[]>([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [isRecording, setIsRecording] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  
  useEffect(() => {
    if (currentUser) {
      const courses = getUserEnrolledCourses(currentUser.id);
      setEnrolledCourses(courses);
      
      // Load study items for the user
      const items = getStudyItems(currentUser.id);
      setStudyItems(items);
    }
  }, [currentUser]);

  const handleAddVoiceNote = (audioBlob: Blob) => {
    if (!currentUser) return;
    
    const audioUrl = URL.createObjectURL(audioBlob);
    const newItem: StudyItem = {
      id: crypto.randomUUID(),
      title: `Voice Note - ${new Date().toLocaleDateString()}`,
      type: 'voice',
      content: audioUrl,
      createdAt: new Date().toISOString()
    };
    
    const updatedItems = [...studyItems, newItem];
    setStudyItems(updatedItems);
    saveStudyItems(currentUser.id, updatedItems);
    toast.success('Voice note added to your study gallery!');
  };
  
  const handleAddTextNote = () => {
    if (!currentUser || !noteTitle.trim() || !noteContent.trim()) {
      toast.error('Please provide both a title and content for your note');
      return;
    }
    
    const newItem: StudyItem = {
      id: crypto.randomUUID(),
      title: noteTitle,
      type: 'note',
      content: noteContent,
      createdAt: new Date().toISOString()
    };
    
    const updatedItems = [...studyItems, newItem];
    setStudyItems(updatedItems);
    saveStudyItems(currentUser.id, updatedItems);
    
    // Reset form
    setNoteTitle('');
    setNoteContent('');
    toast.success('Note added to your study gallery!');
  };
  
  const handleDeleteStudyItem = (itemId: string) => {
    if (!currentUser) return;
    
    const updatedItems = studyItems.filter(item => item.id !== itemId);
    setStudyItems(updatedItems);
    saveStudyItems(currentUser.id, updatedItems);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-biophilic-earth">Welcome, {currentUser?.fullName}</h1>
            <p className="text-foreground/70 mt-2">Your learning dashboard</p>
          </div>
          
          <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <Book className="h-4 w-4" /> My Courses
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Image className="h-4 w-4" /> Study Gallery
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" /> My Profile
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                  <h2 className="text-xl font-semibold text-biophilic-earth flex items-center mb-6">
                    <Book className="mr-2 h-5 w-5" /> My Courses
                  </h2>
                  
                  {enrolledCourses.length === 0 ? (
                    <div className="mt-6 p-8 text-center bg-muted/30 rounded-lg">
                      <p className="text-foreground/70">You haven't enrolled in any courses yet.</p>
                      <Link to="/courses" className="inline-block mt-4">
                        <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                          Browse Courses
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {enrolledCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="md:flex">
                            <div className="md:w-1/3 h-40 md:h-auto">
                              <img 
                                src={course.image} 
                                alt={course.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="md:w-2/3 p-6">
                              <h3 className="text-lg font-semibold">{course.title}</h3>
                              <p className="text-sm text-muted-foreground mt-2">
                                By {course.instructor}
                              </p>
                              <div className="mt-4 flex justify-between items-center">
                                <div>
                                  {/* You can add progress info here */}
                                  <span className="text-sm text-muted-foreground">0% Complete</span>
                                </div>
                                <Link to={`/course/${course.id}`}>
                                  <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                                    Continue Learning
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                  <h2 className="text-xl font-semibold text-biophilic-earth mb-6">Recommended</h2>
                  <div className="mt-4">
                    <Link to="/courses">
                      <Button className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90">
                        Explore More Courses
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="text-biophilic-earth">Study Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StudyGallery 
                        items={studyItems} 
                        onDeleteItem={handleDeleteStudyItem}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-biophilic-earth">Add Voice Note</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <VoiceRecorder onRecordingComplete={handleAddVoiceNote} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-biophilic-earth">Add Text Note</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="note-title" className="text-sm font-medium block mb-1">
                            Note Title
                          </label>
                          <input
                            id="note-title"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter a title for your note"
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="note-content" className="text-sm font-medium block mb-1">
                            Note Content
                          </label>
                          <textarea
                            id="note-content"
                            className="w-full px-3 py-2 border rounded-md min-h-[120px]"
                            placeholder="Write your note here..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                          />
                        </div>
                        <Button
                          className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90"
                          onClick={handleAddTextNote}
                        >
                          Save Note
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-biophilic-earth flex items-center">
                      <User className="mr-2 h-5 w-5" /> My Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="mt-1 text-foreground">{currentUser?.fullName}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">Email</label>
                        <p className="mt-1 text-foreground">{currentUser?.email}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">Member Since</label>
                        <p className="mt-1 text-foreground">
                          {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-biophilic-earth">Learning Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">Enrolled Courses</label>
                        <p className="mt-1 text-foreground text-2xl font-bold">{enrolledCourses.length}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">Study Notes</label>
                        <p className="mt-1 text-foreground text-2xl font-bold">
                          {studyItems.filter(item => item.type === 'note').length}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">Voice Recordings</label>
                        <p className="mt-1 text-foreground text-2xl font-bold">
                          {studyItems.filter(item => item.type === 'voice').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
