import { ArrowLeft, Award, Trophy, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '../hooks/useSEO';

const Achievements = () => {
  useSEO({
    title: 'Achievements & Certifications | Devansh Datta',
    description:
      'Awards, certifications, and recognition earned by Devansh Datta — AI Innovation Award, hackathon finalist, poetry competition winner, and professional certifications in Python, ML, and Web Development.',
    keywords:
      'Devansh Datta achievements, AI Innovation Award, hackathon finalist, Python certification, Machine Learning certificate, IILM University',
    canonical: 'https://devanshdattafolio.vercel.app/achievements',
  });
  const achievements = [{
    title: "AI Innovation Award",
    description: "Recognition for developing an innovative AI-powered solution",
    date: "2024",
    category: "Innovation",
    icon: <Trophy className="w-8 h-8" />
  }, {
    title: "Best Student Project",
    description: "Outstanding project in Computer Science Engineering",
    date: "2024",
    category: "Academic",
    icon: <Award className="w-8 h-8" />
  }, {
    title: "Poetry Competition Winner",
    description: "First place in inter-college poetry competition",
    date: "2023",
    category: "Creative",
    icon: <Star className="w-8 h-8" />
  }, {
    title: "Hackathon Finalist",
    description: "Top 10 finish in national level hackathon",
    date: "2023",
    category: "Technology",
    icon: <Trophy className="w-8 h-8" />
  }];
  const certificates = [{
    name: "Python Programming Certification",
    issuer: "Coursera",
    year: "2024",
    level: "Advanced"
  }, {
    name: "Machine Learning Fundamentals",
    issuer: "edX",
    year: "2024",
    level: "Intermediate"
  }, {
    name: "Web Development Bootcamp",
    issuer: "FreeCodeCamp",
    year: "2023",
    level: "Advanced"
  }, {
    name: "UI/UX Design Certificate",
    issuer: "Google",
    year: "2023",
    level: "Beginner"
  }];
  return (
    <main className="min-h-screen bg-black text-white relative py-20 px-4 overflow-hidden" aria-label="Achievements and Certifications">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(120, 120, 120, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 120, 120, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-6 text-white hover:text-gray-300 hover:bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              ACHIEVEMENTS
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
              A showcase of my accomplishments, certifications, and recognition in technology and creative fields
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
            <Trophy className="w-8 h-8 text-white" />
            Awards & Recognition
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-black/60 p-6 rounded-xl border border-white/15 hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 group hover:scale-[1.02] backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="text-white transition-colors">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 bg-white/10 text-white border border-white/20 text-xs rounded-full font-medium">
                        {achievement.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-300" />
                        {achievement.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
            <Award className="w-8 h-8 text-white" />
            Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="bg-black/60 p-6 rounded-xl border border-white/15 hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 group hover:scale-[1.02] backdrop-blur-md">
                <div className="mb-4">
                  <span className="px-2.5 py-1 text-xs rounded-full bg-white/10 text-white border border-white/20 font-medium">
                    {cert.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-gray-400 mb-2 group-hover:text-gray-300 transition-colors font-light text-sm">
                  {cert.issuer}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Achievements;