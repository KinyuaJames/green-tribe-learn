
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getStudyGallery, deleteStudyItem } from '@/utils/database/users';
import { FileText, Image, Mic, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const StudyGallery = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [studyItems, setStudyItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    if (currentUser) {
      const items = getStudyGallery(currentUser.id);
      setStudyItems(items);
    } else {
      // Redirect to login if not logged in
      toast.error('Please log in to view your study gallery');
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  const handleDeleteItem = (itemId: string) => {
    if (currentUser && deleteStudyItem(currentUser.id, itemId)) {
      setStudyItems(prevItems => prevItems.filter(item => item.id !== itemId));
      toast.success('Item deleted successfully');
    } else {
      toast.error('Failed to delete item');
    }
  };
  
  const filteredItems = activeTab === 'all' 
    ? studyItems 
    : studyItems.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-biophilic-earth mb-6 text-center">
            My Study Gallery
          </h1>
          <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
            Access your notes, voice recordings, and images collected during your learning journey.
          </p>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white">
                  All Items
                </TabsTrigger>
                <TabsTrigger value="note" className="rounded-md data-[state=active]:bg-white">
                  <FileText className="mr-2 h-4 w-4" /> Notes
                </TabsTrigger>
                <TabsTrigger value="voice" className="rounded-md data-[state=active]:bg-white">
                  <Mic className="mr-2 h-4 w-4" /> Voice Notes
                </TabsTrigger>
                <TabsTrigger value="image" className="rounded-md data-[state=active]:bg-white">
                  <Image className="mr-2 h-4 w-4" /> Images
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="space-y-6">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      {item.type === 'image' && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={item.content} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-biophilic-earth">{item.title}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteItem(item.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                        <CardDescription>
                          {item.moduleId ? (
                            <>From: {item.moduleName}</>
                          ) : (
                            <>Personal Study Material</>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {item.type === 'note' && (
                          <p className="whitespace-pre-wrap text-foreground/80">
                            {item.content.length > 100 
                              ? `${item.content.substring(0, 100)}...` 
                              : item.content}
                          </p>
                        )}
                        {item.type === 'voice' && (
                          <div className="flex justify-center py-2">
                            <audio controls src={item.content} className="w-full">
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        {item.type === 'note' && (
                          <Button variant="outline" size="sm">
                            View Full Note
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  {activeTab === 'all' ? (
                    <>
                      <div className="flex justify-center gap-4 mb-4">
                        <FileText className="h-10 w-10 text-muted-foreground/70" />
                        <Mic className="h-10 w-10 text-muted-foreground/70" />
                        <Image className="h-10 w-10 text-muted-foreground/70" />
                      </div>
                      <h3 className="text-xl font-semibold text-biophilic-earth mb-2">
                        Your Study Gallery is Empty
                      </h3>
                    </>
                  ) : (
                    <>
                      {activeTab === 'note' && <FileText className="h-16 w-16 mx-auto text-muted-foreground/70 mb-4" />}
                      {activeTab === 'voice' && <Mic className="h-16 w-16 mx-auto text-muted-foreground/70 mb-4" />}
                      {activeTab === 'image' && <Image className="h-16 w-16 mx-auto text-muted-foreground/70 mb-4" />}
                      <h3 className="text-xl font-semibold text-biophilic-earth mb-2">
                        No {activeTab === 'note' ? 'Notes' : activeTab === 'voice' ? 'Voice Notes' : 'Images'} Found
                      </h3>
                    </>
                  )}
                  <p className="text-muted-foreground mb-6">
                    Start creating study materials as you learn in your courses
                  </p>
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="bg-biophilic-earth hover:bg-biophilic-earth/90"
                  >
                    Explore Courses
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudyGallery;
