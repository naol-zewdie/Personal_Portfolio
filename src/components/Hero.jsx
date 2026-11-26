import { motion as Motion } from 'framer-motion';
import PixelSky from './PixelSky';
const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section id="top" className="relative flex h-[100svh] min-h-[640px] max-h-[1000px] items-center overflow-hidden pb-24 pt-28">
      <PixelSky className="absolute inset-0 h-full w-full" />

      <div className="shell relative text-center">
        <Motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="display mx-auto max-w-[11ch] text-[clamp(56px,11vw,150px)]"
        >
          Software for things that fly
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mx-auto mt-7 max-w-[34rem] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]"
        >
          I'm Naol, a full-stack engineer in Addis Ababa. I build web products end to end, and tools
          for drones with Skywin Aeronautics. Now I'm going deeper: robotics and autonomy.
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-2"
        >
          <a href="#work" className="btn btn-dark">
            See the work
          </a>
          <a href="#contact" className="btn btn-light">
            Get in touch
          </a>
        </Motion.div>
      </div>
    </section>
  );
}
