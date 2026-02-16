
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, Linkedin, Github, Instagram, Youtube } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '', projectType: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projectTypes = ['AI/ML Project', 'Full-Stack App', 'Consulting', 'Hackathon', 'Other'];

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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-white">
            Let's Work Together
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-2">
            Have an AI product idea, a hackathon that needs a tech lead, or a research collaboration in mind?
            I'd love to hear about it.
          </p>
          <p className="text-gray-500 text-sm">
            I typically respond within 24 hours. For urgent projects, call or DM on LinkedIn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Get in Touch</h3>

            <div className="space-y-4 mb-8">
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

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Project Type Hints */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">What's this about?</label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${formData.projectType === type
                          ? 'bg-white text-black border-white'
                          : 'border-white/20 text-gray-300 hover:border-white/40'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Your Name*</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/15 text-white focus:border-white/40"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email Address*</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-black/60 border-white/15 text-white focus:border-white/40"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Subject*</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-black/60 border-white/15 text-white focus:border-white/40"
                  placeholder="Project discussion"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Message*</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-black/60 border-white/15 text-white focus:border-white/40 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white hover:bg-neutral-200 text-black font-semibold py-3 transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
