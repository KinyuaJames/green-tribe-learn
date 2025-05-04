
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="hero-section py-20 lg:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-biophilic-earth mb-6">
            Rooted in Culture. Built for Nature.
            <span className="block text-biophilic-leaf">Designed for the Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our community of learners reconnecting with indigenous knowledge
            and sustainable practices to build an African Biophilia Empire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white px-8 py-6 text-lg">
                Explore Courses
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white px-8 py-6 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
