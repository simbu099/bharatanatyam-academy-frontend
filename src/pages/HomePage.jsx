import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import GuruProfile from '../components/GuruProfile';
import FaqSection from '../components/FaqSection';
import ReviewModal from '../components/ReviewModal';
import API from '../services/api';
import { Sparkles, Star, Calendar, ArrowRight, BookOpen, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = ({ onOpenBookingModal }) => {
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [courseRes, reviewRes] = await Promise.all([
        API.get('/courses'),
        API.get('/reviews'),
      ]);
      if (courseRes.data.success) setCourses(courseRes.data.data.slice(0, 3));
      if (reviewRes.data.success) setReviews(reviewRes.data.data);
    } catch (err) {
      console.error('Error fetching home data:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <Hero onOpenBookingModal={onOpenBookingModal} />

      {/* Guru Profile Section */}
      <GuruProfile />

      {/* Featured Courses Overview */}
      <section className="py-20 bg-[#FFF1F2] border-b border-[#FACC15]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#BE185D] uppercase bg-white px-4 py-1.5 rounded-full border border-[#FACC15]">
              CURRICULUM & MARGAM SYLLABUS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#831843]">
              Featured Classical Dancing Courses
            </h2>
            <div className="w-20 h-1 bg-[#FACC15] mx-auto rounded-full" />
            <p className="text-gray-600 text-base">
              Structured progressive learning modules designed for beginners, intermediate performers, and soloists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="classical-card rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-[#BE185D] text-[#FEF08A] text-xs font-bold px-3 py-1 rounded-full border border-[#FACC15]">
                      {course.badge || course.level}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-[#BE185D]">
                      <span>{course.category}</span>
                      <span>{course.durationMonths} Months</span>
                    </div>
                    <h3 className="font-cinzel text-xl font-bold text-[#831843] leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex justify-between items-center mt-4">
                  <div>
                    <span className="text-xs text-gray-500 block">Monthly Fee</span>
                    <span className="font-cinzel text-xl font-bold text-[#BE185D]">
                      ₹{course.feeMonthly}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal(course._id)}
                    className="px-4 py-2 bg-[#BE185D] text-[#FEF08A] text-xs font-bold rounded hover:bg-[#831843] transition border border-[#FACC15]"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#BE185D] text-[#FEF08A] font-bold text-sm rounded-lg hover:bg-[#831843] border-2 border-[#FACC15] shadow-lg transition"
            >
              View Full Course Catalogue & Batch Slots
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials Section */}
      <section id="reviews" className="py-20 bg-[#FFFFFF] border-b border-[#FACC15]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#BE185D] uppercase bg-[#FFF1F2] px-4 py-1.5 rounded-full border border-[#FACC15]">
              VOICES OF DISCIPLES & PARENTS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#831843]">
              Testimonials & Experience
            </h2>
            <div className="w-20 h-1 bg-[#FACC15] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="bg-white p-6 rounded-2xl border border-[#FACC15]/30 shadow-md space-y-4 relative"
              >
                <div className="flex items-center gap-1 text-[#FACC15]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#FACC15]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#FACC15]"
                  />
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-[#831843]">
                      {rev.name}
                    </h4>
                    <span className="text-xs text-gray-500">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFF1F2] text-[#BE185D] font-bold text-xs rounded-xl border border-[#FACC15] hover:bg-[#BE185D] hover:text-[#FEF08A] transition shadow"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#FACC15]" />
              Submit Your Personal Testimonial
            </button>
          </div>
        </div>
      </section>

      {/* FAQ & Contact Us Section */}
      <FaqSection />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={fetchData}
      />
    </div>
  );
};

export default HomePage;
