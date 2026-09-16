import { motion } from 'framer-motion';
import { MousePointer2, Rocket, Download, ArrowRight } from 'lucide-react';
import naolPhoto from '../assets/naol.webp';

const stats = [
    { label: 'Projects Completed', value: '6+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Delivery Speed', value: 'Fast' },
];

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-200 text-xs sm:text-sm font-hero tracking-wider mb-6 shadow-lg shadow-red-950/60">
                        <img src={naolPhoto} alt="Naol Zewdie" width="24" height="24" decoding="async" className="w-6 h-6 rounded-full object-cover object-top border border-red-500/60 shadow-sm" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Available for New Projects & Startups</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-hero font-bold mb-6 tracking-tight leading-[1.1]">
                        Hi, I'm <span className="text-gradient">Naol Zewdie</span> <br />
                        <span className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold tracking-normal">
                            Full Stack & Backend Developer
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Backend Developer helping startups ship reliable APIs — <span className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4">TypeScript</span>, <span className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4">NestJS</span>, <span className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4">PostgreSQL</span>, and the discipline to load-test before it becomes a problem.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    <a href="#contact" className="btn-primary flex items-center gap-2 group font-hero tracking-wide">
                        Get In Touch <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#projects" className="btn-secondary flex items-center gap-2 group font-hero tracking-wide">
                        View Projects <Rocket className="group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <a href="#contact" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors py-2 px-4 font-hero text-sm">
                        <Download size={18} /> Contact & CV
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mt-20 border-t border-white/10 pt-10"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-3xl md:text-4xl font-hero font-bold text-white mb-1">{stat.value}</span>
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-medium">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hidden md:block"
                >
                    <div className="w-6 h-10 border-2 border-red-900/60 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
