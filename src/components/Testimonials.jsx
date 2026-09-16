import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
    return (
        <section id="testimonials" className="section-padding overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-title font-bold mb-4 tracking-wide"
                    >
                        Client <span className="text-gradient">Feedback</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-300 max-w-2xl mx-auto font-light"
                    >
                        Don't just take my word for it. Here's what my clients and colleagues have to say about our collaboration.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="glass-card p-8 group relative hover:border-red-500/40 transition-colors"
                        >
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/40 opacity-40 group-hover:opacity-100 transition-opacity">
                                <Quote size={20} />
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-full border-2 border-red-500/40 p-0.5 object-cover"
                                />
                                <div>
                                    <h4 className="text-white font-bold font-title tracking-wide">{item.name}</h4>
                                    <p className="text-gray-400 text-sm">{item.role}</p>
                                </div>
                            </div>

                            <p className="text-gray-300 italic leading-relaxed font-light">
                                "{item.text}"
                            </p>

                            <div className="mt-8 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-red-500 text-lg">★</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
