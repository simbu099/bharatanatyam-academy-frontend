import React from 'react';
import { Award, BookOpen, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

const GuruProfile = () => {
  const achievements = [
    'Sangeet Natak Akademi Yuva Puraskar (2012)',
    'Kalaimamani Award by Government of Tamil Nadu (2018)',
    'Empanelled Artiste of Indian Council for Cultural Relations (ICCR)',
    'Senior Research Fellow in Tanjore Quartette Margam Repertoire',
  ];

  return (
    <section id="guru" className="py-20 bg-[#FFFFFF] relative overflow-hidden border-b border-[#FACC15]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#BE185D] uppercase bg-[#FFF1F2] px-4 py-1.5 rounded-full border border-[#FACC15]">
            MEET THE FOUNDER & ARTISTIC DIRECTOR
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#831843]">
            Guru Smt. Rukmini Viswanathan
          </h2>
          <div className="w-24 h-1 bg-[#FACC15] mx-auto rounded-full" />
          <p className="text-gray-700 text-base sm:text-lg italic">
            "Dance is not merely body movement; it is the visual offering of the soul to the Divine Rhythm (Talam)."
          </p>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Guru Image Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Filigree Ornament Background Frame */}
              <div className="absolute -inset-3 bg-[#BE185D] rounded-3xl transform -rotate-2 opacity-90 border-2 border-[#FACC15]" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FACC15] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                  alt="Guru Smt. Rukmini Viswanathan Classical Dancing Maestro"
                  className="w-full h-[480px] object-cover object-top"
                />
                <div className="p-5 bg-gradient-to-t from-[#831843] via-[#BE185D] to-transparent text-white text-center">
                  <h3 className="font-cinzel text-xl font-bold text-[#FEF08A]">
                    Smt. Rukmini Viswanathan
                  </h3>
                  <p className="text-xs text-[#FEF9C3]">Artistic Director & Chief Choreographer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Biography Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-gray-800 text-base leading-relaxed">
              <h3 className="font-cinzel text-2xl font-bold text-[#BE185D] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#FACC15]" />
                Lineage & Artistic Parampara
              </h3>
              <p>
                Trained from the tender age of five under the legendary doyens of Kalakshetra and Tanjore Pandanallur Banis, Smt. Rukmini Viswanathan embodies over 25 years of performance excellence and pedagogical mastery.
              </p>
              <p>
                Her teaching methodology rigorously balances <strong className="text-[#BE185D]">Nritta (pure technical footwork & Araimandi posture)</strong> with the intricate emotional depth of <strong className="text-[#BE185D]">Abhinaya (expression)</strong>. Under her tutelage, over 100 disciples have successfully performed their debut solo <em className="text-[#BE185D]">Arangetrams</em>.
              </p>
            </div>

            {/* Honors & Accolades List */}
            <div className="bg-[#FFF1F2] p-6 rounded-xl border border-[#FACC15]/40 shadow-sm space-y-4">
              <h4 className="font-cinzel text-lg font-bold text-[#831843] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FACC15]" />
                Prestigious Recognition & Awards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guru's Message Box */}
            <div className="border-l-4 border-[#BE185D] pl-4 py-2 text-gray-700 italic bg-[#FFF1F2] rounded-r-lg">
              "My mission through Jothi's is to nurture not just skilled dancers, but cultured individuals rooted in Indian classical aesthetics, discipline, and devotion."
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default GuruProfile;
