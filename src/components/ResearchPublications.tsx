import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Lightbulb, Quote } from 'lucide-react';

const ResearchPublications = () => {
    const publications = [
        {
            type: 'Book Chapter',
            title: 'AI and the Soul',
            description: 'A published chapter exploring the intersections of artificial intelligence, creativity, and consciousness — examining how AI reshapes human identity, expression, and the philosophical boundaries between machine logic and human emotion.',
            topics: ['Artificial Intelligence', 'Consciousness', 'Creativity', 'Human Identity', 'Philosophy of Mind'],
            icon: '📚',
            color: 'cyan',
            highlights: [
                'Explores the philosophical tension between algorithmic decision-making and human intuition',
                'Examines how generative AI challenges traditional notions of creativity and authorship',
                'Proposes a framework for understanding AI\'s role in augmenting — not replacing — human expression'
            ]
        }
    ];

    return (
        <div className="min-h-screen py-20 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <span className="text-white/70 text-sm font-semibold tracking-wide uppercase animate-slide-up">Research</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white animate-slide-up delay-200">
                        Research & Thought Leadership
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300">
                        Contributing to the discourse on artificial intelligence, creativity, and the future of technology
                        through published work and ongoing research.
                    </p>
                </div>

                <div className="space-y-8">
                    {publications.map((pub, index) => (
                        <motion.div
                            key={index}
                            className="p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                                        <span className="text-3xl">{pub.icon}</span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                        <div>
                                            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">{pub.type}</span>
                                            <h3 className="text-2xl font-bold text-white mt-1">{pub.title}</h3>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-medium">
                                                <BookOpen className="w-3 h-3" />
                                                Published
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed mb-6">{pub.description}</p>

                                    {/* Key Highlights */}
                                    <div className="mb-6">
                                        <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                                            Key Highlights
                                        </h4>
                                        <div className="space-y-2">
                                            {pub.highlights.map((highlight, hIndex) => (
                                                <div key={hIndex} className="flex items-start gap-2 text-gray-400 text-sm">
                                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                                    {highlight}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Research Topics */}
                                    <div className="flex flex-wrap gap-2">
                                        {pub.topics.map((topic, tIndex) => (
                                            <span
                                                key={tIndex}
                                                className="px-3 py-1 text-xs rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quote Block */}
                <motion.div
                    className="mt-12 p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Quote className="w-8 h-8 text-cyan-400 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-300 italic text-lg max-w-2xl mx-auto leading-relaxed">
                        "The question isn't whether AI can think — it's whether we can understand what it means
                        for machines to participate in the creative process alongside us."
                    </p>
                    <p className="text-white/60 text-sm mt-3">— From "AI and the Soul"</p>
                </motion.div>
            </div>
        </div>
    );
};

export default ResearchPublications;
