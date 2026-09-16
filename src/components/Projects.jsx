import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from "../data/projects";

const categories = ['All', 'Frontend', 'Fullstack', 'Mobile'];

export default function Projects() {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section-padding bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-title font-bold mb-4 tracking-wide"
                        >
                            Featured <span className="text-gradient">Projects</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-300 max-w-xl font-light"
                        >
                            A showcase of backend systems, full-stack applications, and interactive digital products built for scale and performance.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filter === cat
                                    ? 'bg-red-600 text-white shadow-[0_0_18px_rgba(220,38,38,0.5)] border border-red-500/40'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="glass-card group flex flex-col overflow-hidden hover:border-red-500/40 transition-colors"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/80 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-colors" aria-label="GitHub Repository">
                                            <Github size={18} />
                                        </a>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/80 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-colors" aria-label="Live Demo">
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-2.5 py-0.5 rounded-md bg-red-950/40 border border-red-500/30 text-[11px] font-medium tracking-wide text-red-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-hero font-bold mb-3 text-white group-hover:text-red-400 transition-colors tracking-normal">{project.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed flex-grow font-light">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
