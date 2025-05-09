
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/data/courses';
import { getCourses } from '@/utils/database';
import { useAuth } from '@/contexts/AuthContext';
import ImageWithFallback from './ImageWithFallback';
import '../styles/image-styles.css';

interface CourseGalleryProps {
  category?: string;
}

const CourseGallery: React.FC<CourseGalleryProps> = ({ category = 'all' }) => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const { currentUser } = useAuth();
  
  React.useEffect(() => {
    const allCourses = getCourses();
    const filteredCourses = category === 'all' 
      ? allCourses 
      : allCourses.filter(course => course.tags?.includes(category));
    
    // Convert to component Course type
    const componentCourses = filteredCourses.map(course => ({
      ...course,
      imageUrl: course.image || course.imageUrl,
      image: course.imageUrl || course.image,
    }));
    
    setCourses(componentCourses);
  }, [category]);

  // Check if user is enrolled in a specific course
  const isEnrolled = (courseId: string) => {
    return currentUser?.enrolledCourses?.includes(courseId) || false;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden border-biophilic-sand hover:shadow-md transition-shadow">
          <div className="aspect-video overflow-hidden relative">
            <ImageWithFallback 
              src={course.image} 
              fallbackSrc1="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              fallbackSrc2="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt={course.title} 
              className="course-card-image"
            />
            {course.isFree && (!currentUser || !isEnrolled(course.id)) && (
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
              {course.isFree ? 'FREE' : (isEnrolled(course.id) ? 'ENROLLED' : `KES ${course.price}`)}
            </span>
            <Link to={`/course/${course.id}`}>
              <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
                {isEnrolled(course.id) ? 'View Course' : 'Enroll Now'}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
      
      {courses.length === 0 && (
        <div className="col-span-full text-center py-16">
          <p className="text-muted-foreground">No courses found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CourseGallery;
