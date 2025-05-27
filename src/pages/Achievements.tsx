
import { ArrowLeft, Award, Trophy, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Achievements = () => {
  const achievements = [
    {
      title: "AI Innovation Award",
      description: "Recognition for developing an innovative AI-powered solution",
      date: "2024",
      category: "Innovation",
      icon: <Trophy className="w-8 h-8" />
    },
    {
      title: "Best Student Project",
      description: "Outstanding project in Computer Science Engineering",
      date: "2024",
      category: "Academic",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Poetry Competition Winner",
      description: "First place in inter-college poetry competition",
      date: "2023",
      category: "Creative",
      icon: <Star className="w-8 h-8" />
    },
    {
      title: "Hackathon Finalist",
      description: "Top 10 finish in national level hackathon",
      date: "2023",
      category: "Technology",
      icon: <Trophy className="w-8 h-8" />
    }
  ];

  const certificates = [
    {
      name: "Python Programming Certification",
      issuer: "Coursera",
      year: "2024",
      level: "Advanced"
    },
    {
      name: "Machine Learning Fundamentals",
      issuer: "edX",
      year: "2024",
      level: "Intermediate"
    },
    {
      name: "Web Development Bootcamp",
      issuer: "FreeCodeCamp",
      year: "2023",
      level: "Advanced"
    },
    {
      name: "UI/UX Design Certificate",
      issuer: "Google",
      year: "2023",
      level: "Beginner"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-6 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ACHIEVEMENTS
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my accomplishments, certifications, and recognition in technology and creative fields
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400 flex items-center gap-2">
            <Trophy className="w-8 h-8" />
            Awards & Recognition
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105 hover:bg-slate-800/70"
              >
                <div className="flex items-start gap-4">
                  <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                        {achievement.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {achievement.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
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
          <h2 className="text-3xl font-bold mb-8 text-purple-400 flex items-center gap-2">
            <Award className="w-8 h-8" />
            Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-slate-800/30 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 hover:bg-slate-800/50"
              >
                <div className="mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    cert.level === 'Advanced' ? 'bg-green-500/20 text-green-400' :
                    cert.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {cert.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">
                  {cert.issuer}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
