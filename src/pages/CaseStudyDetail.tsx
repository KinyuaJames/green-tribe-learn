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
import ImageWithFallback from '@/components/ImageWithFallback';
import MasonryGallery from '@/components/MasonryGallery';

// Generate appropriate number of images with good fallbacks
const generateGalleryImages = (baseImages: string[] = [], minCount: number = 9) => {
  // Use our local fallback as default
  const fallbackImage = '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png';
  
  // Add common high-quality fallbacks that will likely load
  const fallbacks = [
    'https://images.unsplash.com/photo-1531371484131-426e9f5e2b9b', // architectural
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233', // green spaces
    'https://images.unsplash.com/photo-1459716354056-0a13dfe5a756', // plant structure
    'https://images.unsplash.com/photo-1619336107270-f64b713b805b', // natural space
    'https://images.unsplash.com/photo-1515524014198-60918752006c', // biophilic
    fallbackImage
  ];
  
  if (!baseImages || baseImages.length === 0) {
    return fallbacks.concat(Array(Math.max(0, minCount - fallbacks.length)).fill(fallbackImage));
  }
  
  if (baseImages.length >= minCount) {
    return baseImages;
  }
  
  // If we have some images but less than minCount, add fallbacks
  const result = [...baseImages];
  
  // Add fallbacks first
  for (let i = 0; i < fallbacks.length && result.length < minCount; i++) {
    result.push(fallbacks[i]);
  }
  
  // If we still need more, repeat the original images
  let index = 0;
  while (result.length < minCount) {
    result.push(baseImages[index % baseImages.length] || fallbackImage);
    index++;
  }
  
  return result;
};

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
  
  // Prepare gallery images with minimum count
  const galleryImages = generateGalleryImages(caseStudy.images, 9);
  
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
                <ImageWithFallback 
                  src={caseStudy.images[0]} 
                  fallbackSrc1={caseStudy.images[1] || ''} 
                  defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png"
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
                  <MasonryGallery images={galleryImages} columnCount={3} />
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
