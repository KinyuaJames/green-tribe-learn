
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-biophilic-earth mb-8 text-center">
            Our Courses
          </h1>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto text-center mb-16">
            Explore our specialized courses that blend indigenous knowledge with modern sustainability practices.
          </p>
          
          <div className="text-center py-20">
            <p className="text-2xl text-biophilic-earth mb-4">Course listings coming soon!</p>
            <p className="text-lg text-foreground/80">
              We're preparing a variety of enriching courses for you. Check back soon.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
