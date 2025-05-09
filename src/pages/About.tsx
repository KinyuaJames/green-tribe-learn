import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4">
        <section className="py-20 bg-biophilic-sand/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-biophilic-earth mb-8 text-center">
                About Our Vision
              </h1>
              <div className="text-lg text-foreground/80 space-y-6">
                <p>
                  Green Biophilic Living Education is dedicated to building an African Biophilia Empire 
                  through indigenous knowledge, storytelling, sustainability, and cultural design.
                </p>
                <p>
                  Our platform serves as a bridge between traditional African wisdom and contemporary 
                  design practices, creating a meaningful, immersive learning space that reconnects 
                  people with Indigenous knowledge, inspires sustainable building, and celebrates 
                  African biophilic design as both a lifestyle and legacy.
                </p>
                <p>
                  Founded by Wangui Mwangi, a passionate advocate for biophilic design and African 
                  indigenous architecture, our mission is to cultivate a community of practitioners 
                  who understand that truly sustainable design must be rooted in cultural heritage 
                  and natural connection.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-biophilic-earth mb-8">Meet Your Instructor</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden border-4 border-biophilic-sand">
                    <img 
                      src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                      alt="Wangui Mwangi" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold text-biophilic-leaf mb-4">Wangui Mwangi</h3>
                  <div className="text-foreground/80 space-y-4">
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
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-biophilic-sand/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-biophilic-earth mb-8">Our Platform Vision</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-biophilic-leaf mb-3">Community-Centered Learning</h3>
                  <p className="text-foreground/80">
                    Our platform is designed not just as a course delivery system, but as a vibrant 
                    community hub. The Biophilic Tribe creates spaces for learners to interact, share 
                    traditional knowledge, upload project updates, and build meaningful connections.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-biophilic-leaf mb-3">Indigenous Knowledge Repository</h3>
                  <p className="text-foreground/80">
                    We're building an expanding archive of African indigenous design practices, spiritual connections 
                    to nature, and sustainable building techniques. Our goal is to preserve and revitalize these 
                    traditions by making them accessible to contemporary designers and builders.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-biophilic-leaf mb-3">Practical Application</h3>
                  <p className="text-foreground/80">
                    Each course emphasizes hands-on learning and real-world application. Students are encouraged 
                    to develop projects that blend traditional wisdom with modern sustainability practices, 
                    creating spaces that honor both heritage and future needs.
                  </p>
                </div>
                
                <div className="text-center pt-6">
                  <Link to="/courses">
                    <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white px-6 py-2">
                      Explore Our Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
