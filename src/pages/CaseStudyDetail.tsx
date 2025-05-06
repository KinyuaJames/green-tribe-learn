
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { getCaseStudyById } from '@/utils/database';

const CaseStudyDetail = () => {
  const { caseStudyId } = useParams();
  const caseStudy = getCaseStudyById(caseStudyId || '');
  
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-biophilic-earth">Case Study Not Found</h1>
            <p className="mt-4">The case study you're looking for doesn't exist or has been removed.</p>
            <Link to="/case-studies" className="mt-6 inline-block">
              <Button>Back to Gallery</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to="/case-studies" className="inline-flex items-center text-biophilic-earth hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case Studies
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-3xl md:text-4xl font-bold text-biophilic-earth mb-4">
                {caseStudy.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {caseStudy.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-biophilic-sand/10">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                <img 
                  src={caseStudy.images[0]} 
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-foreground/80 whitespace-pre-line">
                        {caseStudy.description}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="gallery" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.images.map((image, index) => (
                      <div 
                        key={index} 
                        className={`rounded-lg overflow-hidden ${
                          index === 0 && caseStudy.images.length % 2 !== 0 ? 'md:col-span-2' : ''
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${caseStudy.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="insights" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Biophilic Design Principles</h3>
                      <ul className="space-y-2 list-disc pl-5 text-foreground/80">
                        <li>Direct connection with nature through visual and physical elements</li>
                        <li>Incorporation of natural materials and textures</li>
                        <li>Natural light optimization for well-being and energy efficiency</li>
                        <li>Biomimicry approaches to solving design challenges</li>
                        <li>Consideration of local climate and ecological context</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-4">Case Study Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted by</p>
                        <div className="flex items-center mt-1">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{caseStudy.author[0]}</AvatarFallback>
                          </Avatar>
                          <span>{caseStudy.author}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Date Added</p>
                        <p>{new Date(caseStudy.createdAt).toLocaleDateString()}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Categories</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {caseStudy.tags.slice(0, 5).map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-biophilic-sand/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Share this Case Study</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
