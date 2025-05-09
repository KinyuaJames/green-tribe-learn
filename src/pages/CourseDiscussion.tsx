import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { getCourseById } from '@/data/courses';
import { toast } from 'sonner';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
}

const CourseDiscussion = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const fetchedCourse = getCourseById(courseId);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
        
        // In a real app, you would fetch comments from an API
        // This is mock data for demonstration
        setComments([
          {
            id: '1',
            userId: 'user1',
            userName: 'Sarah Johnson',
            userAvatar: '/avatars/sarah.jpg',
            content: 'I found the section on traditional cooling techniques particularly useful. Has anyone tried implementing the courtyard design in a modern context?',
            timestamp: new Date('2023-06-15T10:30:00'),
            likes: 5,
            replies: [
              {
                id: '1-1',
                userId: 'user2',
                userName: 'Michael Okafor',
                userAvatar: '/avatars/michael.jpg',
                content: 'Yes! I incorporated a modified courtyard in my recent project in Lagos. It works amazingly well for air circulation.',
                timestamp: new Date('2023-06-15T14:22:00'),
                likes: 3,
              }
            ]
          },
          {
            id: '2',
            userId: 'user3',
            userName: 'Amina Diallo',
            userAvatar: '/avatars/amina.jpg',
            content: 'The materials section could use more information about sourcing sustainable alternatives when traditional materials aren\'t available. Otherwise, great course!',
            timestamp: new Date('2023-06-14T08:15:00'),
            likes: 2,
            replies: []
          }
        ]);
      } else {
        toast.error('Course not found');
        navigate('/courses');
      }
      setIsLoading(false);
    }
  }, [courseId, navigate]);

  const handleCommentSubmit = () => {
    if (!currentUser) {
      toast.error('Please log in to comment');
      return;
    }
    
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    // In a real app, you would send this to an API
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name || currentUser.email,
      userAvatar: currentUser.avatar,
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    toast.success('Comment posted successfully');
  };

  const handleReplySubmit = (commentId: string) => {
    if (!currentUser) {
      toast.error('Please log in to reply');
      return;
    }
    
    const replyContent = replyText[commentId];
    if (!replyContent || !replyContent.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }
    
    // In a real app, you would send this to an API
    const reply: Reply = {
      id: `reply-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name || currentUser.email,
      userAvatar: currentUser.avatar,
      content: replyContent,
      timestamp: new Date(),
      likes: 0
    };
    
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, reply] } 
          : comment
      )
    );
    
    // Clear the reply input and close the reply form
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
    setReplyingTo(null);
    toast.success('Reply posted successfully');
  };

  const handleLike = (commentId: string, isReply = false, replyId?: string) => {
    if (!currentUser) {
      toast.error('Please log in to like comments');
      return;
    }
    
    if (isReply && replyId) {
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId 
            ? { 
                ...comment, 
                replies: comment.replies.map(reply => 
                  reply.id === replyId 
                    ? { ...reply, likes: reply.likes + 1 } 
                    : reply
                ) 
              } 
            : comment
        )
      );
    } else {
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, likes: comment.likes + 1 } 
            : comment
        )
      );
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-36 pb-16 px-4">
          <div className="container mx-auto">
            <p className="text-center">Loading discussion...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                {course?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              Discussion
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-biophilic-earth mb-2">
              Course Discussion: {course?.title}
            </h1>
            <p className="text-foreground/70">
              Share your thoughts, ask questions, and connect with other learners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Join the Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Share your thoughts or questions about this course..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleCommentSubmit}
                        disabled={!currentUser || !newComment.trim()}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Card key={comment.id} className="border-biophilic-sand/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={comment.userAvatar} />
                            <AvatarFallback>{comment.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium">{comment.userName}</h3>
                              <span className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</span>
                            </div>
                            <p className="text-foreground/80 mb-3">{comment.content}</p>
                            <div className="flex items-center gap-4 mb-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs h-auto py-1"
                                onClick={() => handleLike(comment.id)}
                              >
                                👍 {comment.likes}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs h-auto py-1"
                                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                              >
                                Reply
                              </Button>
                            </div>
                            
                            {/* Reply form */}
                            {replyingTo === comment.id && (
                              <div className="mb-4 pl-4 border-l-2 border-biophilic-sand/20">
                                <Textarea 
                                  placeholder="Write your reply..." 
                                  value={replyText[comment.id] || ''}
                                  onChange={(e) => setReplyText({...replyText, [comment.id]: e.target.value})}
                                  className="min-h-[80px] mb-2"
                                />
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setReplyingTo(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleReplySubmit(comment.id)}
                                    disabled={!replyText[comment.id]?.trim()}
                                  >
                                    Post Reply
                                  </Button>
                                </div>
                              </div>
                            )}
                            
                            {/* Replies */}
                            {comment.replies.length > 0 && (
                              <div className="pl-4 border-l-2 border-biophilic-sand/20 space-y-4 mt-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="pt-4">
                                    <div className="flex items-start gap-3">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={reply.userAvatar} />
                                        <AvatarFallback>{reply.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                          <h4 className="font-medium text-sm">{reply.userName}</h4>
                                          <span className="text-xs text-muted-foreground">{formatDate(reply.timestamp)}</span>
                                        </div>
                                        <p className="text-sm text-foreground/80 mb-2">{reply.content}</p>
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="text-xs h-auto py-1"
                                          onClick={() => handleLike(comment.id, true, reply.id)}
                                        >
                                          👍 {reply.likes}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Be the first to start the discussion!</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>About This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Instructor</h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={course?.instructor?.avatar} />
                          <AvatarFallback>{course?.instructor?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{course?.instructor?.name}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Course Progress</h3>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-biophilic-earth h-2.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground">45% complete</p>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/course/${courseId}`)}
                      >
                        Return to Course
                      </Button>
                    </div>
                  </div>
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
