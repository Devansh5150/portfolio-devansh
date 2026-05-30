export interface Project {
  title: string;
  status: string;
  description: string;
  bullets: {
    problem: string;
    role: string;
    impact: string;
  };
  tech: string[];
  image: string;
  category: string;
  problemStatement: string;
  detailedDescription: string;
  architectureFlow: string;
  architectureDetails: string[];
  features: string[];
  challenges: string[];
  github: string;
  demo: string;
  timeline: string;
  team: string;
  awards: string[];
}

export const primaryProjects: Project[] = [
  {
    title: 'Torq - AI Emergency Vehicle Support',
    status: 'Completed',
    description: 'On-demand roadside assistance platform connecting stranded drivers with service providers through AI matching and real-time tracking. Built as a startup, served 500+ users.',
    bullets: {
      problem: 'No unified real-time platform for emergency roadside service in remote areas',
      role: 'Founded and led product development end-to-end - architecture, AI chatbot, payment flow',
      impact: 'Served 500+ users · Modular microservice backend · Razorpay escrow integration'
    },
    tech: ['React Native', 'Node.js', 'Firebase', 'PostgreSQL', 'OpenAI API', 'Razorpay'],
    image: '🚗',
    category: 'Mobile App',
    problemStatement: 'Drivers stranded due to fuel shortages or vehicle breakdowns in remote areas face long wait times and unreliable service. There was no unified platform connecting emergency service providers with users in real-time.',
    detailedDescription: 'A comprehensive emergency vehicle support platform that connects drivers with service providers through intelligent matching. Built as a startup venture, this platform addresses real-world problems in emergency vehicle assistance with a modular backend architecture.',
    architectureFlow: 'User App → Backend API (Node.js + Express) → PostgreSQL Database → AI Layer (OpenAI GPT) → Payment Gateway (Razorpay) → Push Notifications (Firebase FCM)',
    architectureDetails: [
      'Modular backend: Auth Module, Service Matching Module, Payment Module, Notification Module',
      'Real-time tracking: Firebase Realtime DB + Geolocation API for live driver/provider positions',
      'OpenAI chatbot: Context-aware assistant trained on FAQ data for instant user support',
      'Payment flow: Razorpay integration with escrow-like hold until service completion'
    ],
    features: [
      'Real-time GPS tracking with live driver-provider matching',
      'AI-powered chatbot for instant assistance (OpenAI GPT)',
      'Secure payment integration with Razorpay escrow flow',
      'Multi-vendor marketplace with provider rating system',
      'Emergency SOS with priority routing',
      'Push notification pipeline via Firebase FCM'
    ],
    challenges: [
      'Achieving sub-second location accuracy for real-time tracking in low-connectivity zones',
      'Implementing secure payment escrow flow with Razorpay for service-based transactions',
      'Training the OpenAI chatbot with domain-specific emergency assistance context',
      'Designing a horizontally scalable microservice architecture for peak-load scenarios'
    ],
    github: 'https://github.com/Devansh5150',
    demo: '#',
    timeline: '6 months',
    team: 'CEO & Lead Developer',
    awards: ['Startup Innovation Award']
  },
  {
    title: 'Tatvam - LLM Contextual Mapping Engine',
    status: 'Completed',
    description: 'LLM-powered platform connecting ancient philosophical texts with modern AI through RAG pipelines, ethical guardrails, and tiered subscription access.',
    bullets: {
      problem: 'Ancient philosophical knowledge is scattered and existing AI lacks cultural sensitivity',
      role: 'Designed the RAG pipeline, ethical guardrail system, and AWS deployment architecture',
      impact: 'Novel AI application bridging philosophy and technology · Stripe-based 3-tier access · Serverless AWS deployment'
    },
    tech: ['Next.js', 'Python', 'LangChain', 'OpenAI API', 'Supabase', 'Stripe', 'AWS'],
    image: '🧘',
    category: 'AI Platform',
    problemStatement: 'Spiritual and philosophical knowledge is scattered across ancient texts, making it inaccessible to modern seekers. Existing AI tools lack the contextual depth and ethical sensitivity needed for such guidance.',
    detailedDescription: 'Tatvam uses an LLM-based contextual mapping engine to bridge ancient philosophical traditions with modern AI capabilities. It provides personalized, ethically-grounded guidance while respecting cultural sensitivities through carefully designed guardrails.',
    architectureFlow: 'User Interface (Next.js) → API Gateway → LLM Contextual Engine (LangChain + OpenAI) → Vector DB (Embeddings) → Subscription Layer (Stripe) → Cloud Infrastructure (AWS)',
    architectureDetails: [
      'LLM Contextual Mapping: LangChain pipeline with custom prompt templates and retrieval-augmented generation (RAG)',
      'Subscription access control: Stripe-based tiered access (Free, Premium, Scholar) with Supabase RLS policies',
      'Ethical guardrails: Content filtering layer with sensitivity scoring and cultural respect checks',
      'Scalable cloud deployment: AWS EC2 + Lambda for burst traffic, CloudFront CDN for static assets'
    ],
    features: [
      'LLM-based contextual mapping engine with RAG pipeline',
      'Subscription access control system (Free/Premium/Scholar tiers)',
      'Ethical guardrails with sensitivity scoring',
      'Personalized guidance based on user context and history',
      'Vector database for semantic search across ancient texts',
      'Scalable cloud deployment on AWS infrastructure'
    ],
    challenges: [
      'Building a culturally sensitive LLM pipeline that respects philosophical traditions',
      'Implementing effective RAG with ancient texts that have multiple interpretations',
      'Designing subscription tiers with proper access control using Supabase RLS',
      'Deploying a cost-efficient serverless architecture on AWS for variable traffic'
    ],
    github: 'https://github.com/Devansh5150',
    demo: '#',
    timeline: '4 months',
    team: 'Lead AI Engineer',
    awards: ['Innovation in AI Ethics']
  },
  {
    title: 'Minto - Last-Mile Delivery Platform',
    status: 'Completed',
    description: 'Delivery platform empowering Tier-2/3 city vendors by eliminating dark-store dependency. Built proximity-based delivery matching in 48 hours.',
    bullets: {
      problem: 'Small vendors in smaller cities can\'t afford dark-store logistics',
      role: 'Built real-time order mapping, vendor analytics dashboard, and delivery assignment algorithm',
      impact: '50+ vendors onboarded · 40% delivery efficiency improvement · Won Best Social Impact Project'
    },
    tech: ['Next.js', 'Node.js', 'Supabase', 'Tailwind CSS', 'Google Maps API'],
    image: '📦',
    category: 'Web Platform',
    problemStatement: 'Small vendors in Tier-2 and Tier-3 cities are excluded from the delivery economy due to expensive dark-store requirements and complex logistics systems designed for urban centers.',
    detailedDescription: 'A social impact project designed to empower local vendors in smaller cities by providing them with efficient delivery solutions. The platform eliminates the need for expensive dark stores while optimizing logistics through real-time order mapping and vendor analytics.',
    architectureFlow: 'Vendor Dashboard → Order Management API → Real-time Mapping Engine (Google Maps) → Delivery Assignment Algorithm → Customer Tracking Interface',
    architectureDetails: [
      'Vendor onboarding system: Multi-step registration with document verification and inventory setup',
      'Real-time order mapping: Google Maps API integration for live order tracking and delivery route optimization',
      'Vendor analytics dashboard: Sales trends, delivery performance metrics, and customer feedback aggregation',
      'Delivery assignment algorithm: Proximity-based matching with load balancing across available delivery agents'
    ],
    features: [
      'Vendor onboarding with multi-step registration and verification',
      'Real-time order mapping with Google Maps integration',
      'Vendor analytics dashboard with sales and performance metrics',
      'Proximity-based delivery assignment algorithm',
      'Mobile-responsive customer tracking interface',
      'Inventory management with low-stock alerts'
    ],
    challenges: [
      'Building a delivery assignment algorithm that works with sparse delivery networks in smaller cities',
      'Implementing real-time order tracking with Google Maps for multiple concurrent deliveries',
      'Designing a vendor analytics dashboard that surfaces actionable insights from limited data',
      'Optimizing database queries for real-time order management at scale'
    ],
    github: 'https://github.com/Devansh5150',
    demo: '#',
    timeline: '48 hours (Hackathon)',
    team: '4 members',
    awards: ['Best Social Impact Project']
  },
  {
    title: 'Mood-Based Spotify Player',
    status: 'Completed',
    description: 'Real-time emotion detection via webcam → dynamic Spotify playlist generation. Detects 7 emotions through DeepFace and maps them to music genres.',
    bullets: {
      problem: 'Music recommendation relies on history, not real-time emotional state',
      role: 'Built the entire CV pipeline - face detection, emotion classification, Spotify OAuth, playlist generation',
      impact: 'Real-time emotion-to-music at 30fps · 7-emotion classification · Won Best AI Innovation Award'
    },
    tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'pyttsx3'],
    image: '🎵',
    category: 'AI/Computer Vision',
    problemStatement: 'Music discovery is often manual and disconnected from the listener\'s emotional state. Existing recommendation systems rely on listening history rather than real-time emotional context.',
    detailedDescription: 'An innovative AI-powered music player that revolutionizes how we discover music. Using advanced computer vision techniques, the system analyzes facial expressions in real-time to understand emotional states and curates personalized playlists dynamically.',
    architectureFlow: 'Webcam Feed → OpenCV Preprocessing → DeepFace Emotion Classifier → Mood-to-Genre Mapping → Spotify API → Audio Playback + Voice Feedback (pyttsx3)',
    architectureDetails: [
      'Video pipeline: OpenCV captures frames, applies face detection, and sends cropped faces to DeepFace',
      'Emotion classification: DeepFace analyzes 7 emotions (happy, sad, angry, surprise, fear, disgust, neutral)',
      'Mood mapping: Custom algorithm maps detected emotions to Punjabi music genres and energy levels',
      'Spotify integration: OAuth2 flow with dynamic playlist generation and track queueing'
    ],
    features: [
      'Real-time facial emotion detection via DeepFace',
      'Dynamic Spotify playlist generation based on mood',
      'Voice feedback with pyttsx3 for accessibility',
      'Multi-language support with Punjabi music focus',
      'Emotion history tracking and mood timeline',
      'Cross-platform Python application'
    ],
    challenges: [
      'Optimizing emotion detection accuracy across diverse lighting conditions',
      'Real-time video processing performance at 30fps without frame drops',
      'Handling Spotify API rate limiting during rapid mood transitions',
      'Cross-cultural music recommendation with limited labeled Punjabi music data'
    ],
    github: 'https://github.com/Devansh5150',
    demo: '#',
    timeline: '3 months',
    team: 'Solo Project',
    awards: ['Best AI Innovation Award']
  }
];

