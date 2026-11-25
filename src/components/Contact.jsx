import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { profile } from '../data/profile';

const input =
  'w-full rounded-xl bg-canvas px-4 text-[15px] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-muted/70 focus:ring-2 focus:ring-sky-500';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const body = new URLSearchParams({ ...form, _subject: 'Portfolio contact', _captcha: 'false' });
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  };

  return (
    <section id="contact" className="shell scroll-mt-20 py-10 sm:py-16">
      <Reveal className="grid gap-10 rounded-[28px] bg-paper p-6 ring-1 ring-line sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
        <div className="lg:col-span-5">
          <h2 className="display text-[clamp(56px,8vw,104px)]">Say hello</h2>
          <p className="mt-6 max-w-[26rem] text-[16px] leading-relaxed text-ink-2">
            Building something with drones, robots or a product that has to just work? Tell me what it is and
            where it's hard.
          </p>

          <div className="mt-8 space-y-2">
            <div className="flex items-center gap-2">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2.5 text-[16px] font-medium hover:underline hover:underline-offset-4">
                <Mail size={17} className="text-muted" /> {profile.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-chip hover:text-ink"
                aria-label="Copy email address"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
            <a href={profile.phoneHref} className="inline-flex items-center gap-2.5 text-[15px] text-ink-2 hover:text-ink">
              <Phone size={16} className="text-muted" /> {profile.phone}
            </a>
          </div>

          <div className="mt-8 flex gap-2">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-light h-10 px-4">
              <Github size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-light h-10 px-4">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3 lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow mb-1.5 block">Name</span>
              <input required value={form.name} onChange={update('name')} autoComplete="name" className={`${input} h-12`} />
            </label>
            <label className="block">
              <span className="eyebrow mb-1.5 block">Email</span>
              <input required type="email" value={form.email} onChange={update('email')} autoComplete="email" className={`${input} h-12`} />
            </label>
          </div>
          <label className="block">
            <span className="eyebrow mb-1.5 block">Message</span>
            <textarea required rows={6} value={form.message} onChange={update('message')} className={`${input} resize-y py-3`} />
          </label>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button type="submit" disabled={status === 'sending'} className="btn btn-dark disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p role="status" className="text-[14px]">
              {status === 'sent' && <span className="text-ink-2">Thanks, it's on its way. I'll reply by email.</span>}
              {status === 'error' && (
                <span className="text-[#c4320a]">
                  That didn't send. Email me directly at {profile.email}.
                </span>
              )}
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
