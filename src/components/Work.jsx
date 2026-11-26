import { ArrowUpRight, Github } from 'lucide-react';
import Reveal from './Reveal';
import { projects } from '../data/projects';
import { profile } from '../data/profile';

function ProjectCard({ p, index }) {
  return (
    <Reveal as="article" delay={(index % 2) * 0.08} className={`group ${p.span}`}>
      <a
        href={p.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${p.name}`}
        className={`relative block h-[260px] overflow-hidden rounded-[22px] sm:h-[380px] lg:h-[440px] ${p.frame}`}
      >
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          loading="lazy"
          decoding="async"
          className="absolute left-[7%] top-[9%] w-[118%] max-w-none rounded-[10px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 sm:w-[110%]"
        />
        <span className="btn-round absolute right-4 top-4 h-10 w-10">
          <ArrowUpRight size={17} />
        </span>
      </a>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <h3 className="mt-3 max-w-[32ch] text-[21px] font-medium leading-[1.2] tracking-[-0.015em] sm:text-[25px]">
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="hover:underline hover:decoration-1 hover:underline-offset-4">
          {p.title}
        </a>
      </h3>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-muted">
        <span>{p.context}</span>
        {p.code && (
          <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink-2 hover:text-ink">
            <Github size={13} /> Code
          </a>
        )}
      </div>
      {p.note && <p className="mt-2 max-w-[52ch] text-[14px] text-ink-2">{p.note}</p>}
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="shell scroll-mt-20 py-20 sm:py-28">
      <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="text-[40px] font-medium leading-none tracking-[-0.035em] sm:text-[56px]">Selected work</h2>
        <p className="max-w-[30rem] text-[16px] text-ink-2">
          Products I've designed, built and shipped, from drone flight-log analysis to a trilingual church
          archive. More on{' '}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">
            GitHub
          </a>
          .
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
