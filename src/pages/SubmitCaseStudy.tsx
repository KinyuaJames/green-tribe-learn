
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface CaseStudyFormData {
  title: string;
  location: string;
  year: number;
  description: string;
  tags: string;
}

const SubmitCaseStudy = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CaseStudyFormData>();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      if (filesArray.length + images.length > 5) {
        toast.error('You can upload a maximum of 5 images');
        return;
      }
      
      setImages(prev => [...prev, ...filesArray]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const onSubmit = (data: CaseStudyFormData) => {
    if (!currentUser) {
      toast.error('Please log in to submit a case study');
      navigate('/login');
      return;
    }
    
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, you'd upload images and submit data to your server
    setTimeout(() => {
      toast.success('Case study submitted successfully! It will be reviewed by our team.');
      setIsSubmitting(false);
      navigate('/case-studies');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-biophilic-earth mb-6 text-center">
            Submit Your Case Study
          </h1>
          <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
            Share your biophilic design project with our community and contribute to the growing 
            knowledge base of African sustainable design.
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter the title of your project" 
                    {...register('title', { 
                      required: 'Title is required' 
                    })}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="City, Country" 
                      {...register('location', { 
                        required: 'Location is required' 
                      })}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year Completed</Label>
                    <Input 
                      id="year" 
                      type="number" 
                      placeholder="YYYY" 
                      {...register('year', { 
                        required: 'Year is required',
                        min: {
                          value: 1900,
                          message: 'Year must be after 1900'
                        },
                        max: {
                          value: new Date().getFullYear(),
                          message: `Year must not be in the future`
                        }
                      })}
                    />
                    {errors.year && (
                      <p className="text-sm text-red-500">{errors.year.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    rows={6}
                    placeholder="Describe your project, the biophilic elements used, and its impact." 
                    {...register('description', { 
                      required: 'Description is required',
                      minLength: {
                        value: 100,
                        message: 'Please provide at least 100 characters'
                      }
                    })}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input 
                    id="tags" 
                    placeholder="e.g. passive cooling, traditional materials, urban garden" 
                    {...register('tags', { 
                      required: 'At least one tag is required' 
                    })}
                  />
                  {errors.tags && (
                    <p className="text-sm text-red-500">{errors.tags.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="images">Project Images (max 5)</Label>
                  <Input 
                    id="images" 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload high-quality images showing your project. Maximum 5 images.
                  </p>
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={URL.createObjectURL(img)} 
                          alt={`Preview ${index}`}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-biophilic-earth hover:bg-biophilic-earth/90"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Case Study'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitCaseStudy;
