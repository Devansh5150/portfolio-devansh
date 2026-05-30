import { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import { useSEO } from '../hooks/useSEO';

// Lazy load heavy sections for improved initial load performance
const About = lazy(() => import('../components/About'));
const Projects = lazy(() => import('../components/Projects'));
const Services = lazy(() => import('../components/Services'));
const Leadership = lazy(() => import('../components/Leadership'));
const ResearchPublications = lazy(() => import('../components/ResearchPublications'));
const Hackathons = lazy(() => import('../components/Hackathons'));
const SystemThinking = lazy(() => import('../components/SystemThinking'));
const Contact = lazy(() => import('../components/Contact'));

// Throttling function to limit scroll event frequency
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useSEO({
    title: 'Devansh Datta | AI Developer & Full-Stack Innovator',
    description:
      'Portfolio of Devansh Datta — AI/ML engineer, full-stack developer, published author, and startup founder. Tech Lead at SkillSync, CEO of Torq. B.Tech CSE (AIML) at IILM University.',
    keywords:
      'Devansh Datta, AI Developer, Machine Learning, Full-Stack, LLM, Python, React, SkillSync, Torq, IILM',
    canonical: 'https://devansh-datta.vercel.app/',
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      const sections = ['home', 'about', 'projects', 'services', 'leadership', 'research', 'hackathons', 'vision', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      {/* Site-wide grid background */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 56px), repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 56px)",
          backgroundPosition: 'top left',
          backgroundSize: '56px 56px, 56px 56px'
        }}
        aria-hidden="true"
      />
      
      <Navigation activeSection={activeSection} />

      <main>
        <section id="home" className="min-h-screen" aria-label="Hero — Introduction">
          <Hero />
        </section>

        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center" aria-busy="true" aria-label="Loading content">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading" />
          </div>
        }>
          <section id="about" className="min-h-screen" aria-label="About Devansh Datta">
            <About />
          </section>

          <section id="projects" className="min-h-screen" aria-label="Projects Portfolio">
            <Projects />
          </section>

          <section id="services" className="min-h-screen" aria-label="Services Offered">
            <Services />
          </section>

          <section id="leadership" className="min-h-screen" aria-label="Leadership Experience">
            <Leadership />
          </section>

          <section id="research" aria-label="Research & Publications">
            <ResearchPublications />
          </section>

          <section id="hackathons" aria-label="Hackathon Achievements">
            <Hackathons />
          </section>

          <section id="vision" aria-label="Vision & System Thinking">
            <SystemThinking />
          </section>

          <section id="contact" className="min-h-screen" aria-label="Contact Devansh Datta">
            <Contact />
          </section>
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
