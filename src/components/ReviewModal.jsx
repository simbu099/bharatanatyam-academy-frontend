import React, { useState } from 'react';
import { X, Star, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import API from '../services/api';

const ReviewModal = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Student',
    rating: 5,
    comment: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.comment) {
      setError('Please provide your name and review comment.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/reviews', formData);
      if (res.data.success) {
        setSuccess(true);
        if (onReviewSubmitted) onReviewSubmitted();
      } else {
        setError(res.data.message || 'Failed to submit review.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#FFF1F2] border-2 border-[#FACC15] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-fadeIn">
        
        <div className="bg-[#BE185D] text-[#FEF08A] p-4 flex justify-between items-center border-b border-[#FACC15]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FEF08A]" />
            <h3 className="font-cinzel text-lg font-bold text-white">Leave a Testimonial</h3>
          </div>
          <button onClick={onClose} className="text-[#FEF9C3] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h4 className="font-cinzel text-xl font-bold text-[#BE185D]">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs text-gray-700">
                Your review has been logged and will appear on the academy portal following brief administration approval.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#BE185D] text-[#FEF08A] font-bold rounded-lg border border-[#FACC15]"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Smt. Gayatri Nathan"
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Role / Association *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                >
                  <option value="Senior Disciple">Senior Disciple</option>
                  <option value="Parent of Student">Parent of Student</option>
                  <option value="Arangetram Graduate">Arangetram Graduate</option>
                  <option value="Concert Attendee / Festival Organizer">Concert Attendee / Festival Organizer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Rating (1 to 5 Stars) *</label>
                <div className="flex gap-2 items-center text-[#FACC15]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 hover:scale-125 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating ? 'fill-current text-[#FACC15]' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Review Comments *</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Share your experience regarding Guru Rukmini's teaching, Arangetram mentorship, or troupe performances..."
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#BE185D] text-[#FEF08A] font-bold text-xs rounded-lg border border-[#FACC15] shadow hover:bg-[#831843]"
                >
                  {loading ? 'Submitting...' : 'Submit Testimonial'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ReviewModal;
