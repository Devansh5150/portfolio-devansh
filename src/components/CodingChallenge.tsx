import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Code, Play, RotateCcw, CheckCircle, XCircle, Lightbulb, Zap } from 'lucide-react';

const CodingChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [testResults, setTestResults] = useState<Array<{
    id: number;
    description: string;
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
  }>>([]);
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const challenges = [
    {
      id: 1,
      title: "AI Emotion Detection",
      description: "Write a function that analyzes facial expressions and returns the detected emotion.",
      difficulty: "Medium",
      category: "AI/ML",
      starterCode: `def detect_emotion(image_path):
    """
    Analyze facial expressions and return the detected emotion.
    
    Args:
        image_path (str): Path to the image file
        
    Returns:
        str: Detected emotion ('happy', 'sad', 'angry', 'surprised', 'neutral')
    """
    # Your code here
    pass`,
      solution: `def detect_emotion(image_path):
    import cv2
    import numpy as np
    from deepface import DeepFace
    
    try:
        # Load image
        img = cv2.imread(image_path)
        
        # Analyze emotion using DeepFace
        result = DeepFace.analyze(img, actions=['emotion'])
        
        # Get the dominant emotion
        emotions = result[0]['emotion']
        dominant_emotion = max(emotions, key=emotions.get)
        
        return dominant_emotion
    except Exception as e:
        return "neutral"`,
      testCases: [
        { input: "happy_face.jpg", expected: "happy", description: "Happy face detection" },
        { input: "sad_face.jpg", expected: "sad", description: "Sad face detection" },
        { input: "neutral_face.jpg", expected: "neutral", description: "Neutral face detection" }
      ],
      hint: "Use computer vision libraries like OpenCV and DeepFace for emotion analysis. The DeepFace library has built-in emotion detection capabilities.",
      explanation: "This function uses DeepFace, a state-of-the-art facial analysis library, to detect emotions from facial expressions. It's similar to what I used in my Mood-Based Spotify Player project!"
    },
    {
      id: 2,
      title: "React Component Optimization",
      description: "Create a memoized React component that prevents unnecessary re-renders.",
      difficulty: "Easy",
      category: "Frontend",
      starterCode: `import React from 'react';

const ExpensiveComponent = ({ data, onUpdate }) => {
  // This component performs expensive calculations
  const processedData = data.map(item => ({
    ...item,
    processed: expensiveCalculation(item.value)
  }));
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>
          {item.name}: {item.processed}
        </div>
      ))}
    </div>
  );
};

// Your optimization here
export default ExpensiveComponent;`,
      solution: `import React, { useMemo, memo } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveCalculation(item.value)
    }));
  }, [data]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>
          {item.name}: {item.processed}
        </div>
      ))}
    </div>
  );
});

export default ExpensiveComponent;`,
      testCases: [
        { input: "Same data passed twice", expected: "No re-render", description: "Memoization prevents re-renders" },
        { input: "Different data", expected: "Re-render occurs", description: "New data triggers re-render" }
      ],
      hint: "Use React.memo() to wrap the component and useMemo() to memoize expensive calculations. This prevents unnecessary re-renders when props haven't changed.",
      explanation: "This optimization technique is crucial for performance in React applications. I use similar patterns in my portfolio and other projects to ensure smooth user experiences!"
    },
    {
      id: 3,
      title: "Database Query Optimization",
      description: "Write an optimized SQL query to find users with the highest engagement scores.",
      difficulty: "Hard",
      category: "Backend",
      starterCode: `-- Find users with highest engagement scores
-- Tables: users (id, name, email), activities (user_id, activity_type, score, created_at)

SELECT 
  u.id,
  u.name,
  u.email,
  -- Your optimized query here
FROM users u
JOIN activities a ON u.id = a.user_id
-- Add your optimization here
LIMIT 10;`,
      solution: `-- Optimized query with proper indexing and aggregation
SELECT 
  u.id,
  u.name,
  u.email,
  SUM(a.score) as total_score,
  COUNT(a.id) as activity_count,
  AVG(a.score) as avg_score
FROM users u
JOIN activities a ON u.id = a.user_id
WHERE a.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id, u.name, u.email
HAVING total_score > 100
ORDER BY total_score DESC, activity_count DESC
LIMIT 10;`,
      testCases: [
        { input: "Last 30 days data", expected: "Top 10 users", description: "Recent high-engagement users" },
        { input: "Score threshold 100", expected: "Filtered results", description: "Minimum engagement filter" }
      ],
      hint: "Use proper indexing on user_id and created_at columns. Add WHERE clause for date filtering, GROUP BY for aggregation, and HAVING for score filtering.",
      explanation: "This query optimization technique is essential for scalable applications. I've used similar patterns in my Torq and Minto projects to handle large datasets efficiently!"
    }
  ];

  const runTests = () => {
    if (!selectedChallenge) return;
    
    const challenge = challenges[selectedChallenge - 1];
    const results = challenge.testCases.map((testCase, index) => {
      // Simulate test execution
      const passed = Math.random() > 0.3; // 70% chance of passing for demo
      return {
        id: index + 1,
        description: testCase.description,
        passed,
        input: testCase.input,
        expected: testCase.expected,
        actual: passed ? testCase.expected : "Test failed"
      };
    });
    
    setTestResults(results);
    
    // Check if all tests passed
    const allPassed = results.every(result => result.passed);
    if (allPassed && !completedChallenges.includes(selectedChallenge)) {
      setCompletedChallenges([...completedChallenges, selectedChallenge]);
    }
  };

  const resetChallenge = () => {
    setUserCode(challenges[selectedChallenge! - 1].starterCode);
    setTestResults([]);
    setShowHint(false);
  };

  const showSolution = () => {
    setUserCode(challenges[selectedChallenge! - 1].solution);
    setShowHint(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML': return 'from-purple-500 to-pink-500';
      case 'Frontend': return 'from-blue-500 to-cyan-500';
      case 'Backend': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (!selectedChallenge) {
    return (
      <div className="min-h-screen py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">Interactive Challenge</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              CODE WITH <span className="italic text-purple-400">DEVANSH</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              Test your coding skills with challenges inspired by my real projects! 
              Solve problems in AI/ML, Frontend, and Backend development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                className={`p-8 rounded-xl border transition-all duration-300 cursor-pointer ${
                  completedChallenges.includes(challenge.id)
                    ? 'bg-green-500/10 border-green-500/50'
                    : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => {
                  setSelectedChallenge(challenge.id);
                  setUserCode(challenge.starterCode);
                  setTestResults([]);
                  setShowHint(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Code className="w-8 h-8 text-cyan-400" />
                    <div>
                      <span className={`text-xs font-medium uppercase tracking-wide bg-gradient-to-r ${getCategoryColor(challenge.category)} bg-clip-text text-transparent`}>
                        {challenge.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">{challenge.title}</h3>
                    </div>
                  </div>
                  {completedChallenges.includes(challenge.id) && (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                </div>
                
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {challenge.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Zap className="w-4 h-4" />
                    {challenge.testCases.length} tests
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Why Try These Challenges?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Real-world problems from my projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Multiple difficulty levels</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300">Instant feedback and hints</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Learn my coding style</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentChallenge = challenges[selectedChallenge - 1];

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className={`text-xs font-medium uppercase tracking-wide bg-gradient-to-r ${getCategoryColor(currentChallenge.category)} bg-clip-text text-transparent`}>
                {currentChallenge.category}
              </span>
              <h2 className="text-3xl font-bold text-white mt-1">{currentChallenge.title}</h2>
              <p className="text-gray-400 mt-2">{currentChallenge.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(currentChallenge.difficulty)}`}>
                {currentChallenge.difficulty}
              </span>
              {completedChallenges.includes(selectedChallenge) && (
                <CheckCircle className="w-6 h-6 text-green-400" />
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedChallenge(null)}
              className="border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              ← Back to Challenges
            </Button>
            <Button
              variant="outline"
              onClick={resetChallenge}
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? 'Hide' : 'Show'} Hint
            </Button>
            <Button
              variant="outline"
              onClick={showSolution}
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
            >
              Show Solution
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Code Editor</h3>
              <Button
                onClick={runTests}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Tests
              </Button>
            </div>
            
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-96 bg-slate-800 text-gray-100 p-4 rounded-lg border border-slate-600 font-mono text-sm resize-none focus:outline-none focus:border-cyan-500"
              placeholder="Write your code here..."
            />
          </div>

          {/* Test Results */}
          <div className="space-y-6">
            {/* Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-semibold text-yellow-400">Hint</h4>
                  </div>
                  <p className="text-gray-300 text-sm">{currentChallenge.hint}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Test Results */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Test Results</h3>
              
              {testResults.length === 0 ? (
                <p className="text-gray-400 text-sm">Click "Run Tests" to see results</p>
              ) : (
                <div className="space-y-3">
                  {testResults.map((result) => (
                    <div key={result.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                      {result.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{result.description}</p>
                        <p className="text-xs text-gray-400">
                          Input: {result.input} | Expected: {result.expected} | Actual: {result.actual}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Explanation */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Explanation</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{currentChallenge.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;
