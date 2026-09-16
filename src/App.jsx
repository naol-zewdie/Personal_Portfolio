import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import HeroBackground from './three/HeroBackground';

// Lazy load sections for better performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const AiAssistant = lazy(() => import('./components/AiAssistant'));

function App() {
  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* 3D Cosmic background animation active across all sections */}
      <HeroBackground />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />

        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-black text-red-500 font-medium">Loading...</div>}>
          <About />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <AiAssistant />
      </Suspense>
    </div>
  );
}

export default App;
