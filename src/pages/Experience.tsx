import { ArrowLeft, Briefcase, Calendar, MapPin, Building2, CheckCircle2, ShieldCheck, Code2, Database, Terminal, FileText, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'framer-motion';

const Experience = () => {
  useSEO({
    title: 'Work Experience | Devansh Datta',
    description:
      'Software Development Experience of Devansh Datta including internship at Haryana State Higher Education Council (HSHEC) building government digital governance platforms.',
    keywords:
      'Devansh Datta work experience, HSHEC, Haryana State Higher Education Council, Software Development Intern, Full-Stack Developer, REST APIs, NEP Excellence Award Portal',
    canonical: 'https://devanshdattafolio.vercel.app/experience',
  });

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
    <main className="min-h-screen bg-black text-white relative py-20 px-4 overflow-hidden" aria-label="Work Experience">
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

      {/* Ambient background glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-10 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation back button */}
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-6 text-white hover:text-gray-300 hover:bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gray-300 text-sm font-semibold tracking-widest uppercase mb-2 inline-block px-3 py-1 bg-white/10 rounded-full border border-white/20">
                Career History
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                WORK EXPERIENCE
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                Building impactful digital solutions, government platforms, and scalable web architectures.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Experience List */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-black/60 border border-white/15 hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 backdrop-blur-md group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-white/80 via-white/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {exp.role}
                    </h2>
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

              {/* Project Description */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-8">
                <p className="text-gray-300 text-base leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Key Contributions */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  What I Did
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.responsibilities.map((item, rIdx) => (
                    <li
                      key={rIdx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 transition-all text-gray-300 text-sm leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Tags */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
                  Skills & Technologies Applied
                </h3>
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
      </div>
    </main>
  );
};

export default Experience;
