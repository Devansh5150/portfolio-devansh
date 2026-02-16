import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';

const SystemThinking = () => {
    return (
        <div className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    className="p-8 md:p-12 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Brain className="w-10 h-10 text-white mx-auto mb-6" />

                    <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Vision</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-8 text-white leading-tight">
                        What Drives Me
                    </h2>

                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
                        I don't just build features — I architect systems. <span className="text-white font-semibold">Scalable AI systems</span> that
                        merge human insight with machine intelligence. Systems that solve real problems for real people,
                        and compound in value over time.
                    </p>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                        If you're building something that needs to be intelligent, reliable, and production-grade — let's talk.
                    </p>

                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                    >
                        Let's Build Together
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default SystemThinking;
