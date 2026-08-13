import React from 'react';
import { Sparkles, Calendar, Music, ShieldCheck, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ onOpenBookingModal }) => {
  return (
    <section className="relative min-h-[85vh] bg-[#141414] text-white flex items-center overflow-hidden border-b-4 border-[#FACC15]">
      {/* Background Image with Deep Classical Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=1920"
          alt="Classical Dancing Classical Dance Performance"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#831843] via-[#BE185D]/85 to-[#141414]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Academy Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/50 text-[#FEF08A] text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#FEF08A]" />
              ESTABLISHED 2001 • KALAKSHETRA BANI LINEAGE
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-normal"
            >
              Preserving the <span className="text-gold-gradient">Sacred Geometry</span> of Classical Dancing
            </motion.h1>

            {/* Sub-description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-200 text-base sm:text-lg max-w-2xl font-normal leading-relaxed"
            >
              Immerse yourself in authentic classical dance education, footwork precision (Araimandi), and deep spiritual storytelling (Abhinaya) under the direct tutelage of <strong className="text-[#FEF08A]">Guru Smt. Rukmini Viswanathan</strong>.
            </motion.p>

            {/* Hero Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={onOpenBookingModal}
                className="px-7 py-3.5 bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#EAB308] text-[#831843] font-bold text-base rounded-md shadow-xl hover:shadow-yellow-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Apply & Book Slot
              </button>

              <a
                href="/performance-request"
                className="px-7 py-3.5 bg-[#831843]/80 border-2 border-[#FACC15] text-[#FEF08A] font-bold text-base rounded-md hover:bg-[#BE185D] hover:text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <Music className="w-5 h-5 text-[#FACC15]" />
                Request Troupe Show
              </a>
            </motion.div>

            {/* Key Trust Signals */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#FACC15]/30 text-gray-200">
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl font-bold text-[#FEF08A]">1,500+</span>
                <span className="text-xs text-gray-300">Graduated Disciples</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl font-bold text-[#FEF08A]">25+</span>
                <span className="text-xs text-gray-300">Years Teaching Legacy</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl font-bold text-[#FEF08A]">100+</span>
                <span className="text-xs text-gray-300">Solo Arangetrams</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl font-bold text-[#FEF08A]">400+</span>
                <span className="text-xs text-gray-300">Global Concerts</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Accent Column */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative mx-auto max-w-sm">
              {/* Outer Decorative Gold Glow Frame */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#BE185D] opacity-50 blur-lg" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#FACC15] shadow-2xl bg-[#831843]">
                <img
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600"
                  alt="Classical Dancing Mudra & Expression"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-4 bg-[#BE185D] border-t border-[#FACC15]/40 text-center">
                  <span className="font-cinzel text-base font-bold text-[#FEF08A] block">
                    Nritta, Nritya & Natya
                  </span>
                  <span className="text-xs text-gray-300">Authentic Tanjore Style Margam Repertoire</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
