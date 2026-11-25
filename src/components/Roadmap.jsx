import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import Robot3D from './Robot3D';
import { roadmap, roadmapStart, roadmapWeeks, stackLayers } from '../data/roadmap';

const statusLabel = { now: 'In progress', done: 'Shipped', next: 'Planned' };

function currentWeek() {
  const days = (Date.now() - new Date(`${roadmapStart}T00:00:00+03:00`).getTime()) / 86400000;
  return Math.min(roadmapWeeks, Math.max(1, Math.floor(days / 7) + 1));
}

function Progress() {
  const week = currentWeek();
  const pct = (week / roadmapWeeks) * 100;
  return (
    <div className="max-w-[30rem]">
      <div className="flex items-baseline justify-between font-mono text-[12px] text-white/80">
        <span>
          WEEK {week} OF {roadmapWeeks}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div
        className="mt-2 grid h-2.5 gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${roadmapWeeks}, minmax(0, 1fr))` }}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={roadmapWeeks}
        aria-valuenow={week}
        aria-label="Roadmap progress in weeks"
      >
        {Array.from({ length: roadmapWeeks }).map((_, i) => (
          <span
            key={i}
            className={i < week ? 'rounded-[2px] bg-white' : 'rounded-[2px] bg-white/20'}
          />
        ))}
      </div>
    </div>
  );
}

function MonthCard({ m }) {
  const isNow = m.status === 'now';
  const body = (
    <>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] tracking-wide text-white/70">MONTH {String(m.month).padStart(2, '0')}</span>
        <span
          className={
            'rounded-full px-2.5 py-1 text-[11px] font-medium ' +
            (isNow ? 'bg-white text-sky-600' : m.status === 'done' ? 'bg-ink text-white' : 'ring-1 ring-white/35 text-white/80')
          }
        >
          {statusLabel[m.status]}
        </span>
      </div>
      <h3 className="mt-6 text-[22px] font-medium tracking-[-0.015em]">{m.title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-white/80">{m.topics}</p>
      <p className="mt-5 flex gap-2 border-t border-white/20 pt-4 text-[14px] leading-snug text-white">
        <ArrowRight size={15} className="mt-0.5 flex-none opacity-70" />
        {m.deliverable}
      </p>
      {m.link && (
        <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium">
          Read the write-up <ArrowUpRight size={14} />
        </span>
      )}
    </>
  );
  const cls =
    'block h-full rounded-[18px] p-5 transition-colors ' +
    (isNow ? 'bg-white/[0.16] ring-1 ring-white/50' : 'bg-white/[0.08] ring-1 ring-white/15');
  return m.link ? (
    <a href={m.link} target="_blank" rel="noopener noreferrer" className={cls + ' hover:bg-white/[0.2]'}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="shell scroll-mt-20 py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-[28px] bg-sky-500 px-5 py-14 text-white sm:px-10 sm:py-20 lg:px-14">
        {/* soft light behind the robot */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent)]"
          aria-hidden="true"
        />

        <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-white/75">Where I'm heading</p>
            <h2 className="display mt-4 text-[clamp(52px,8vw,104px)]">Next, autonomy</h2>
            <p className="mt-6 max-w-[34rem] text-[16px] leading-relaxed text-white/90 sm:text-[17px]">
              Six months working up the autonomy stack, in simulation first and then on hardware. Every month
              ends with something that runs and a write-up with measured results. They land here as they ship.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {stackLayers.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3.5 py-1.5 text-[14px] font-medium text-sky-600">{s}</span>
                  {i < stackLayers.length - 1 && <ArrowRight size={15} className="text-white/70" aria-hidden="true" />}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Progress />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="relative">
              {/* Spotlight: bright core behind the robot, fading into the panel */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] max-w-[760px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    'radial-gradient(circle closest-side, rgba(255,255,255,0.95) 0%, rgba(225,241,255,0.75) 18%, rgba(120,185,245,0.35) 34%, rgba(120,185,245,0) 60%)',
                }}
                aria-hidden="true"
              />
              {/* floor pool of light under the feet */}
              <div
                className="pointer-events-none absolute bottom-[4%] left-1/2 h-[18%] w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.55),transparent)]"
                aria-hidden="true"
              />
              <Robot3D className="h-[340px] sm:h-[460px]" />
            </div>
            <p className="relative mt-1 text-center font-mono text-[11px] text-white/70">
              Drag to look around ·{' '}
              <a
                href="https://sketchfab.com/3d-models/robot-93c9ff1cac014cc382e8666c873cdd70"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 hover:text-white"
              >
                Robot by DJMaesen
              </a>
              , CC BY 4.0
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((m, i) => (
            <Reveal as="li" key={m.month} delay={(i % 3) * 0.06}>
              <MonthCard m={m} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
