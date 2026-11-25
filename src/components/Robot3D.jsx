import { lazy, Suspense, useEffect, useRef, useState } from 'react';

// three.js and the model only load once this block is near the viewport.
const RobotScene = lazy(() => import('./RobotScene'));

export default function Robot3D({ className = '' }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {near && (
        <Suspense fallback={<Loader />}>
          <RobotScene className="!absolute inset-0" />
        </Suspense>
      )}
      {!near && <Loader />}
    </div>
  );
}

function Loader() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="h-2 w-2 animate-pulse bg-white/60 motion-reduce:animate-none"
            style={{ animationDelay: `${(i % 3) * 120 + Math.floor(i / 3) * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