export interface SecondaryProject {
  title: string;
  description: string;
  impact: string;
  tech: string[];
  image: string;
  github: string;
}

export const secondaryProjects: SecondaryProject[] = [
  {
    title: 'AttainHub',
    description: 'OBE automation platform adopted by my college. Automated CO/PO mapping, attainment tracking, and accreditation reporting.',
    impact: 'Reduced faculty manual work by 80%',
    tech: ['React', 'Node.js', 'Database Design'],
    image: '🎓',
    github: 'https://github.com/Devansh5150'
  },
  {
    title: 'Mentor-Mentee App',
    description: 'Mentorship scheduling and progress tracking platform. Built the entire frontend with smart matching and goal tracking.',
    impact: 'Facilitated 200+ mentor-mentee relationships',
    tech: ['React Native', 'Supabase', 'UI/UX Design'],
    image: '👥',
    github: 'https://github.com/Devansh5150'
  },
  {
    title: 'Madat - Shopify Automation Tool',
    description: 'Shopify automation platform streamlining store management, inventory updates, and order processing workflows for e-commerce businesses.',
    impact: 'Automated repetitive e-commerce workflows, reducing manual operations',
    tech: ['Shopify API', 'Node.js', 'React', 'Webhooks'],
    image: '🛒',
    github: 'https://github.com/Devansh5150'
  },
  {
    title: 'EvoFox Vehicle Control System',
    description: 'Real-time vehicle control simulation using an EvoFox game controller, mapping joystick inputs to vehicle commands to simulate smart transport systems.',
    impact: 'Demonstrated real-time hardware-software integration for autonomous control',
    tech: ['Python', 'EvoFox SDK', 'Real-time I/O', 'Simulation'],
    image: '🎮',
    github: 'https://github.com/Devansh5150'
  }
];
