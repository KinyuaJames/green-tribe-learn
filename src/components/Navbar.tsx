
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };
  
  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      setShowLoginDialog(false);
      toast.success('Successfully logged in');
    } catch (error) {
      toast.error('Login failed. Check your credentials and try again.');
    }
  };

  return (
    <nav className="bg-background border-b border-biophilic-sand/30 py-4 px-6 md:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-medium text-xl text-biophilic-earth"
        >
          <div className="w-10 h-10 bg-biophilic-leaf rounded-full flex items-center justify-center">
            <span className="text-white font-bold">GB</span>
          </div>
          <span className="hidden md:inline">Green Biophilic Living</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-biophilic-earth transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-foreground hover:text-biophilic-earth transition-colors">
            Courses
          </Link>
          <Link to="/case-studies" className="text-foreground hover:text-biophilic-earth transition-colors">
            Case Studies
          </Link>
          <Link to="/indigenous-map" className="text-foreground hover:text-biophilic-earth transition-colors flex items-center gap-1">
            <MapPin size={16} />
            Indigenous Map
          </Link>
          <Link to="/tribe" className="text-foreground hover:text-biophilic-earth transition-colors">
            Biophilic Tribe
          </Link>
          <Link to="/about" className="text-foreground hover:text-biophilic-earth transition-colors">
            About
          </Link>
          
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-foreground hover:text-biophilic-earth transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" onClick={handleLogout} className="border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white">
                <LogOut className="h-4 w-4 mr-2" /> Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setShowLoginDialog(true)} className="border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white">
                Log In
              </Button>
              <Link to="/signup">
                <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-background border-b border-biophilic-sand/30 px-6 py-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-biophilic-earth transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-foreground hover:text-biophilic-earth transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/case-studies" 
              className="text-foreground hover:text-biophilic-earth transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              Case Studies
            </Link>
            <Link 
              to="/indigenous-map" 
              className="text-foreground hover:text-biophilic-earth transition-colors px-2 py-2 flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              <MapPin size={16} />
              Indigenous Map
            </Link>
            <Link 
              to="/tribe" 
              className="text-foreground hover:text-biophilic-earth transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              Biophilic Tribe
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-biophilic-earth transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-foreground hover:text-biophilic-earth transition-colors px-2 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  className="w-full border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white mt-2"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white"
                  onClick={() => {
                    setIsOpen(false);
                    setShowLoginDialog(true);
                  }}
                >
                  Log In
                </Button>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleQuickLogin} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => {
                  setShowLoginDialog(false);
                  navigate('/signup');
                }}
              >
                Create account
              </Button>
              <Button 
                type="submit" 
                className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white"
              >
                Log In
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
