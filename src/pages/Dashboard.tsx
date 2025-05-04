
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getUserEnrolledCourses, Course } from '@/utils/database';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, User } from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    if (currentUser) {
      const courses = getUserEnrolledCourses(currentUser.id);
      setEnrolledCourses(courses);
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-biophilic-earth">Welcome, {currentUser?.fullName}</h1>
            <p className="text-foreground/70 mt-2">Your learning dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-xl font-semibold text-biophilic-earth flex items-center">
                  <Book className="mr-2 h-5 w-5" /> My Courses
                </h2>
                
                {enrolledCourses.length === 0 ? (
                  <div className="mt-6 p-8 text-center bg-muted/30 rounded-lg">
                    <p className="text-foreground/70">You haven't enrolled in any courses yet.</p>
                    <Link to="/courses" className="inline-block mt-4">
                      <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {enrolledCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3 h-40 md:h-auto">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-6">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              By {course.instructor}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                              <div>
                                {/* You can add progress info here */}
                                <span className="text-sm text-muted-foreground">0% Complete</span>
                              </div>
                              <Link to={`/course/${course.id}`}>
                                <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90">
                                  Continue Learning
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-xl font-semibold text-biophilic-earth flex items-center">
                  <User className="mr-2 h-5 w-5" /> My Profile
                </h2>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="mt-1 text-foreground">{currentUser?.fullName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Email</label>
                    <p className="mt-1 text-foreground">{currentUser?.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Member Since</label>
                    <p className="mt-1 text-foreground">
                      {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full" variant="outline">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-border p-6 mt-6">
                <h2 className="text-xl font-semibold text-biophilic-earth">Recommended</h2>
                <div className="mt-4">
                  <Link to="/courses">
                    <Button className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90">
                      Explore More Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
