import { motion } from 'framer-motion';
import { BookOpen, Lightbulb } from 'lucide-react';

const ResearchPublications = () => {
    return (
        <div className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <span className="text-white/70 text-sm font-semibold tracking-wide uppercase animate-slide-up">Research</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-white animate-slide-up delay-200">
                        Published Work
                    </h2>
                </div>

                <motion.div
                    className="p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">📚</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">Book Chapter</span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-medium">
                                    <BookOpen className="w-3 h-3" />
                                    Published
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">AI and the Soul</h3>
                        </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                        Exploring the intersections of artificial intelligence, creativity, and consciousness.
                        Examines how generative AI challenges authorship, and proposes a framework for AI augmenting human expression.
                    </p>

                    <div className="mb-6">
                        <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                            Key Highlights
                        </h4>
                        <div className="space-y-2">
                            {[
                                'Explores the philosophical tension between algorithmic decision-making and human intuition',
                                'Examines how generative AI challenges traditional notions of creativity and authorship',
                                'Proposes a framework for understanding AI\'s role in augmenting - not replacing - human expression'
                            ].map((highlight, index) => (
                                <div key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                    {highlight}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['AI', 'Consciousness', 'Creativity', 'Philosophy of Mind'].map((topic, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ResearchPublications;
