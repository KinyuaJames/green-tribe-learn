
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/tribe" className="text-foreground hover:text-biophilic-earth transition-colors">
            Biophilic Tribe
          </Link>
          <Link to="/about" className="text-foreground hover:text-biophilic-earth transition-colors">
            About
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
              Sign Up
            </Button>
          </Link>
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
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-biophilic-earth text-biophilic-earth hover:bg-biophilic-earth hover:text-white">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
