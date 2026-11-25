import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import PixelQuad from './PixelQuad';
import { profile } from '../data/profile';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  // Highlight the section currently in the middle of the screen.
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive('');
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pill =
    'bg-white/85 backdrop-blur-xl ring-1 ring-black/[0.06] transition-shadow duration-300 ' +
    (scrolled ? 'shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]' : 'shadow-none');

  return (
    <header className="fixed inset-x-0 top-3 z-50 sm:top-4">
      <div className="shell flex items-start justify-between gap-3">
        <nav aria-label="Main" className={`rounded-[22px] ${pill}`}>
          <div className="flex h-12 items-center gap-1 pl-3 pr-1.5">
            <a href="#top" className="mr-2 grid h-9 w-9 place-items-center rounded-full" aria-label="Naol Zewdie, back to top">
              <PixelQuad size={22} />
            </a>
            <ul className="hidden items-center sm:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href ? 'true' : undefined}
                    className={
                      'rounded-full px-3 py-2 text-[14px] transition-colors hover:bg-black/[0.04] hover:text-ink ' +
                      (active === l.href ? 'bg-black/[0.06] text-ink' : 'text-ink-2')
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-ink-2 hover:bg-black/[0.04] sm:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          {open && (
            <ul id="mobile-menu" className="border-t border-line px-2 pb-2 pt-1 sm:hidden">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-[15px] text-ink-2 hover:bg-black/[0.04]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <div className="flex items-center gap-1.5">
          <a href="#contact" className="btn btn-dark hidden h-12 sm:inline-flex">
            Get in touch
          </a>
          <a href={`mailto:${profile.email}`} className="btn-round h-12 w-12" aria-label={`Email ${profile.email}`}>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
