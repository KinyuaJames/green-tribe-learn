
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import { 
  Courses, 
  CourseDetail, 
  LessonDetail, 
  CourseDiscussion, 
  CaseStudyGallery,
  CaseStudyDetail,
  IndigenousMap,
  Tribe,
  Login,
  Signup,
  About,
  Dashboard
 } from "./pages/expo";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SubmitCaseStudy from "./pages/SubmitCaseStudy";
import StudyGallery from "./pages/StudyGallery";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};



const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/course/:courseId/lesson/:lessonId" element={
                <ProtectedRoute>
                  <LessonDetail />
                </ProtectedRoute>
              } />
              <Route path="/course/:courseId/discussion" element={
                <ProtectedRoute>
                  <CourseDiscussion />
                </ProtectedRoute>
              } />
              <Route path="/case-studies" element={<CaseStudyGallery />} />
              <Route path="/case-study/:caseStudyId" element={<CaseStudyDetail />} />
              <Route path="/indigenous-map" element={<IndigenousMap />} />
              <Route path="/tribe" element={<Tribe />} />
              <Route path="/submit-case-study" element={<SubmitCaseStudy />} />
              <Route path="/study-gallery" element={<StudyGallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
