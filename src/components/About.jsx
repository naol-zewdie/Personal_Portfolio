import { Plus } from 'lucide-react';
import Reveal from './Reveal';
import portrait from '../assets/naol.webp';
import { faq, profile, stack } from '../data/profile';

function Chips({ label, items }) {
  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-20 py-20 sm:py-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <div className="overflow-hidden rounded-[22px] bg-chip">
            <img src={portrait} alt="Naol Zewdie" loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-[15px] font-medium">{profile.name}</p>
            <p className="font-mono text-[12px] text-muted">{profile.location}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="md:col-span-7">
          <h2 className="text-[40px] font-medium leading-none tracking-[-0.035em] sm:text-[56px]">Small talk</h2>
          <p className="mt-4 max-w-[30rem] text-[16px] text-ink-2">The short answers. For anything else, just ask.</p>

          <div className="mt-8 space-y-2">
            {faq.map((item, i) => (
              <details key={item.q} className="group rounded-2xl bg-paper ring-1 ring-line open:ring-[#d9d9d4]" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus size={18} className="flex-none text-muted transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <div className="px-5 pb-5 text-[15px] leading-relaxed text-ink-2">
                  {item.chips ? (
                    <div className="space-y-4">
                      <Chips label="Every day" items={stack.today} />
                      <Chips label="Learning now" items={stack.learning} />
                    </div>
                  ) : (
                    <p className="max-w-[56ch]">
                      {item.a}
                      {item.email && (
                        <>
                          {' '}
                          <a href={`mailto:${profile.email}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                            {profile.email}
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
