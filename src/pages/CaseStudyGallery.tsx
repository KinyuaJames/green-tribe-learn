import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getCaseStudies, addCaseStudy } from '@/utils/database';
import type { CaseStudy } from '@/utils/database/types';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  author: string;
  authorId: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  location: string;
  year: number;
}

const CaseStudyGallery = () => {
  const { currentUser } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Get only published case studies
    const studies = getCaseStudies().filter(study => study.published);
    setCaseStudies(studies);
  }, []);
  
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImages(e.target.files);
      
      // Generate preview URLs
      const urls = [];
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push(URL.createObjectURL(e.target.files[i]));
      }
      setPreviewUrls(urls);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please log in to submit a case study');
      return;
    }
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    
    if (!location.trim()) {
      toast.error('Please enter a location');
      return;
    }
    
    if (!selectedImages || selectedImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd upload images to cloud storage
      // and get back URLs to store in the database
      const imageUrls = previewUrls;
      
      // Convert tags string to array
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Add the case study
      addCaseStudy({
        title,
        description,
        location,
        year,
        images: imageUrls,
        tags: tagsArray,
        authorId: currentUser.id,
        author: currentUser.name || currentUser.email
      });
      
      toast.success('Case study submitted successfully! It will be reviewed by an instructor.');
      
      // Reset form
      setTitle('');
      setDescription('');
      setTags('');
      setLocation('');
      setYear(new Date().getFullYear());
      setSelectedImages(null);
      setPreviewUrls([]);
      
    } catch (error) {
      toast.error('Failed to submit case study');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-biophilic-earth mb-4">
              Biophilic Case Study Gallery
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Explore real-world examples of biophilic design principles in architecture, interiors, and landscapes.
            </p>
          </div>
          
          <div className="flex justify-end mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                  Submit Case Study
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Submit a Biophilic Case Study</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Eastgate Centre: Biomimicry in Zimbabwe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the biophilic elements and their impact..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="location" className="block text-sm font-medium mb-1">
                        Location
                      </label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Nairobi, Kenya"
                        required
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="year" className="block text-sm font-medium mb-1">
                        Year
                      </label>
                      <Input
                        id="year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        placeholder={new Date().getFullYear().toString()}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1">
                      Tags (comma separated)
                    </label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g., biomimicry, passive cooling, sustainable"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="images" className="block text-sm font-medium mb-1">
                      Images
                    </label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelection}
                      required
                    />
                    
                    {previewUrls.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {previewUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="h-32 w-full object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-biophilic-earth hover:bg-biophilic-earth/90"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {caseStudies.map((study) => (
              <Link 
                to={`/case-study/${study.id}`} 
                key={study.id} 
                className="block transition-transform hover:-translate-y-1"
              >
                <Card className="h-full overflow-hidden">
                  <div className={`aspect-[4/3] overflow-hidden ${study.featured ? 'aspect-[3/4] md:aspect-square' : ''}`}>
                    <img
                      src={study.images[0] || '/placeholder.svg'}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-biophilic-earth">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {study.description}
                    </p>
                    
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <span>{study.location}</span>
                      <span className="mx-2">•</span>
                      <span>{study.year}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {study.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-biophilic-sand/10">
                          {tag}
                        </Badge>
                      ))}
                      {study.tags.length > 3 && (
                        <Badge variant="outline" className="bg-biophilic-sand/10">
                          +{study.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="px-4 py-3 text-xs text-muted-foreground">
                    Submitted by {study.author}
                  </CardFooter>
                </Card>
              </Link>
            ))}
            
            {caseStudies.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg text-biophilic-earth mb-4">
                  No case studies available yet
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Be the first to submit a biophilic design case study!
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                      Submit Case Study
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudyGallery;
