
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-biophilic-clay text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Join our growing community of learners reconnecting with indigenous knowledge 
            and building a sustainable future through biophilic design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-biophilic-clay hover:bg-white/90 px-8 py-6 text-lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zm-24.596 0L12.143 6.485l1.415 1.414 7.9-7.9h-2.83zm16.312 0L41.513 6.485l1.414 1.414-7.9-7.9h-2.83zm-7.9 0L20.857 6.485 19.444 7.9l7.9-7.9h2.828zM24.92 0l5.657 5.657-1.414 1.414L22.092 0h2.83zm15.056 0l5.657 5.657-1.414 1.414L37.15 0h2.83zm-7.9 0l5.657 5.657-1.414 1.414L29.25 0h2.83zm-7.9 0l5.657 5.657-1.414 1.414L21.35 0h2.83zm-7.9 0l5.657 5.657-1.414 1.414L13.45 0h2.83zm32.66 0l5.657 5.657-1.414 1.414L45.1 0h2.83zm-24.62 0l5.657 5.657-1.414 1.414L20.48 0h2.83zm16.412 0l5.657 5.657-1.414 1.414L36.895 0h2.83zm32.55 0l5.657 5.657-1.414 1.414L69.444 0h2.83zm-56.21 0h2.83L5.58 7.071 4.166 5.657 0.51 0zm8.964 0h2.83L7.09 7.071 5.676 5.657 2.02 0zm8.805 0h2.83L15.9 7.071l-1.414-1.414L11.83 0zm8.606 0h2.83l-7.07 7.071-1.415-1.414L20.635 0z" fill="currentColor" fillOpacity="1"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)"></rect>
        </svg>
      </div>
    </section>
  );
};

export default CallToAction;
