import { Building2, Calendar, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ExperienceSection = () => {
  const navigate = useNavigate();

  const experiences = [
    {
      role: 'Software Development Intern',
      company: 'Haryana State Higher Education Council (HSHEC)',
      period: 'May 2026 – July 2026',
      location: 'Panchkula, Haryana',
      badge: 'Government Digital Governance',
      description:
        'Contributed to the development of the NEP Excellence Award Portal, a government digital governance platform designed to streamline the nomination, evaluation, review, and award management process for the Haryana State NEP 2020 Implementation Excellence Awards.',
      responsibilities: [
        'Developed front-end and back-end application features.',
        'Integrated REST APIs and managed database operations.',
        'Tested, debugged, and documented software modules.',
        'Assisted with deployment, maintenance, and feature enhancements.',
        'Collaborated with the team to deliver a reliable government web platform.',
      ],
      skills: [
        'Full-Stack Development',
        'REST APIs',
        'Database Management',
        'Software Testing',
        'Technical Documentation',
        'Deployment',
      ],
    },
  ];

  return (
    <div className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-widest uppercase">
            Career & Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Engineering robust software solutions, government web portals, and scalable backends.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-black/60 border border-white/15 hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 backdrop-blur-md group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-white/80 via-white/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="px-3 py-1 bg-white/10 text-white border border-white/20 text-xs font-semibold rounded-full flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      {exp.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-lg text-gray-200 font-medium">
                    <Building2 className="w-5 h-5 flex-shrink-0 text-white" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-400 lg:text-right">
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <MapPin className="w-4 h-4 text-gray-300" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
                <p className="text-gray-300 text-base leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* What I Did */}
              <div className="mb-6">
                <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  What I Did
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {exp.responsibilities.map((item, rIdx) => (
                    <li
                      key={rIdx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/10 text-gray-300 text-sm leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-gray-200 text-xs font-medium hover:border-white hover:bg-white hover:text-black transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/experience')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/30 font-medium transition-all"
          >
            <span>View Full Experience Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
