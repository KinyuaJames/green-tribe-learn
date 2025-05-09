
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import StudyGallery from '@/components/StudyGallery';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CaseStudyGallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

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
              Case Studies
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-biophilic-earth mb-4">
              Biophilic Design Case Studies
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Explore remarkable examples of African biophilic design principles in action, 
              from residential projects to community spaces and institutional buildings.
            </p>
          </div>
          
          <div className="mb-8 text-center">
            <div className="inline-flex flex-wrap justify-center gap-2">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                onClick={() => handleCategoryChange('all')}
                className="rounded-full"
              >
                All
              </Button>
              <Button 
                variant={selectedCategory === 'residential' ? 'default' : 'outline'} 
                onClick={() => handleCategoryChange('residential')}
                className="rounded-full"
              >
                Residential
              </Button>
              <Button 
                variant={selectedCategory === 'commercial' ? 'default' : 'outline'} 
                onClick={() => handleCategoryChange('commercial')}
                className="rounded-full"
              >
                Commercial
              </Button>
              <Button 
                variant={selectedCategory === 'community' ? 'default' : 'outline'} 
                onClick={() => handleCategoryChange('community')}
                className="rounded-full"
              >
                Community
              </Button>
            </div>
          </div>
          
          <StudyGallery category={selectedCategory} />
          
          <div className="mt-12 text-center">
            <Button 
              className="bg-biophilic-earth hover:bg-biophilic-earth/90"
              onClick={() => navigate('/submit-case-study')}
            >
              Submit Case Study
            </Button>
            <p className="mt-3 text-sm text-foreground/70">
              Have you completed a project using biophilic design principles? Share it with our community!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudyGallery;
