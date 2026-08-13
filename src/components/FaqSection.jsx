import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const FaqSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = [
    {
      q: 'What is the minimum age required to enroll in the Prarambhik Beginner course?',
      a: 'Students may start as early as 5 years of age. At this stage, focus is placed on rhythmic posture (Araimandi balance), basic Hastha Mudras, and developing stamina.',
    },
    {
      q: 'How long does it take to prepare for an Arangetram (Solo Debut Recital)?',
      a: 'On average, dedicated students complete the Margam syllabus (Alarippu to Tillana) in 5 to 7 years. Intensive coaching for Arangetram takes approximately 12 to 18 months prior to the date.',
    },
    {
      q: 'What is the required dance attire for practical classes?',
      a: 'Students are required to wear traditional cotton Dance Sarees or Practice Pyjama Kurti sets with a waist sash (Kachai). Ghungroos (ankle bells) are introduced after foundational Adavu mastery.',
    },
    {
      q: 'Are online hybrid masterclasses available for outstation students?',
      a: 'Yes! We conduct interactive 1-on-1 virtual masterclasses for intermediate and advanced international students preparing for certifications and solo showcases.',
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FFFFFF] border-b border-[#FACC15]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#BE185D] uppercase bg-[#FFF1F2] px-4 py-1.5 rounded-full border border-[#FACC15]">
            HELP & INQUIRIES
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#831843]">
            Frequently Asked Questions & Contact
          </h2>
          <div className="w-24 h-1 bg-[#FACC15] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* FAQ Accordion Column */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-cinzel text-xl font-bold text-[#BE185D] flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#FACC15]" />
              Academic Admissions FAQ
            </h3>

            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#FACC15]/40 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left font-cinzel text-sm sm:text-base font-bold text-[#831843] flex justify-between items-center bg-[#FFF1F2]/50 hover:bg-[#FFF1F2]"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#BE185D] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#FACC15] shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="p-5 pt-2 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Contact Form Column */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 rounded-2xl border-2 border-[#FACC15]/50 shadow-xl space-y-6">
              <h3 className="font-cinzel text-xl font-bold text-[#BE185D]">
                Send Us a General Inquiry
              </h3>

              {contactSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                  <h4 className="font-cinzel text-lg font-bold text-[#BE185D]">Message Received!</h4>
                  <p className="text-xs text-gray-600">
                    Thank you for reaching out to Jothi's Academy. Our desk will reply to your email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smt. Radhika Swaminathan"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Inquiry regarding Weekend Batches"
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Write your message here..."
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#BE185D] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#BE185D] text-[#FEF08A] font-bold text-xs rounded-lg border border-[#FACC15] hover:bg-[#831843] shadow transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Send Message to Academy Desk
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;
