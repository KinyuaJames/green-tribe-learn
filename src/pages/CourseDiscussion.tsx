
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  getCourseById, 
  createDiscussionThread, 
  getCourseDiscussions,
  addDiscussionMessage 
} from '@/utils/database';

interface DiscussionMessage {
  id: string;
  threadId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'instructor';
  content: string;
  createdAt: string;
}

interface DiscussionThread {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  title: string;
  status: 'open' | 'closed';
  createdAt: string;
  lastMessageAt: string;
  messages: DiscussionMessage[];
}

const CourseDiscussion = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [newThreadMessage, setNewThreadMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discussions, setDiscussions] = useState<DiscussionThread[]>([]);
  
  const course = getCourseById(courseId || '');
  
  useEffect(() => {
    if (!currentUser || !courseId) return;
    
    // Get discussions for this course and user
    const courseDiscussions = getCourseDiscussions(courseId);
    
    // Filter to only show discussions that belong to the current user
    const userDiscussions = courseDiscussions.filter(
      thread => thread.studentId === currentUser.id
    );
    
    setDiscussions(userDiscussions);
  }, [courseId, currentUser]);
  
  if (!currentUser) {
    // Redirect to login if not logged in
    useEffect(() => {
      navigate('/login');
      toast.error('Please log in to view discussions');
    }, [navigate]);
    
    return null;
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-biophilic-earth">Course Not Found</h1>
            <p className="mt-4">The course you're looking for doesn't exist or has been removed.</p>
            <Link to="/courses" className="mt-6 inline-block">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Check if user is enrolled in this course
  if (!currentUser.enrolledCourses.includes(course.id)) {
    // Redirect to course page if not enrolled
    useEffect(() => {
      navigate(`/course/${courseId}`);
      toast.error('Please enroll in this course to access discussions');
    }, [navigate, courseId]);
    
    return null;
  }
  
  const handleCreateThread = async () => {
    if (!newThreadMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const threadId = createDiscussionThread({
        courseId: course.id,
        studentId: currentUser.id,
        studentName: currentUser.name || currentUser.email,
        title: `Question about ${course.title}`,
        message: newThreadMessage
      });
      
      if (threadId) {
        toast.success('Discussion thread created!');
        
        // Reset the form
        setNewThreadMessage('');
        
        // Refresh discussions
        const courseDiscussions = getCourseDiscussions(courseId || '');
        const userDiscussions = courseDiscussions.filter(
          thread => thread.studentId === currentUser.id
        );
        
        setDiscussions(userDiscussions);
        
        // Set active thread to the newly created one
        setActiveThreadId(threadId);
      }
    } catch (error) {
      toast.error('Failed to create discussion thread');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSendReply = () => {
    if (!replyMessage.trim() || !activeThreadId) {
      toast.error('Please enter a message');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addDiscussionMessage({
        threadId: activeThreadId,
        userId: currentUser.id,
        userName: currentUser.name || currentUser.email,
        userRole: 'student',
        content: replyMessage
      });
      
      toast.success('Message sent!');
      
      // Reset form
      setReplyMessage('');
      
      // Refresh discussions
      const courseDiscussions = getCourseDiscussions(courseId || '');
      const userDiscussions = courseDiscussions.filter(
        thread => thread.studentId === currentUser.id
      );
      
      setDiscussions(userDiscussions);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Find active discussion thread
  const activeThread = activeThreadId 
    ? discussions.find(thread => thread.id === activeThreadId)
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to={`/course/${courseId}`} className="inline-flex items-center text-biophilic-earth hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Link>
          
          <h1 className="text-3xl font-bold text-biophilic-earth mb-6">
            Discussion with Instructor: {course.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Thread List */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  {discussions.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      You haven't started any discussions yet. Start a new conversation with your instructor.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {discussions.map(thread => (
                        <div
                          key={thread.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${
                            activeThreadId === thread.id
                              ? 'bg-biophilic-earth/10 border-l-4 border-biophilic-earth'
                              : 'hover:bg-muted border-l-4 border-transparent'
                          }`}
                          onClick={() => setActiveThreadId(thread.id)}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm line-clamp-1">
                              {thread.title}
                            </h4>
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(thread.lastMessageAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {thread.messages[thread.messages.length - 1]?.content || 'No messages yet'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Start a New Conversation</h4>
                    <Textarea
                      placeholder="Type your question or message here..."
                      value={newThreadMessage}
                      onChange={e => setNewThreadMessage(e.target.value)}
                      rows={4}
                    />
                    <Button
                      onClick={handleCreateThread}
                      disabled={isSubmitting || !newThreadMessage.trim()}
                      className="bg-biophilic-earth hover:bg-biophilic-earth/90 w-full"
                    >
                      Start Conversation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Conversation View */}
            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {activeThread ? activeThread.title : 'Select or Start a Conversation'}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col">
                  {activeThread ? (
                    <>
                      <div className="flex-grow space-y-4 overflow-y-auto max-h-[50vh] p-2">
                        {activeThread.messages.map(message => (
                          <div 
                            key={message.id} 
                            className={`flex gap-3 ${
                              message.userRole === 'student' ? 'justify-end' : ''
                            }`}
                          >
                            {message.userRole !== 'student' && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-biophilic-earth text-white">
                                  {message.userName[0]}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div 
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.userRole === 'student'
                                  ? 'bg-biophilic-earth/10'
                                  : 'bg-biophilic-leaf/10'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-[10px] text-muted-foreground mt-1 text-right">
                                {new Date(message.createdAt).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                            
                            {message.userRole === 'student' && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {currentUser?.name?.[0] || currentUser?.email?.[0] || 'U'}
                                </AvatarFallback>
                                {currentUser?.avatar && (
                                  <AvatarImage src={currentUser.avatar} />
                                )}
                              </Avatar>
                            )}
                          </div>
                        ))}
                        
                        {activeThread.messages.length === 0 && (
                          <div className="text-center py-6">
                            <p className="text-muted-foreground">
                              Start the conversation by sending a message.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-4 mt-auto">
                        <div className="flex space-x-2">
                          <Textarea
                            placeholder="Type your reply here..."
                            value={replyMessage}
                            onChange={e => setReplyMessage(e.target.value)}
                            rows={2}
                            className="flex-grow"
                          />
                          <Button
                            onClick={handleSendReply}
                            disabled={isSubmitting || !replyMessage.trim()}
                            size="icon"
                            className="h-full bg-biophilic-earth hover:bg-biophilic-earth/90"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center p-6">
                        <p className="text-muted-foreground mb-4">
                          Select a conversation or start a new one to chat with your instructor.
                        </p>
                        
                        {discussions.length > 0 && (
                          <Alert className="mt-4">
                            <AlertDescription>
                              Click on a conversation from the list on the left to view it.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDiscussion;
