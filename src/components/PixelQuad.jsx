import { useId } from 'react';

// A top-down quadcopter drawn on a 21×21 pixel grid. Used as the logo mark
// (solid) and as the large hatched mascot in the footer.
const N = 21;
const ROTORS = [
  [4, 4],
  [16, 4],
  [4, 16],
  [16, 16],
];

function buildCells() {
  const cells = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const d = Math.min(...ROTORS.map(([rx, ry]) => Math.hypot(x - rx, y - ry)));
      const ring = d >= 2.3 && d <= 3.7;
      const hub = d <= 0.8;
      const inDisc = d < 2.3;
      const arm = !inDisc && (Math.abs(x - y) <= 1 || Math.abs(x + y - (N - 1)) <= 1);
      const body = x >= 8 && x <= 12 && y >= 7 && y <= 13;
      if (ring || hub || arm || body) cells.push([x, y]);
    }
  }
  return cells;
}

const CELLS = buildCells();

export default function PixelQuad({ size = 24, hatched = false, className = '', title }) {
  const id = useId().replace(/:/g, '');
  const fill = hatched ? `url(#hatch-${id})` : 'currentColor';
  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {hatched && (
        <defs>
          <pattern id={`hatch-${id}`} width="0.5" height="0.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="0.5" height="0.5" fill="transparent" />
            <rect width="0.16" height="0.5" fill="currentColor" />
          </pattern>
        </defs>
      )}
      {CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={fill} />
      ))}
    </svg>
  );
}
