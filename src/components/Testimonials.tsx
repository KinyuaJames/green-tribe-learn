
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Kimani',
    title: 'Interior Designer',
    content: 'This course has transformed how I approach design projects. The blend of African biophilic principles with modern sustainability practices is exactly what our industry needs.'
  },
  {
    id: '2',
    name: 'David Ochieng',
    title: 'Architecture Student',
    content: 'As a student, I\'ve always felt disconnected from my cultural roots in design education. This course helped me bridge that gap and see how indigenous knowledge can inform truly sustainable design.'
  },
  {
    id: '3',
    name: 'Amina Hassan',
    title: 'Urban Planner',
    content: 'The community aspect is invaluable. I\'ve connected with professionals across Africa who share my passion for biophilic design and indigenous knowledge integration.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-biophilic-earth/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-biophilic-earth mb-4">Success Stories</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Hear from members of our community who have transformed their approach to design and sustainability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border-biophilic-sand">
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-biophilic-leaf opacity-80" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1.646 13.825 2.228 20.2h5.36c-0.713-3.258 0.16-6.816 2.591-9.312h-2.591c0.792-2.994 3.252-5.584 6.324-6.888h-4.56zM25.109 4c-4.996 3.457-7.706 9.825-7.124 16.2h5.36c-0.713-3.258 0.16-6.816 2.591-9.312h-2.591c0.792-2.994 3.252-5.584 6.324-6.888h-4.56z"></path>
                    </svg>
                  </div>
                  <p className="text-foreground/80 mb-6 flex-grow">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-biophilic-earth">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
