import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-gray-950/80 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold tracking-tighter"
                >
                    <a href="#home" className="flex items-center gap-2.5 group">
                        <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 via-red-700 to-black flex items-center justify-center font-logo text-xl text-white shadow-lg shadow-red-700/40 border border-red-500/40 group-hover:scale-105 transition-transform">
                            N
                        </span>
                        <span className="font-logo text-2xl tracking-widest text-white group-hover:text-red-400 transition-colors">
                            NAOL
                        </span>
                    </a>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-8">
                        {navLinks.map((link, index) => (
                            <motion.li
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <a
                                    href={link.href}
                                    className="text-sm font-hero font-medium text-gray-300 hover:text-red-400 transition-colors uppercase tracking-wider"
                                >
                                    {link.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="flex gap-4 border-l border-white/10 pl-8">
                        <a
                            href="https://github.com/naol-zewdie"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-red-400"
                            aria-label="GitHub Profile"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/naol-zewdie"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-red-400"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-400 hover:text-red-400"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <ul className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-lg font-hero font-medium text-gray-300 hover:text-red-400 block py-2 tracking-wide"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <div className="flex gap-6 pt-4 border-t border-white/5">
                                <a href="https://github.com/naol-zewdie" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400"><Github /></a>
                                <a href="https://www.linkedin.com/in/naol-zewdie" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400"><Linkedin /></a>
                            </div>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
