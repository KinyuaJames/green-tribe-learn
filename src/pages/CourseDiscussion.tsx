
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Discussion from '@/components/Discussion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import {
  getCourseById,
  getCourseDiscussions,
  createDiscussionThread,
  addDiscussionMessage
} from '@/utils/database';
import { DiscussionMessage, DiscussionThread, Course } from '@/utils/database/types';

const CourseDiscussion = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [discussions, setDiscussions] = useState<DiscussionThread[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const [isAddingMessage, setIsAddingMessage] = useState(false);
  
  useEffect(() => {
    if (courseId) {
      const fetchedCourse = getCourseById(courseId);
      setCourse(fetchedCourse);
      
      if (fetchedCourse) {
        const fetchedDiscussions = getCourseDiscussions(courseId);
        setDiscussions(fetchedDiscussions);
      }
    }
  }, [courseId]);
  
  const handleCreateThread = async () => {
    if (!currentUser) {
      toast.error('Please log in to create a discussion thread');
      return;
    }
    
    if (!newThreadTitle.trim()) {
      toast.error('Please enter a title for the thread');
      return;
    }
    
    setIsCreatingThread(true);
    
    try {
      // Initial message content for the thread
      const initialMessage = "Let's discuss this topic!";
      
      // Create the discussion thread with proper types
      const newThread = createDiscussionThread({
        courseId: courseId || '',
        title: newThreadTitle,
        studentId: currentUser.id,
        studentName: currentUser.name || currentUser.email,
        message: initialMessage,
        userRole: 'student'
      });
      
      // TypeScript-safe way to update the array
      setDiscussions(prevDiscussions => [...prevDiscussions, newThread]);
      setNewThreadTitle('');
      toast.success('Discussion thread created successfully!');
      
    } catch (error) {
      toast.error('Failed to create discussion thread');
    } finally {
      setIsCreatingThread(false);
    }
  };
  
  const handleAddMessage = async (threadId: string) => {
    if (!currentUser) {
      toast.error('Please log in to add a message');
      return;
    }
    
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    setIsAddingMessage(true);
    
    try {
      // Add the discussion message with proper types
      const newMessageObj = addDiscussionMessage({
        threadId,
        userId: currentUser.id,
        userName: currentUser.name || currentUser.email,
        content: newMessage,
        userRole: 'student'
      });
      
      // Update the discussions state in a type-safe way
      setDiscussions(prevDiscussions => 
        prevDiscussions.map(thread => {
          if (thread.id === threadId) {
            return {
              ...thread,
              messages: [...thread.messages, newMessageObj]
            };
          }
          return thread;
        })
      );
      
      setNewMessage('');
      toast.success('Message added successfully!');
      
    } catch (error) {
      toast.error('Failed to add message');
    } finally {
      setIsAddingMessage(false);
    }
  };
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-biophilic-earth mb-4">
                Course Not Found
              </h1>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                The course you are looking for does not exist.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto">
          <Breadcrumb>
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
                {course.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              Discussion
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-biophilic-earth mb-4">
              {course.title} Discussion
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Share your thoughts, ask questions, and connect with fellow learners.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-biophilic-earth mb-4">
              Start a New Discussion
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter thread title"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                className="flex-grow"
              />
              <Button
                onClick={handleCreateThread}
                disabled={isCreatingThread}
                className="bg-biophilic-earth hover:bg-biophilic-earth/90"
              >
                {isCreatingThread ? 'Creating...' : 'Create Thread'}
              </Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-biophilic-earth mb-4">
              Existing Discussions
            </h2>
            {discussions.length > 0 ? (
              discussions.map((thread) => (
                <div key={thread.id} className="mb-8 border rounded-md p-4">
                  <h3 className="text-xl font-semibold text-biophilic-earth mb-2">
                    {thread.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Started by {thread.studentName}
                  </p>
                  
                  <Discussion
                    discussionMessages={thread.messages}
                  />
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <Textarea
                      rows={3}
                      placeholder="Enter your message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAddMessage(thread.id)}
                      disabled={isAddingMessage}
                      className="bg-biophilic-earth hover:bg-biophilic-earth/90"
                    >
                      {isAddingMessage ? 'Adding Message...' : 'Add Message'}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-biophilic-earth mb-4">
                  No discussions yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Be the first to start a discussion!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDiscussion;
