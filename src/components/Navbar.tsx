
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Home, BookOpen, Map, Users, Info, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { currentUser, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        setLoginDialogOpen(false);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    // If on a protected route, redirect to home
    if (location.pathname === '/dashboard' || location.pathname.includes('/course/')) {
      navigate('/');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4 mr-2" /> },
    { path: '/courses', label: 'Courses', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { path: '/case-studies', label: 'Case Studies', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { path: '/indigenous-map', label: 'Indigenous Map', icon: <Map className="w-4 h-4 mr-2" /> },
    { path: '/tribe', label: 'Biophilic Tribe', icon: <Users className="w-4 h-4 mr-2" /> },
    { path: '/about', label: 'About', icon: <Info className="w-4 h-4 mr-2" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center bg-gradient-to-tr from-biophilic-earth to-biophilic-clay text-white w-10 h-10 rounded-full font-bold text-lg transition-transform group-hover:scale-105">
              GB
            </div>
            <div className="hidden sm:block text-xl font-medium">
              <span className="text-biophilic-earth">Green Biophilic</span> <span className="text-foreground/80">Living</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full flex items-center transition-all ${
                  isActive(item.path)
                    ? 'bg-biophilic-sand/20 text-biophilic-earth font-medium shadow-sm'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {!isScrolled && item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1 rounded-full border-biophilic-earth/20 hover:border-biophilic-earth/50">
                    <User className="w-4 h-4 mr-1" />
                    <span>{currentUser.name || currentUser.email}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl border-biophilic-sand/30">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="rounded-lg cursor-pointer">Dashboard</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer text-red-500 hover:text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLoginDialogOpen(true)}
                  className="rounded-full hover:bg-biophilic-sand/10"
                >
                  <LogIn className="w-4 h-4 mr-1" /> Log In
                </Button>
                <Button
                  className="bg-gradient-to-r from-biophilic-earth to-biophilic-clay hover:opacity-90 rounded-full"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {currentUser && (
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 rounded-full"
                onClick={() => navigate('/dashboard')}
              >
                <User className="w-5 h-5" />
              </Button>
            )}
            <button
              className="text-foreground p-2 focus:outline-none rounded-full hover:bg-muted/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 border-t border-border/20 pt-3 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg transition-colors flex items-center ${
                    isActive(item.path)
                      ? 'bg-biophilic-sand/10 text-biophilic-earth'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {!currentUser && (
                <>
                  <hr className="border-border/20 my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start px-4 rounded-lg flex items-center"
                    onClick={() => {
                      setLoginDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" /> Log In
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-biophilic-earth to-biophilic-clay hover:opacity-90 justify-start rounded-lg"
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="ml-2">Sign Up</span>
                  </Button>
                </>
              )}
              
              {currentUser && (
                <>
                  <hr className="border-border/20 my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start px-4 text-red-500 hover:text-red-600 hover:bg-red-50/30 rounded-lg"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Login to your account</DialogTitle>
            <DialogDescription className="text-center">
              Enter your email and password to access all features.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <button 
                  type="button" 
                  className="text-sm text-biophilic-earth hover:underline"
                  onClick={() => {
                    setLoginDialogOpen(false); 
                    navigate('/reset-password');
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-lg"
                required
              />
            </div>
            
            <DialogFooter className="sm:justify-between">
              <button 
                type="button" 
                className="text-sm text-foreground/70 hover:text-foreground hover:underline"
                onClick={() => {
                  setLoginDialogOpen(false); 
                  navigate('/signup');
                }}
              >
                Don't have an account? Sign up
              </button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-biophilic-earth to-biophilic-clay hover:opacity-90 rounded-lg"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : 'Log in'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
