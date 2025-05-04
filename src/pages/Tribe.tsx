
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Tribe = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 pattern-bg">
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
                  <p className="text-foreground/70 mb-4">
                    This is where our community discussions will appear. Join us to participate in the conversation!
                  </p>
                  
                  <div className="bg-muted/50 border border-biophilic-sand/30 rounded-md p-8 text-center">
                    <p className="text-lg text-biophilic-earth mb-2">Coming Soon!</p>
                    <p className="text-foreground/70">
                      Our community forum is under development and will be available soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-biophilic-earth">Start a Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    Share your thoughts, questions, or insights with the community.
                  </p>
                  <Textarea 
                    placeholder="What's on your mind?" 
                    className="mb-4"
                    disabled
                  />
                  <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white" disabled>
                    Post Discussion
                  </Button>
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
