import { motion } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';

const Hackathons = () => {
    const achievements = [
        {
            title: '3rd Position - National Patent & Copyright Conclave',
            description: 'AI-based innovation prototype. National-level competition across institutions.',
            icon: '🥉',
            year: '2025',
            type: 'Competition',
            color: 'yellow'
        },
        {
            title: 'Special Recognition - CodeCraft 2026',
            description: 'Recognized for innovative problem-solving and clean code architecture.',
            icon: '🏆',
            year: '2026',
            type: 'Hackathon',
            color: 'cyan'
        }
    ];

    const getTextColor = (color: string) =>
        color === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';

    const getBorderColor = (color: string) =>
        color === 'yellow' ? 'border-yellow-500/30' : 'border-cyan-500/30';

    return (
        <div className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <span className="text-white/70 text-sm font-semibold tracking-wide uppercase animate-slide-up">Achievements</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-white animate-slide-up delay-200">
                        Recognition
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-medium uppercase tracking-wide ${getTextColor(item.color)}`}>
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-gray-500">•</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {item.year}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hackathons;
