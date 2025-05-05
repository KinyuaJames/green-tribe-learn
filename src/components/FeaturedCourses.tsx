
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course, getCourses } from '@/utils/database';
import { useAuth } from '@/contexts/AuthContext';

const CourseCard = ({ course, isEnrolled }: { course: Course, isEnrolled: boolean }) => {
  return (
    <Card className="overflow-hidden border-biophilic-sand hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {course.isFree && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500">Free</Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-biophilic-earth">{course.title}</h3>
        <p className="text-sm text-muted-foreground">By {course.instructor} • {course.duration}</p>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-foreground/80 line-clamp-3">{course.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="font-bold text-lg text-biophilic-clay">
          {course.isFree ? 'FREE' : `KES ${course.price}`}
        </span>
        <Link to={`/course/${course.id}`}>
          <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
            {isEnrolled ? 'View Course' : 'Enroll Now'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const allCourses = getCourses();
    // Filter to show only featured courses
    const featuredCourses = allCourses.filter(course => course.isFeatured);
    setCourses(featuredCourses);
  }, []);

  // Check if user is enrolled in a specific course
  const isEnrolled = (courseId: string) => {
    return currentUser?.enrolledCourses?.includes(courseId) || false;
  };

  return (
    <section className="py-16 bg-biophilic-sand/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-biophilic-earth mb-4">Featured Courses</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Immerse yourself in courses that blend indigenous knowledge with modern sustainability practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isEnrolled={isEnrolled(course.id)}
            />
          ))}
          
          {/* Coming soon placeholders */}
          {courses.length < 3 && (
            <Card className="overflow-hidden border-biophilic-sand bg-muted/50 flex flex-col justify-center items-center p-8 h-full">
              <h3 className="text-xl font-semibold text-biophilic-earth mb-2">More Courses Coming Soon</h3>
              <p className="text-center text-foreground/70 mb-4">Stay tuned for additional courses on biophilic design and sustainable living.</p>
            </Card>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/courses">
            <Button variant="outline" className="border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white px-8 py-6">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
