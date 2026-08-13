import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, User, Calendar, Phone, Award } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ onOpenBookingModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Guru', path: '/#guru' },
    { name: 'Courses & Slots', path: '/courses' },
    { name: 'Request Performance', path: '/performance-request' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'FAQ & Contact', path: '/#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 nav-glass text-white shadow-xl">
      {/* Top Utility Bar */}
      <div className="bg-[#831843] border-b border-[#FACC15]/30 py-1.5 px-4 text-xs font-medium text-[#FEF9C3]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#FACC15]" />
              +91 98400 12345 / +91 44 2490 8899
            </span>
            <span className="hidden sm:inline-block text-[#FACC15]/50">|</span>
            <span className="hidden sm:inline-block">Admissions Open for 2026-27 Batches</span>
          </div>
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-[#FEF08A] font-semibold">Namaste, {user.name}</span>
                <Link
                  to="/admin/dashboard"
                  className="bg-[#FACC15] text-[#831843] px-2.5 py-0.5 rounded text-xs font-bold hover:bg-yellow-400 transition"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white text-xs underline ml-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-1 text-[#FEF9C3] hover:text-white transition"
              >
                <User className="w-3.5 h-3.5" />
                Admin Portal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FACC15] to-[#CA8A04] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#BE185D] flex items-center justify-center border border-[#FEF08A]">
                <Sparkles className="w-6 h-6 text-[#FEF08A] animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#FEF08A] block leading-none">
                Jothi's
              </span>
              <span className="text-[10px] tracking-widest text-[#FEF9C3] uppercase font-light">
                Classical Dancing Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm font-medium text-gray-200 hover:text-[#FEF08A] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenBookingModal}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-[#831843] transition-all bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#EAB308] rounded-md shadow-lg hover:shadow-yellow-500/20 hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Class Slot
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#FEF08A] hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-[#831843] border-t border-[#FACC15]/40 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-[#BE185D] hover:text-[#FEF08A]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-[#FACC15]/30 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBookingModal();
              }}
              className="w-full text-center py-3 bg-gradient-to-r from-[#FEF08A] to-[#FACC15] text-[#831843] font-bold rounded-md shadow"
            >
              Book Class Slot
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
