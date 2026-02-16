import { motion } from 'framer-motion';
import { Brain, ArrowRight, Cpu, Network, Sparkles } from 'lucide-react';

const SystemThinking = () => {
    return (
        <div className="py-20 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    className="p-8 md:p-12 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Icon cluster */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <Cpu className="w-6 h-6 text-cyan-400 opacity-60" />
                        <Brain className="w-10 h-10 text-white" />
                        <Network className="w-6 h-6 text-purple-400 opacity-60" />
                    </div>

                    <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Vision</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white leading-tight">
                        Building Intelligent Systems<br className="hidden md:block" /> for the Next Decade
                    </h2>

                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                        Focused on architecting <span className="text-white font-semibold">scalable AI systems</span> that
                        merge human insight with machine intelligence — not just building features, but designing
                        <span className="text-white font-semibold"> impact-driven ecosystems</span> that solve real problems
                        and empower real people.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-gray-300 text-sm">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            System Architecture
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-gray-300 text-sm">
                            <Brain className="w-4 h-4 text-purple-400" />
                            AI Engineering
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-gray-300 text-sm">
                            <Network className="w-4 h-4 text-cyan-400" />
                            Scalable Design
                        </span>
                    </div>

                    <div className="mt-10">
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                        >
                            Let's Build Together
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SystemThinking;
