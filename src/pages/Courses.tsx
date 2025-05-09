import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import CourseGallery from '@/components/CourseGallery';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4">
        <div className="container mx-auto">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              Courses
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-biophilic-earth mb-4">
              Explore Our Biophilic Design Courses
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Unlock the secrets of integrating nature into the built environment with our expert-led courses.
              Learn how to create spaces that enhance well-being, sustainability, and connection to the natural world.
            </p>
          </div>
          
          <CourseGallery />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
