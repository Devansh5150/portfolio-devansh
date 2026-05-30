import { Brain, Code, Cpu, LineChart, MessageSquare, Terminal } from 'lucide-react';

export const categories = [
  {
    name: "AI & Machine Learning",
    icon: Brain,
    color: "text-purple-400",
    skills: [
      { name: "DeepFace", proof: "Mood-Based Spotify Player" },
      { name: "LangChain", proof: "Tatvam LLM Engine" },
      { name: "Computer Vision", proof: "Real-time emotion detection" },
      { name: "RAG Pipelines", proof: "Ancient text contextual mapping" }
    ]
  },
  {
    name: "Full-Stack Development",
    icon: Code,
    color: "text-cyan-400",
    skills: [
      { name: "Next.js", proof: "Minto, Tatvam platforms" },
      { name: "Node.js", proof: "Torq backend architecture" },
      { name: "React Native", proof: "Torq mobile application" },
      { name: "Supabase/Firebase", proof: "Real-time DB & Auth" }
    ]
  },
  {
    name: "System Architecture",
    icon: Cpu,
    color: "text-green-400",
    skills: [
      { name: "AWS", proof: "Serverless deployment (Tatvam)" },
      { name: "Microservices", proof: "Torq backend structure" },
      { name: "Payment Integration", proof: "Razorpay & Stripe" },
      { name: "API Design", proof: "Modular system flows" }
    ]
  }
];

export const timeline = [
  {
    period: "2023 - Present",
    title: "Entrepreneur & Lead AI Developer",
    description: "Founded Torq and Tatvam, focusing on real-world AI applications and scalable system design. Managing end-to-end product lifecycles.",
    icon: Terminal,
    color: "text-purple-400",
    achievements: ["Successfully onboarded 500+ users for Torq", "Built novel RAG pipeline for Tatvam", "Winner of 5+ Innovation Awards"],
    impact: "Created scalable solutions for roadside assistance and philosophical knowledge access."
  },
  {
    period: "2023",
    title: "Hackathon Champion & Social Impact",
    description: "Developed Minto, a last-mile delivery platform for Tier-2/3 cities, winning Best Social Impact Project.",
    icon: MessageSquare,
    color: "text-cyan-400",
    achievements: ["Onboarded 50+ local vendors", "Optimized delivery logistics by 40%", "Won Best Social Impact Project"],
    impact: "Empowered small businesses through accessible logistics technology."
  },
  {
    period: "2022 - 2023",
    title: "Systems & Integration Engineer",
    description: "Focused on hardware-software integration, including vehicle control systems using EvoFox and CV-based music players.",
    icon: LineChart,
    color: "text-green-400",
    achievements: ["Developed realtime CV detection at 30fps", "Integrated game-controllers with simulation", "Automated OBE for University faculty"],
    impact: "Reduced faculty administrative load by 80% through AttainHub."
  }
];
