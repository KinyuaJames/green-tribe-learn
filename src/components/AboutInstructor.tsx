
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';

const AboutInstructor = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-2/5">
            <div className="rounded-lg overflow-hidden border-4 border-biophilic-sand">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Wangui Mwangi" 
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold text-biophilic-earth mb-6">Meet Your Instructor</h2>
            
            <h3 className="text-xl font-semibold text-biophilic-leaf mb-4">Wangui Mwangi</h3>
            
            <div className="space-y-4 text-foreground/80">
              <p>
                Wangui Mwangi is a TEDx speaker on Biophilia, a Biophilic Design Advocate & Strategist, 
                an EDGE Certified Green Expert, a Bio-Leadership Fellow, a Nature-Inspired Coach and 
                Rewild Yourself 2025 Champion. She is also an experienced Interior Designer.
              </p>
              
              <p>
                She is passionate about research and the incorporation of African vernacular 
                architecture into modern design and the interconnectedness between nature and humans.
              </p>
              
              <p>
                She has previously worked at Italbuild Imports as an interior designer, at Kenya Green 
                Building Society as a Youth chapter board member, and as a research and dissemination lead. 
                She holds a bachelor's degree in Art and design from Kenyatta University and an Edge Green 
                building Certificate from International Finance Corporation.
              </p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="outline" className="flex items-center gap-2 border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white">
                <Linkedin size={18} />
                Connect on LinkedIn
              </Button>
              
              <Link to="/about">
                <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
                  Learn More About Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInstructor;
