
import { Mail, Phone, Linkedin, Github, Instagram, Youtube } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'work.devansh.datta@gmail.com', link: 'mailto:work.devansh.datta@gmail.com' },
    { icon: Phone, title: 'Phone', value: '9871993246', link: 'tel:9871993246' },
    { icon: Linkedin, title: 'LinkedIn', value: 'linkedin.com/in/devansh-datta06', link: 'https://www.linkedin.com/in/devansh-datta06' },
    { icon: Github, title: 'GitHub', value: 'github.com/Devansh5150', link: 'https://github.com/Devansh5150' },
    { icon: Instagram, title: 'Instagram', value: '@devansh.datta', link: 'https://www.instagram.com/devansh.datta/' },
    { icon: Youtube, title: 'YouTube', value: '@devanshdatta', link: 'https://www.youtube.com/@devanshdatta' }
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-white">
            Let's Work Together
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-2">
            Have an AI product idea, a hackathon that needs a tech lead, or a research collaboration in mind?
            I'd love to hear about it.
          </p>
          <p className="text-gray-500 text-sm">
            I typically respond within 24 hours. For urgent projects, call or DM on LinkedIn.
          </p>
        </div>

        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-black/60 rounded-lg border border-white/15 hover:border-white/40 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <info.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">{info.title}</h4>
                <p className="text-gray-400 text-sm">{info.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
