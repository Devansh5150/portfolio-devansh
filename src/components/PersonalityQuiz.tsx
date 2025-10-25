import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Brain, Code, Palette, Rocket, Coffee, BookOpen, Zap, Heart } from 'lucide-react';

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      question: "What's your ideal way to solve a problem?",
      options: [
        { text: "Analyze data and find patterns", icon: Brain, color: "from-purple-500 to-pink-500" },
        { text: "Build a creative solution", icon: Palette, color: "from-orange-500 to-red-500" },
        { text: "Write clean, efficient code", icon: Code, color: "from-blue-500 to-cyan-500" },
        { text: "Lead a team to innovate", icon: Rocket, color: "from-green-500 to-emerald-500" }
      ]
    },
    {
      question: "How do you prefer to learn new technologies?",
      options: [
        { text: "Through hands-on projects", icon: Zap, color: "from-yellow-500 to-orange-500" },
        { text: "Reading documentation thoroughly", icon: BookOpen, color: "from-indigo-500 to-purple-500" },
        { text: "Collaborating with others", icon: Heart, color: "from-pink-500 to-rose-500" },
        { text: "Building something innovative", icon: Rocket, color: "from-teal-500 to-cyan-500" }
      ]
    },
    {
      question: "What motivates you most in your work?",
      options: [
        { text: "Solving complex technical challenges", icon: Brain, color: "from-purple-500 to-violet-500" },
        { text: "Creating beautiful user experiences", icon: Palette, color: "from-pink-500 to-purple-500" },
        { text: "Making a positive impact", icon: Heart, color: "from-red-500 to-pink-500" },
        { text: "Building scalable systems", icon: Code, color: "from-blue-500 to-indigo-500" }
      ]
    },
    {
      question: "How do you handle creative blocks?",
      options: [
        { text: "Take a walk and think differently", icon: Coffee, color: "from-amber-500 to-orange-500" },
        { text: "Research and find inspiration", icon: BookOpen, color: "from-green-500 to-teal-500" },
        { text: "Collaborate with others", icon: Heart, color: "from-rose-500 to-pink-500" },
        { text: "Start coding and iterate", icon: Code, color: "from-cyan-500 to-blue-500" }
      ]
    },
    {
      question: "What's your dream project?",
      options: [
        { text: "AI that helps people learn", icon: Brain, color: "from-purple-500 to-pink-500" },
        { text: "A platform that connects communities", icon: Heart, color: "from-red-500 to-orange-500" },
        { text: "A revolutionary mobile app", icon: Rocket, color: "from-green-500 to-teal-500" },
        { text: "An open-source framework", icon: Code, color: "from-blue-500 to-purple-500" }
      ]
    }
  ];

  const personalityTypes = {
    'AI Innovator': {
      description: "You're a natural problem-solver who loves diving deep into data and creating intelligent solutions. You think systematically and enjoy the challenge of making machines understand human behavior.",
      traits: ['Analytical', 'Innovative', 'Detail-oriented', 'Curious'],
      match: 85,
      color: 'from-purple-500 to-pink-500',
      icon: Brain
    },
    'Creative Technologist': {
      description: "You blend technical skills with artistic vision. You believe technology should be beautiful and intuitive, and you love creating experiences that delight users.",
      traits: ['Creative', 'User-focused', 'Aesthetic', 'Intuitive'],
      match: 90,
      color: 'from-orange-500 to-red-500',
      icon: Palette
    },
    'Code Architect': {
      description: "You're passionate about building robust, scalable systems. You love clean code, efficient algorithms, and creating solutions that can handle millions of users.",
      traits: ['Systematic', 'Efficient', 'Reliable', 'Technical'],
      match: 80,
      color: 'from-blue-500 to-cyan-500',
      icon: Code
    },
    'Innovation Leader': {
      description: "You're a natural leader who loves bringing people together to create something amazing. You're entrepreneurial, inspiring, and always thinking about the bigger picture.",
      traits: ['Leadership', 'Visionary', 'Collaborative', 'Ambitious'],
      match: 88,
      color: 'from-green-500 to-emerald-500',
      icon: Rocket
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (userAnswers: number[]) => {
    // Simple scoring system - in a real app, this would be more sophisticated
    const scores = [0, 0, 0, 0]; // AI Innovator, Creative Technologist, Code Architect, Innovation Leader
    
    userAnswers.forEach((answer, questionIndex) => {
      // Each answer maps to a personality type
      scores[answer]++;
    });
    
    const maxScore = Math.max(...scores);
    const resultIndex = scores.indexOf(maxScore);
    const resultTypes = Object.keys(personalityTypes);
    const result = resultTypes[resultIndex] as keyof typeof personalityTypes;
    
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-semibold tracking-wide uppercase">Interactive Quiz</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              DISCOVER MY <span className="italic text-cyan-400">PERSONALITY</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              Take this fun quiz to see how similar your personality is to mine! 
              Answer 5 questions and discover which aspect of my personality you relate to most.
            </p>
            
            <motion.div
              className="bg-slate-800/50 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">What You'll Discover:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Your personality match percentage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Shared traits and interests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300">How we'd work together</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Fun facts about my personality</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <motion.button
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Personality Quiz
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const resultTypes = Object.keys(personalityTypes);
    const resultIndex = Math.floor(Math.random() * resultTypes.length); // Simplified for demo
    const resultType = resultTypes[resultIndex] as keyof typeof personalityTypes;
    const result = personalityTypes[resultType];
    const Icon = result.icon;

    return (
      <div className="min-h-screen py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-20 left-20 w-64 h-64 bg-gradient-to-br ${result.color} opacity-10 rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr ${result.color} opacity-10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <Icon className={`w-20 h-20 mx-auto mb-4 text-transparent bg-gradient-to-r ${result.color} bg-clip-text`} />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                You're a <span className={`italic bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>{resultType}</span>!
              </h2>
              <div className={`inline-block px-6 py-2 bg-gradient-to-r ${result.color} text-white font-semibold rounded-full mb-6`}>
                {result.match}% Match with Devansh
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 max-w-3xl mx-auto mb-8">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{result.description}</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Your Shared Traits:</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {result.traits.map((trait, index) => (
                    <span key={index} className={`px-4 py-2 bg-gradient-to-r ${result.color} text-white rounded-full text-sm font-medium`}>
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">How We'd Work Together:</h3>
                <p className="text-gray-300">
                  {resultType === 'AI Innovator' ? "We'd make an amazing team building intelligent systems! Both analytical and curious, we'd push each other to create breakthrough AI solutions." :
                   resultType === 'Creative Technologist' ? "Perfect match! We'd create beautiful, user-centered experiences that blend technical excellence with artistic vision." :
                   resultType === 'Code Architect' ? "We'd build robust, scalable systems together! Our shared focus on clean code and efficient solutions would create amazing products." :
                   "We'd be unstoppable as innovation partners! Our combined leadership and vision would create transformative solutions."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Take Quiz Again
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect!
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-purple-400 text-sm font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="w-32 bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {questions[currentQuestion].options.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`p-6 rounded-xl border transition-all duration-300 text-left group ${
                  index % 2 === 0 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500/50' 
                    : 'bg-slate-800/30 border-slate-600 hover:border-cyan-500/50'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300">
                    {option.text}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={resetQuiz}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            ← Back to Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityQuiz;
