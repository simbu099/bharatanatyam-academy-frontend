import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Sparkles, Send, Calendar, User, Phone, Mail, Award } from 'lucide-react';
import SlotPicker from './SlotPicker';
import API from '../services/api';

const ApplicationModal = ({ isOpen, onClose, initialCourseId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId || '');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    age: '',
    experienceYears: '0',
    specialNote: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Fetch all courses on open
  useEffect(() => {
    if (isOpen) {
      fetchCourses();
      setError('');
      setSubmittedData(null);
    }
  }, [isOpen]);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses');
      if (res.data.success) {
        setCourses(res.data.data);
        if (initialCourseId) {
          const match = res.data.data.find((c) => c._id === initialCourseId);
          if (match) {
            setSelectedCourseId(match._id);
            setSelectedCourse(match);
            setSlots(match.slots || []);
          }
        } else if (res.data.data.length > 0) {
          setSelectedCourseId(res.data.data[0]._id);
          setSelectedCourse(res.data.data[0]);
          setSlots(res.data.data[0].slots || []);
        }
      }
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourseId(courseId);
    const match = courses.find((c) => c._id === courseId);
    setSelectedCourse(match);
    setSlots(match ? match.slots || [] : []);
    setSelectedSlotId('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.studentName || !formData.email || !formData.phone || !formData.age) {
      setError('Please fill in all required student details.');
      return;
    }

    if (!selectedCourseId) {
      setError('Please select a course.');
      return;
    }

    if (!selectedSlotId) {
      setError('Please select a preferred batch timing slot.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/bookings/apply', {
        ...formData,
        courseId: selectedCourseId,
        slotId: selectedSlotId,
      });

      if (res.data.success) {
        const chosenSlot = slots.find((s) => s._id === selectedSlotId);
        setSubmittedData({
          application: res.data.data,
          course: selectedCourse,
          slot: chosenSlot,
        });
      } else {
        setError(res.data.message || 'Failed to submit application.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#FFF1F2] border-2 border-[#FACC15] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-fadeIn">
        
        {/* Modal Header */}
        <div className="bg-[#BE185D] text-[#FEF08A] p-5 flex justify-between items-center border-b border-[#FACC15]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FEF08A]" />
            <div>
              <h2 className="font-cinzel text-xl font-bold tracking-wide text-white">
                Course Admission & Slot Booking
              </h2>
              <span className="text-xs text-[#FEF9C3]">Jothi's Classical Dancing Academy</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#FEF9C3] hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submittedData ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-green-100 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto text-green-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-cinzel text-2xl font-bold text-[#BE185D]">
                  Application Received!
                </h3>
                <p className="text-sm text-gray-700 max-w-md mx-auto">
                  Namaste <strong>{submittedData.application.studentName}</strong>, your application has been successfully logged with ID <code className="bg-yellow-100 text-[#BE185D] px-2 py-0.5 rounded font-mono text-xs">{submittedData.application._id}</code>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-white p-5 rounded-xl border border-[#FACC15]/50 text-left text-xs text-gray-800 space-y-2 shadow-inner max-w-md mx-auto">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold text-[#BE185D]">Course:</span>
                  <span>{submittedData.course?.title}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold text-[#BE185D]">Batch Slot:</span>
                  <span>{submittedData.slot?.days} ({submittedData.slot?.startTime} - {submittedData.slot?.endTime})</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold text-[#BE185D]">Registered Email:</span>
                  <span>{submittedData.application.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#BE185D]">Application Status:</span>
                  <span className="text-amber-700 font-bold uppercase">Pending Guru Approval</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 italic">
                A confirmation summary email has been dispatched to <strong>{submittedData.application.email}</strong>. Our academic team will contact you shortly regarding fee orientation.
              </p>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#BE185D] text-[#FEF08A] font-bold rounded-lg border border-[#FACC15] hover:bg-[#831843] transition"
              >
                Done / Back to Website
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Course Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#831843] uppercase tracking-wider">
                  Select Classical Dancing Course *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#FACC15]/50 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                >
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title} ({course.level} • ₹{course.feeMonthly}/mo)
                    </option>
                  ))}
                </select>
              </div>

              {/* Real-time Slot Picker */}
              <SlotPicker
                slots={slots}
                selectedSlotId={selectedSlotId}
                onSelectSlot={(slotId) => setSelectedSlotId(slotId)}
              />

              {/* Student Details */}
              <div className="space-y-4 pt-2 border-t border-[#FACC15]/30">
                <h4 className="font-cinzel text-base font-bold text-[#BE185D] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#FACC15]" />
                  Applicant Student Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Ananya Sundaram"
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Age (Years) *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="14"
                        min="5"
                        max="80"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Prior Exp (Yrs)
                      </label>
                      <input
                        type="number"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Special Notes / Goals / Previous Guru (Optional)
                  </label>
                  <textarea
                    name="specialNote"
                    value={formData.specialNote}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Mention any specific learning goals or medical considerations..."
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Form Submit Footer */}
              <div className="pt-4 border-t border-[#FACC15]/30 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#EAB308] text-[#831843] font-bold text-xs rounded-lg shadow-lg hover:shadow-yellow-500/30 transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? 'Submitting Application...' : 'Confirm Application & Reserve Slot'}
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplicationModal;
