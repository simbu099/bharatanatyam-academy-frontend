import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Send, Globe, Share2, Video } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#831843] text-white border-t-4 border-[#FACC15] relative overflow-hidden">
      
      {/* Upper Newsletter & Contact Bar */}
      <div className="bg-[#BE185D] py-8 border-b border-[#FACC15]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-[#FEF08A]">
              Subscribe for Workshop & Concert Alerts
            </h3>
            <p className="text-xs text-gray-300">
              Receive updates on upcoming Arangetrams, masterclasses, and international troupe showcases.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2.5 rounded-l-md bg-[#831843] border border-[#FACC15]/50 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#FEF08A] w-full md:w-64"
            />
            <button className="px-5 py-2.5 bg-gradient-to-r from-[#FEF08A] to-[#FACC15] text-[#831843] font-bold text-sm rounded-r-md hover:bg-yellow-400 transition flex items-center gap-1">
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#FACC15] p-0.5">
                <div className="w-full h-full rounded-full bg-[#BE185D] flex items-center justify-center border border-[#FEF08A]">
                  <Sparkles className="w-5 h-5 text-[#FEF08A]" />
                </div>
              </div>
              <span className="font-cinzel text-xl font-bold text-[#FEF08A]">
                Jothi's
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Premier institution dedicated to authentic Classical Classical Dancing education, Arangetram mentorship, and troupe stage performances worldwide.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" aria-label="Website" className="w-8 h-8 rounded-full bg-[#BE185D] border border-[#FACC15]/50 flex items-center justify-center text-[#FEF08A] hover:bg-[#FACC15] hover:text-[#831843] transition">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Videos" className="w-8 h-8 rounded-full bg-[#BE185D] border border-[#FACC15]/50 flex items-center justify-center text-[#FEF08A] hover:bg-[#FACC15] hover:text-[#831843] transition">
                <Video className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Social Share" className="w-8 h-8 rounded-full bg-[#BE185D] border border-[#FACC15]/50 flex items-center justify-center text-[#FEF08A] hover:bg-[#FACC15] hover:text-[#831843] transition">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-base font-bold text-[#FEF08A] mb-4 border-b border-[#FACC15]/30 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="/" className="hover:text-[#FEF08A] transition">Home Page</a></li>
              <li><a href="/#guru" className="hover:text-[#FEF08A] transition">About Guru Rukmini</a></li>
              <li><a href="/courses" className="hover:text-[#FEF08A] transition">Course Catalogue & Timings</a></li>
              <li><a href="/performance-request" className="hover:text-[#FEF08A] transition">Request Troupe Performance</a></li>
              <li><a href="/gallery" className="hover:text-[#FEF08A] transition">Photo & Video Gallery</a></li>
              <li><a href="/#reviews" className="hover:text-[#FEF08A] transition">Student & Parent Reviews</a></li>
            </ul>
          </div>

          {/* Academic Batches & Timings */}
          <div>
            <h4 className="font-cinzel text-base font-bold text-[#FEF08A] mb-4 border-b border-[#FACC15]/30 pb-2">
              Academy Timings
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><strong className="text-white">Morning Dawn Batch:</strong> Mon & Wed (07:00 AM - 08:30 AM)</li>
              <li><strong className="text-white">Evening Sunset Batch:</strong> Tue & Thu (05:30 PM - 07:00 PM)</li>
              <li><strong className="text-white">Weekend Special Batch:</strong> Sat & Sun (09:00 AM - 11:00 AM)</li>
              <li className="pt-2 text-[#FEF9C3]">Private Masterclasses available upon inquiry.</li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="font-cinzel text-base font-bold text-[#FEF08A] mb-4 border-b border-[#FACC15]/30 pb-2">
              Academy Campus
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                <span>#42, Temple Road, Mylapore, Chennai, Tamil Nadu - 600004, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FACC15] shrink-0" />
                <span>+91 98400 12345 / +91 44 2490 8899</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FACC15] shrink-0" />
                <span>admissions@natyabharati.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-12 mt-12 border-t border-[#FACC15]/20 text-center text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Jothi's Classical Dancing Academy. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/admin/login" className="text-[#FACC15] hover:underline">
              Admin Portal Access
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
