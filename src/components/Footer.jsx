import { useEffect, useState } from 'react';
import PixelQuad from './PixelQuad';
import { profile } from '../data/profile';

const nav = [
  { href: '#work', label: 'Work' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

function useClock(timeZone) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

export default function Footer() {
  const time = useClock(profile.timeZone);
  return (
    <footer className="relative overflow-hidden pt-16 sm:pt-24">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="display text-[clamp(52px,7vw,88px)]">
            Naol
            <br />
            Zewdie
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-ink-2">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="hover:text-ink">{profile.email}</a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 text-[14px] md:col-span-5">
          <ul className="space-y-1.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ink-2 hover:text-ink">{n.label}</a>
              </li>
            ))}
          </ul>
          <div>
            <p className="eyebrow">Local time</p>
            <p className="mt-2 flex items-center gap-2 text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden="true" />
              Addis Ababa
            </p>
            <p className="mt-1 font-mono text-[13px] text-ink">
              {time} <span className="text-muted">GMT+3</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-16 h-[200px] sm:h-[300px]" aria-hidden="true">
        <PixelQuad hatched size={560} className="absolute left-1/2 top-0 -translate-x-1/2 text-sky-400" />
      </div>
      <div className="shell relative -mt-10 pb-6">
        <p className="font-mono text-[11px] text-muted">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
