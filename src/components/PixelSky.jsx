import { useEffect, useRef } from 'react';

// A slowly drifting pixel sky: value noise quantised into a few blue levels,
// with a clearing in the middle for the headline and a fade into the page
// at the bottom. Pure canvas, no dependencies; pauses when off screen and
// draws a single still frame when the user prefers reduced motion.

const LEVELS = ['#f7f7f5', '#d6ecff', '#a9d6ff', '#4fb0ff', '#1695ff'];

function hash(x, y) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function noise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x, y) {
  return 0.55 * noise(x, y) + 0.3 * noise(x * 2.1, y * 2.1) + 0.15 * noise(x * 4.3, y * 4.3);
}

const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export default function PixelSky({ className = '', clearing = { x: 0.5, y: 0.46, rx: 0.4, ry: 0.3 } }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let cell = 22;
    let t = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    // Cursor parts the clouds; position in canvas pixels, -1 when away.
    const pointer = { x: -1, y: -1, lastMove: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cell = w < 640 ? 16 : 22;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      const scale = w < 640 ? 7 : 11;
      ctx.fillStyle = LEVELS[0];
      ctx.fillRect(0, 0, w, h);
      for (let r = 0; r < rows; r++) {
        const cy = (r + 0.5) / rows;
        for (let c = 0; c < cols; c++) {
          const cx = (c + 0.5) / cols;
          let v = fbm(c / scale + t, r / scale + t * 0.35);
          // Clearing behind the headline.
          const e = ((cx - clearing.x) / clearing.rx) ** 2 + ((cy - clearing.y) / clearing.ry) ** 2;
          v -= Math.max(0, 1 - e) * 0.75;
          // Fade into the page at the bottom.
          v -= smooth(0.72, 1, cy) * 0.8;
          // Clouds part around the cursor.
          if (pointer.x >= 0) {
            const d = Math.hypot((c + 0.5) * cell - pointer.x, (r + 0.5) * cell - pointer.y);
            if (d < 150) v -= (1 - d / 150) ** 2 * 0.5;
          }
          let level = 0;
          if (v > 0.6) level = 4;
          else if (v > 0.52) level = 3;
          else if (v > 0.44) level = 2;
          else if (v > 0.37) level = 1;
          if (level === 0) continue;
          ctx.fillStyle = LEVELS[level];
          ctx.fillRect(c * cell, r * cell, cell, cell);
        }
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      // Step faster while the cursor is moving so the parting feels live.
      const interval = now - pointer.lastMove < 600 ? 50 : 140;
      if (!visible || now - last < interval) return;
      t += 0.012 * Math.min(2, (now - last) / 140);
      last = now;
      draw();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = inside ? x : -1;
      pointer.y = inside ? y : -1;
      pointer.lastMove = performance.now();
    };
    const onLeave = () => {
      pointer.x = -1;
      pointer.lastMove = performance.now();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    resize();
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [clearing.x, clearing.y, clearing.rx, clearing.ry]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
