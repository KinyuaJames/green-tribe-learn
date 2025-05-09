
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Discussion from '@/components/Discussion';
import { 
  DiscussionPost,
  getDiscussionPosts, 
  createDiscussionPost, 
  addReplyToPost, 
  likePost 
} from '@/utils/discussionUtils';
import { toast } from 'sonner';

const Tribe = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  
  useEffect(() => {
    // Load the posts when the component mounts
    setPosts(getDiscussionPosts());
  }, []);
  
  const handleNewPost = (content: string) => {
    if (!currentUser) {
      toast.error('Please log in to post');
      return;
    }
    
    try {
      const newPost = createDiscussionPost(currentUser.id, content);
      setPosts(prevPosts => [...prevPosts, newPost]);
      toast.success('Post created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create post');
    }
  };
  
  const handleNewReply = (postId: string, content: string) => {
    if (!currentUser) {
      toast.error('Please log in to reply');
      return;
    }
    
    try {
      const reply = addReplyToPost(postId, currentUser.id, content);
      if (reply) {
        // Refresh the posts
        setPosts(getDiscussionPosts());
        toast.success('Reply added successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add reply');
    }
  };
  
  const handleLike = (postId: string) => {
    if (!currentUser) {
      toast.error('Please log in to like posts');
      return;
    }
    
    try {
      const success = likePost(postId);
      if (success) {
        // Refresh the posts
        setPosts(getDiscussionPosts());
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to like post');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 pattern-bg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-biophilic-earth mb-8 text-center">
            Biophilic Tribe
          </h1>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto text-center mb-16">
            Join our community of like-minded individuals passionate about African biophilic design, 
            indigenous knowledge, and sustainable practices.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-biophilic-earth">Community Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <Discussion 
                    posts={posts} 
                    onNewPost={handleNewPost} 
                    onNewReply={handleNewReply}
                    onLike={handleLike}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-biophilic-earth">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-foreground/80">
                    <li>Be respectful of all community members.</li>
                    <li>Share knowledge and experiences freely.</li>
                    <li>Give credit when referencing others' work.</li>
                    <li>Ask questions and be open to learning.</li>
                    <li>Support others in their learning journey.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-biophilic-earth">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    Stay tuned for upcoming workshops, webinars, and community meet-ups.
                  </p>
                  <div className="bg-muted/50 border border-biophilic-sand/30 rounded-md p-4 text-center">
                    <p className="text-foreground/70">No events scheduled yet.</p>
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

export default Tribe;
