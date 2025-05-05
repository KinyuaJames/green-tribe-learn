
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export interface DiscussionPost {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  timestamp: string;
  likes: number;
  replies: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  timestamp: string;
}

interface DiscussionProps {
  posts: DiscussionPost[];
  onNewPost: (content: string) => void;
  onNewReply?: (postId: string, content: string) => void;
  onLike?: (postId: string) => void;
}

export const Discussion: React.FC<DiscussionProps> = ({ 
  posts, 
  onNewPost, 
  onNewReply,
  onLike
}) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState<{[key: string]: string}>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { currentUser } = useAuth();
  
  const handlePostSubmit = () => {
    if (!currentUser) {
      toast.error('Please log in to post a discussion');
      return;
    }
    
    if (!newPostContent.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    onNewPost(newPostContent.trim());
    setNewPostContent('');
  };
  
  const handleReplySubmit = (postId: string) => {
    if (!currentUser) {
      toast.error('Please log in to reply');
      return;
    }
    
    if (!replyContent[postId]?.trim()) {
      toast.error('Please enter a reply');
      return;
    }
    
    if (onNewReply) {
      onNewReply(postId, replyContent[postId].trim());
      setReplyContent({...replyContent, [postId]: ''});
      setReplyingTo(null);
    }
  };
  
  const toggleReply = (postId: string) => {
    setReplyingTo(replyingTo === postId ? null : postId);
  };
  
  const handleLike = (postId: string) => {
    if (!currentUser) {
      toast.error('Please log in to like posts');
      return;
    }
    
    if (onLike) {
      onLike(postId);
    }
  };

  return (
    <div className="space-y-6">
      {currentUser && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>{currentUser.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts with the community..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="mb-4"
                />
                <Button 
                  onClick={handlePostSubmit}
                  className="bg-biophilic-earth hover:bg-biophilic-earth/90"
                >
                  Post Discussion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {posts.length === 0 ? (
        <div className="text-center py-10 bg-muted/30 rounded-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/70 mb-2" />
          <p className="text-lg text-biophilic-earth mb-2">No discussions yet</p>
          <p className="text-foreground/70">
            Be the first to start a conversation in our community!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <Card key={post.id} className="border-biophilic-sand/30">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={post.authorImage} />
                    <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{post.authorName}</h4>
                        <p className="text-muted-foreground text-sm">
                          {new Date(post.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="my-3">{post.content}</p>
                    <div className="flex gap-4 mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(post.id)}
                        className="text-muted-foreground hover:text-biophilic-earth"
                      >
                        ❤️ {post.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleReply(post.id)}
                        className="text-muted-foreground hover:text-biophilic-earth"
                      >
                        Reply
                      </Button>
                    </div>
                    
                    {/* Replies */}
                    {post.replies.length > 0 && (
                      <div className="mt-4 pl-6 border-l-2 border-muted space-y-4">
                        {post.replies.map(reply => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.authorImage} />
                              <AvatarFallback>{reply.authorName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex gap-2 items-baseline">
                                <h5 className="font-medium text-sm">{reply.authorName}</h5>
                                <span className="text-muted-foreground text-xs">
                                  {new Date(reply.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Reply Input */}
                    {replyingTo === post.id && currentUser && (
                      <div className="mt-4 pl-6">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyContent[post.id] || ''}
                          onChange={(e) => setReplyContent({
                            ...replyContent, 
                            [post.id]: e.target.value
                          })}
                          className="text-sm mb-2"
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleReplySubmit(post.id)}
                            className="bg-biophilic-earth hover:bg-biophilic-earth/90"
                          >
                            Submit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discussion;
