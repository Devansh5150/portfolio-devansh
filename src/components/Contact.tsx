
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
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'work.devansh.datta@gmail.com', link: 'mailto:work.devansh.datta@gmail.com' },
    { icon: Phone, title: 'Phone', value: '9871993246', link: 'tel:9871993246' },
    { icon: Linkedin, title: 'LinkedIn', value: 'linkedin.com/in/devansh-datta06', link: 'https://www.linkedin.com/in/devansh-datta06' },
    { icon: Github, title: 'GitHub', value: 'github.com/Devansh5150', link: 'https://github.com/Devansh5150' },
    { icon: Instagram, title: 'Instagram', value: '@devansh.datta', link: 'https://www.instagram.com/devansh.datta/' },
    { icon: Youtube, title: 'YouTube', value: '@devanshdatta', link: 'https://www.youtube.com/@devanshdatta' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/devansh-datta06', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/Devansh5150', icon: Github },
    { name: 'Instagram', url: 'https://www.instagram.com/devansh.datta/', icon: Instagram },
    { name: 'YouTube', url: 'https://www.youtube.com/@devanshdatta', icon: Youtube },
    { name: 'Email', url: 'mailto:work.devansh.datta@gmail.com', icon: Mail },
    { name: 'Phone', url: 'tel:9871993246', icon: Phone }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
            Get in touch
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and explore how we can work together 
            to create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-black/60 rounded-lg border border-white/15 hover:border-white/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{info.title}</h4>
                    <p className="text-gray-300 text-sm">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-6 bg-black/60 rounded-lg border border-white/15">
              <h4 className="text-lg font-semibold text-white mb-4">Why Work With Me?</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">Fast</div>
                  <div className="text-xs text-gray-400">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Quality</div>
                  <div className="text-xs text-gray-400">Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Leave a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  rows={6}
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
