import React, { useState } from 'react';
import API from '../services/api';
import { Sparkles, Calendar, MapPin, Users, DollarSign, Send, CheckCircle2, AlertCircle, Music, Building } from 'lucide-react';

const PerformancePage = () => {
  const [formData, setFormData] = useState({
    organizerName: '',
    organization: '',
    email: '',
    phone: '',
    eventType: 'Cultural Festival',
    eventDate: '',
    venue: '',
    city: '',
    troupeSize: 'Group Troupe (4-6 Dancers)',
    estimatedBudget: '₹50,000 - ₹1,000,000',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.organizerName || !formData.email || !formData.phone || !formData.eventDate || !formData.venue || !formData.city) {
      setError('Please fill in all required event details.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/performance-requests', formData);
      if (res.data.success) {
        setSuccessMsg(res.data.message);
        setFormData({
          organizerName: '',
          organization: '',
          email: '',
          phone: '',
          eventType: 'Cultural Festival',
          eventDate: '',
          venue: '',
          city: '',
          troupeSize: 'Group Troupe (4-6 Dancers)',
          estimatedBudget: '₹50,000 - ₹100,000',
          specialRequests: '',
        });
      } else {
        setError(res.data.message || 'Failed to submit request.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while submitting inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#BE185D] uppercase bg-[#FFF1F2] px-4 py-1.5 rounded-full border border-[#FACC15]">
            STAGE SHOWS & CULTURAL CONCERTS
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#831843]">
            Book a Classical Dancing Troupe Performance
          </h1>
          <div className="w-24 h-1 bg-[#FACC15] mx-auto rounded-full" />
          <p className="text-gray-700 text-base leading-relaxed">
            Invite Jothi's’s acclaimed dance ensemble led by Guru Smt. Rukmini Viswanathan for prestigious festivals, corporate galas, and temple celebrations worldwide.
          </p>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl text-center space-y-2 text-green-800 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
            <h3 className="font-cinzel text-xl font-bold">Inquiry Successfully Submitted!</h3>
            <p className="text-sm max-w-lg mx-auto">{successMsg}</p>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-300 rounded-xl text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Form Container */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-[#FACC15]/50 shadow-xl relative">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Organizer Details */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-xl font-bold text-[#BE185D] flex items-center gap-2 border-b border-[#FACC15]/30 pb-2">
                <Building className="w-5 h-5 text-[#FACC15]" />
                1. Organizer & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Organizer / Contact Person Name *
                  </label>
                  <input
                    type="text"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Ramanathan"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Organization / Festival Name
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g. Madras Heritage Arts Council"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
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
                    placeholder="organizer@festival.com"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98400 55443"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Event Details */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-xl font-bold text-[#BE185D] flex items-center gap-2 border-b border-[#FACC15]/30 pb-2">
                <Music className="w-5 h-5 text-[#FACC15]" />
                2. Event & Venue Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Type / Category *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  >
                    <option value="Cultural Festival">Cultural Festival</option>
                    <option value="Corporate Gala">Corporate Gala</option>
                    <option value="Temple Annual Festival">Temple Annual Festival</option>
                    <option value="Private Celebration">Private Celebration / Wedding</option>
                    <option value="School/College Event">School / College Annual Day</option>
                    <option value="International Showcase">International Tour / Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Proposed Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Venue Name / Hall *
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="e.g. Music Academy Auditorium"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Troupe Format & Budget */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-xl font-bold text-[#BE185D] flex items-center gap-2 border-b border-[#FACC15]/30 pb-2">
                <Users className="w-5 h-5 text-[#FACC15]" />
                3. Troupe Format & Budget Tier
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Troupe Format *
                  </label>
                  <select
                    name="troupeSize"
                    value={formData.troupeSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  >
                    <option value="Solo Performance (Guru)">Solo Performance (Guru Rukmini)</option>
                    <option value="Duet Showcase">Duet Showcase (2 Dancers)</option>
                    <option value="Group Troupe (4-6 Dancers)">Group Troupe (4-6 Dancers)</option>
                    <option value="Grand Troupe (8+ Dancers with Live Orchestra)">Grand Troupe (8+ Dancers with Live Orchestra)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Estimated Honorarium / Budget Range *
                  </label>
                  <select
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                  >
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹100,000">₹50,000 - ₹100,000</option>
                    <option value="₹100,000 - ₹250,000">₹100,000 - ₹250,000</option>
                    <option value="₹250,000+ / International">₹250,000+ / International Concert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Special Requirements (Stage Dimensions, Sound Systems, Repertoire Preferences)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Specify audio-visual setup, stage size, or specific Varnam/Tillana items requested..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-gradient-to-r from-[#FEF08A] via-[#FACC15] to-[#EAB308] text-[#831843] font-bold text-base rounded-xl shadow-xl hover:shadow-yellow-500/30 hover:scale-105 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
              >
                {loading ? 'Submitting Performance Inquiry...' : 'Submit Performance Inquiry'}
                <Send className="w-5 h-5" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default PerformancePage;
