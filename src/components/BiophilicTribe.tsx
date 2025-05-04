
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const BiophilicTribe = () => {
  return (
    <section className="py-16 pattern-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-biophilic-leaf/20">
              <Users size={32} className="text-biophilic-leaf" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-biophilic-earth mb-4">Join the Biophilic Tribe</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Connect with like-minded individuals passionate about African biophilic design, 
            indigenous knowledge, and sustainable practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-sm border-biophilic-sand">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-biophilic-earth mb-3">Community Discussions</h3>
              <p className="text-foreground/80">
                Engage in meaningful conversations about traditional practices, 
                sustainability, and design challenges with peers and experts.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border-biophilic-sand">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-biophilic-earth mb-3">Knowledge Sharing</h3>
              <p className="text-foreground/80">
                Share your projects, insights, and learning experiences while gaining 
                inspiration from others in the community.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border-biophilic-sand">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-biophilic-earth mb-3">Events & Workshops</h3>
              <p className="text-foreground/80">
                Get exclusive invites to virtual and in-person gatherings, workshops, 
                and special learning opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Link to="/tribe">
            <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white px-8 py-6 text-lg">
              Join Our Community
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BiophilicTribe;
