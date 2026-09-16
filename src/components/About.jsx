import { motion } from 'framer-motion';
import { User, Code2, Briefcase, Award } from 'lucide-react';
import me from "../assets/me.webp";
const achievements = [
    { icon: Code2, title: 'Reliable APIs', desc: 'Engineered for resilience, concurrency, and zero downtime.' },
    { icon: Briefcase, title: 'Full Stack & Backend', desc: 'Production-ready TypeScript, NestJS, and PostgreSQL.' },
    { icon: Award, title: 'Performance First', desc: 'Stress-tested architectures and disciplined load testing.' },
];

export default function About() {
    return (
        <section id="about" className="section-padding bg-gray-950/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-title font-bold mb-8 tracking-wide">
                            Engineering <span className="text-gradient">Resilient Backends</span> <br />
                            and Scalable Systems
                        </h2>
                       <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                            <p>
                                I am a Full Stack and Backend Developer specializing in architecting and shipping reliable, scalable backend systems. My core focus is building high-performance APIs with <span className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4">TypeScript</span>, <span className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4">NestJS</span>, and <span className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4">PostgreSQL</span> that withstand real-world production demands.
                            </p>
                            <p>
                                Based in Addis Ababa, I collaborate with startups to turn ambitious product visions into bulletproof systems. Whether it is designing robust database schemas, implementing strict validation pipelines, or running rigorous load-tests before launch, I ensure every endpoint delivers speed, integrity, and peace of mind.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                            {achievements.map((item, index) => (
                                <div key={index} className="glass-card p-6 border border-white/5 hover:border-red-500/40 transition-colors">
                                    <item.icon className="text-red-500 mb-4" size={32} />
                                    <h3 className="text-white font-bold mb-2 font-title tracking-wide">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden relative z-10 group border border-white/15 shadow-2xl shadow-red-950/40 bg-zinc-950">
                            <img
                                src={me}
                                alt="Naol Zewdie"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 transition-all duration-300">
                                <p className="text-white text-sm font-title font-bold tracking-wide">Naol Zewdie</p>
                                <p className="text-red-400 text-xs font-hero">Full Stack & Backend Developer</p>
                            </div>
                        </div>
                        {/* Decors */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/15 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-950/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
