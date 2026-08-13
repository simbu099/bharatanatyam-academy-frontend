import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Sparkles, Calendar, Clock, BookOpen, ChevronDown, ChevronUp, CheckCircle, Users } from 'lucide-react';

const CoursesPage = ({ onOpenBookingModal }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses');
      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Prarambhik (Beginner)', 'Madhyama (Intermediate)', 'Uttama (Advanced)', 'Nattuvangam & Rhythm'];

  const filteredCourses = activeCategory === 'All'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  const toggleSyllabus = (courseId) => {
    setExpandedSyllabusId(expandedSyllabusId === courseId ? null : courseId);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#BE185D] uppercase bg-[#FFF1F2] px-4 py-1.5 rounded-full border border-[#FACC15]">
            CLASSICAL MARGAM CURRICULUM
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#831843]">
            Classical Dancing Course Catalogue
          </h1>
          <div className="w-24 h-1 bg-[#FACC15] mx-auto rounded-full" />
          <p className="text-gray-700 text-base leading-relaxed">
            Authentic training structured across technical footwork (Nritta), emotional storytelling (Abhinaya), and rhythmic mastery (Nattuvangam).
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-[#BE185D] text-[#FEF08A] border-[#FACC15] shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#FACC15] hover:text-[#BE185D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#BE185D] border-t-[#FACC15] rounded-full animate-spin mx-auto mb-4" />
            <p className="font-cinzel text-base text-[#BE185D]">Loading Classical Curriculum...</p>
          </div>
        ) : (
          /* Course Cards Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="classical-card rounded-2xl overflow-hidden shadow-xl border border-[#FACC15]/40 flex flex-col justify-between"
              >
                <div>
                  {/* Top Image Banner & Badges */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="bg-[#BE185D] text-[#FEF08A] text-xs font-bold px-3 py-1 rounded-full border border-[#FACC15]">
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs text-[#FEF9C3] uppercase font-bold tracking-wider block">
                        {course.category}
                      </span>
                      <h2 className="font-cinzel text-xl font-bold text-white drop-shadow">
                        {course.title}
                      </h2>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Key Metrics Pill Row */}
                    <div className="grid grid-cols-3 gap-2 bg-[#FFF1F2] p-3 rounded-xl border border-[#FACC15]/30 text-center text-xs">
                      <div>
                        <span className="text-gray-500 block text-[10px]">Duration</span>
                        <strong className="text-[#BE185D] font-bold">{course.durationMonths} Months</strong>
                      </div>
                      <div className="border-x border-[#FACC15]/20">
                        <span className="text-gray-500 block text-[10px]">Monthly Fee</span>
                        <strong className="text-[#BE185D] font-bold">₹{course.feeMonthly}</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px]">Active Batches</span>
                        <strong className="text-[#BE185D] font-bold">{course.slots?.length || 0} Slots</strong>
                      </div>
                    </div>

                    {/* Available Batch Timings Preview */}
                    {course.slots && course.slots.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-[#BE185D] uppercase tracking-wider block">
                          Available Batch Timings:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {course.slots.map((slot) => (
                            <span
                              key={slot._id}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#FACC15]/40 rounded-lg text-[11px] font-medium text-gray-800"
                            >
                              <Clock className="w-3 h-3 text-[#FACC15]" />
                              {slot.days} ({slot.startTime})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Syllabus Accordion Toggle */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="border-t border-gray-100 pt-3">
                        <button
                          onClick={() => toggleSyllabus(course._id)}
                          className="w-full flex justify-between items-center text-xs font-bold text-[#BE185D] hover:text-[#831843] transition"
                        >
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-[#FACC15]" />
                            View Modular Syllabus Breakdown
                          </span>
                          {expandedSyllabusId === course._id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {expandedSyllabusId === course._id && (
                          <div className="mt-3 space-y-2 bg-[#FFF1F2] p-4 rounded-xl border border-[#FACC15]/30 text-xs">
                            {course.syllabus.map((s, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-gray-800">
                                <CheckCircle className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-[#BE185D]">{s.topic}: </strong>
                                  <span>{s.details}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="p-6 pt-0 mt-2">
                  <button
                    onClick={() => onOpenBookingModal(course._id)}
                    className="w-full py-3 bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#EAB308] text-[#831843] font-bold text-sm rounded-xl shadow-md hover:shadow-yellow-500/30 hover:scale-[1.01] transition flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Select Batch & Apply For Admission
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CoursesPage;
