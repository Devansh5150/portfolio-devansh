
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Leadership from '../components/Leadership';
import PersonalityQuiz from '../components/PersonalityQuiz';
import CodingChallenge from '../components/CodingChallenge';
import AchievementsGallery from '../components/AchievementsGallery';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import InteractiveBackground from '../components/InteractiveBackground';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
        const sections = ['home', 'about', 'projects', 'services', 'leadership', 'quiz', 'coding', 'achievements', 'contact'];
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      {/* Interactive background */}
      <div className="fixed inset-0 -z-10">
        <InteractiveBackground />
      </div>
      <Navigation activeSection={activeSection} />
      
      <section id="home" className="min-h-screen">
        <Hero />
      </section>
      
      <section id="about" className="min-h-screen">
        <About />
      </section>
      
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
      
      <section id="services" className="min-h-screen">
        <Services />
      </section>
      
      <section id="leadership" className="min-h-screen">
        <Leadership />
      </section>
      
      <section id="quiz" className="min-h-screen">
        <PersonalityQuiz />
      </section>
      
      <section id="coding" className="min-h-screen">
        <CodingChallenge />
      </section>
      
      <section id="achievements" className="min-h-screen">
        <AchievementsGallery />
      </section>
      
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
    </div>
  );
};

export default Index;
