
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMobile } from '@/hooks/use-mobile';
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
  const isMobile = useMobile();
  const { currentUser, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      await login(email, password);
      setLoginDialogOpen(false);
      toast.success('Login successful');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/indigenous-map', label: 'Indigenous Map' },
    { path: '/tribe', label: 'Biophilic Tribe' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md sticky top-0 z-40 border-b border-border/40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-biophilic-earth text-white w-10 h-10 rounded-full font-bold text-lg">
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
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-biophilic-sand/10 text-biophilic-earth'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <User className="w-4 h-4 mr-1" />
                    <span>{currentUser.name || currentUser.email}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setLoginDialogOpen(true)}>
                  Log In
                </Button>
                <Button
                  className="bg-biophilic-earth hover:bg-biophilic-earth/90"
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
                className="mr-2"
                onClick={() => navigate('/dashboard')}
              >
                <User className="w-5 h-5" />
              </Button>
            )}
            <button
              className="text-foreground p-2 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 border-t border-border/40 pt-3 pb-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-biophilic-sand/10 text-biophilic-earth'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {!currentUser && (
                <>
                  <hr className="border-border/40 my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start px-3"
                    onClick={() => {
                      setLoginDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    className="bg-biophilic-earth hover:bg-biophilic-earth/90 justify-start"
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              
              {currentUser && (
                <>
                  <hr className="border-border/40 my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start px-3 text-red-500"
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login to your account</DialogTitle>
            <DialogDescription>
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
                className="bg-biophilic-earth hover:bg-biophilic-earth/90"
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
