import { motion } from 'framer-motion';
import { Trophy, Award, Star, Calendar, MapPin } from 'lucide-react';

const Hackathons = () => {
    const achievements = [
        {
            title: 'Third World Innovation Patent & Copyright Conclave',
            achievement: '3rd Position',
            description: 'Secured 3rd position for an AI-based innovation prototype — competing against teams from institutions across the country in a national-level patent and innovation conclave.',
            icon: '🥉',
            color: 'yellow',
            year: '2025',
            type: 'Competition',
            highlights: [
                'National-level innovation competition',
                'AI-based innovation prototype',
                'Patent-worthy concept development',
                'Cross-institutional competition'
            ]
        },
        {
            title: 'CodeCraft 2026',
            achievement: 'Special Recognition',
            description: 'Received special recognition at CodeCraft 2026 for innovative problem-solving approach and clean code architecture in a competitive coding and development challenge.',
            icon: '🏆',
            color: 'cyan',
            year: '2026',
            type: 'Hackathon',
            highlights: [
                'Innovative problem-solving approach',
                'Clean code architecture',
                'Competitive development challenge',
                'Special jury recognition'
            ]
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            yellow: 'border-yellow-500/20 hover:border-yellow-500/50',
            cyan: 'border-cyan-500/20 hover:border-cyan-500/50',
            purple: 'border-purple-500/20 hover:border-purple-500/50'
        };
        return colors[color] || 'border-white/15 hover:border-white/30';
    };

    const getTextColor = (color: string) => {
        const colors: Record<string, string> = {
            yellow: 'text-yellow-400',
            cyan: 'text-cyan-400',
            purple: 'text-purple-400'
        };
        return colors[color] || 'text-white';
    };

    const getBgColor = (color: string) => {
        const colors: Record<string, string> = {
            yellow: 'bg-yellow-400',
            cyan: 'bg-cyan-400',
            purple: 'bg-purple-400'
        };
        return colors[color] || 'bg-white';
    };

    return (
        <div className="min-h-screen py-20 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <span className="text-white/70 text-sm font-semibold tracking-wide uppercase animate-slide-up">Achievements</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white animate-slide-up delay-200">
                        Hackathons & Achievements
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300">
                        Competing, building, and winning — showcasing innovation under pressure
                        and earning recognition at national-level competitions.
                    </p>
                </div>

                {/* Achievement Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-3xl">{item.icon}</span>
                                </div>
                                <div className="flex-1">
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
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getColorClasses(item.color)} ${getTextColor(item.color)} text-sm font-semibold`}>
                                    <Trophy className="w-4 h-4" />
                                    {item.achievement}
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6">{item.description}</p>

                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Highlights:</h4>
                                <ul className="space-y-1">
                                    {item.highlights.map((highlight, hIndex) => (
                                        <li key={hIndex} className="flex items-start text-gray-400 text-sm">
                                            <span className={`w-2 h-2 ${getBgColor(item.color)} rounded-full mr-3 mt-1.5 flex-shrink-0`}></span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-black/60 rounded-xl border border-white/15">
                        <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">2+</div>
                        <div className="text-xs text-gray-400">Major Awards</div>
                    </div>
                    <div className="text-center p-6 bg-black/60 rounded-xl border border-white/15">
                        <Star className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">National</div>
                        <div className="text-xs text-gray-400">Level Competitions</div>
                    </div>
                    <div className="text-center p-6 bg-black/60 rounded-xl border border-white/15">
                        <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">3rd</div>
                        <div className="text-xs text-gray-400">Patent Conclave</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hackathons;
