import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Sparkles, X, Calendar, Image as ImageIcon, ZoomIn } from 'lucide-react';

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await API.get('/gallery');
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Performances', 'Arangetram', 'Workshops', 'Academy Life'];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#BE185D] uppercase bg-[#FFF1F2] px-4 py-1.5 rounded-full border border-[#FACC15]">
            VISUAL ARCHIVE & REPERTOIRE
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#831843]">
            Academy Showcase & Gallery
          </h1>
          <div className="w-24 h-1 bg-[#FACC15] mx-auto rounded-full" />
          <p className="text-gray-700 text-base leading-relaxed">
            Moments of artistic devotion, grand Arangetram debuts, masterclasses, and international troupe performances.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-[#BE185D] text-[#FEF08A] border-[#FACC15] shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#FACC15] hover:text-[#BE185D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#BE185D] border-t-[#FACC15] rounded-full animate-spin mx-auto mb-4" />
            <p className="font-cinzel text-base text-[#BE185D]">Loading Gallery Media...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedImage(item)}
                className="group classical-card rounded-2xl overflow-hidden shadow-lg border border-[#FACC15]/30 cursor-pointer relative"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-[#FEF08A] drop-shadow" />
                  </div>
                  <span className="absolute top-3 right-3 bg-[#BE185D] text-[#FEF08A] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#FACC15]">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 bg-white border-t border-gray-100">
                  <h3 className="font-cinzel text-base font-bold text-[#831843]">
                    {item.title}
                  </h3>
                  {item.eventDate && (
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-[#FACC15]" />
                      {item.eventDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
            <div className="relative max-w-4xl w-full bg-[#141414] border-2 border-[#FACC15] rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-[#BE185D] text-[#FEF08A] p-2 rounded-full border border-[#FACC15] hover:scale-110 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[75vh] flex items-center justify-center bg-black">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#831843] text-white border-t border-[#FACC15]/50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#FEF08A] uppercase tracking-widest bg-[#BE185D] px-3 py-1 rounded-full border border-[#FACC15]">
                    {selectedImage.category}
                  </span>
                  {selectedImage.eventDate && (
                    <span className="text-xs text-[#FEF9C3]">
                      {selectedImage.eventDate}
                    </span>
                  )}
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-[#FEF08A]">
                  {selectedImage.title}
                </h3>
                {selectedImage.caption && (
                  <p className="text-xs sm:text-sm text-gray-300 italic">
                    {selectedImage.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GalleryPage;
