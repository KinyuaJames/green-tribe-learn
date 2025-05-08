
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import InteractiveMap from '@/components/InteractiveMap';
import { useNavigate } from 'react-router-dom';

const IndigenousMap = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              Indigenous Map
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-biophilic-earth mb-4">
              Interactive Map of African Indigenous Design
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Explore traditional architectural techniques, spiritual practices, and materials used by various tribes
              and ethnicities across Africa. Click on markers to learn more about each tradition.
            </p>
          </div>
          
          <div className="mb-12">
            <InteractiveMap />
          </div>
          
          <div className="bg-biophilic-sand/10 p-6 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-biophilic-earth mb-4">About This Project</h2>
              <p className="mb-4">
                This interactive map is a growing repository of indigenous architectural and design knowledge from across the African continent.
                We are documenting vernacular design practices that have evolved over centuries to work harmoniously with local environments, climates, and cultural needs.
              </p>
              <p className="mb-4">
                Each marker represents a different tribal or ethnic group with distinct architectural traditions. 
                Our goal is to preserve and share these sustainable approaches to design, which often provide valuable lessons in creating buildings that respond to their environment without heavy reliance on modern technology.
              </p>
              <p>
                This is an ongoing project, and we welcome contributions from scholars, community members, and design professionals interested in documenting and preserving indigenous design knowledge.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IndigenousMap;
