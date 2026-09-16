import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-6 border-t border-white/10 bg-black/70 backdrop-blur-md relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                >
                    <span className="w-8 h-8 rounded bg-gradient-to-br from-red-600 via-red-700 to-black flex items-center justify-center font-logo text-lg text-white border border-red-500/40 shadow-md shadow-red-700/30">N</span>
                    <span className="text-2xl font-logo tracking-widest text-white">NAOL</span>
                </motion.div>

                <p className="text-gray-400 text-sm">
                    &copy; {currentYear} Naol Zewdie. Built with passion, reliable architecture, and code.
                </p>

                <div className="flex gap-8 text-sm text-gray-400 uppercase tracking-widest font-medium">
                    <a href="#home" className="hover:text-red-400 transition-colors">Home</a>
                    <a href="#projects" className="hover:text-red-400 transition-colors">Projects</a>
                    <a href="#contact" className="hover:text-red-400 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
