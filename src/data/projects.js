import flightlens from '../assets/work/flightlens.webp';
import skywin from '../assets/work/skywin.webp';
import eotc from '../assets/work/eotc.webp';
import tizita from '../assets/work/tizita.webp';

// To add a project: drop a screenshot in src/assets/work, import it above and
// add an entry. `span` is the card width on desktop (out of 12 columns);
// keep each row adding up to 12.
export const projects = [
  {
    id: 'flightlens',
    name: 'FlightLens',
    title: 'A drone flight log goes in; a verdict on what broke comes out',
    context: 'FlightLens · flight-log analysis for PX4, ArduPilot and MAVLink',
    note: 'Checked against 28 real PX4 logs, 15 ArduPlane logs and a 54-log fault benchmark.',
    tags: ['Python', 'Flight data', 'React', 'Open source'],
    image: flightlens,
    frame: 'bg-[#d9ecff]',
    live: 'https://flightlens-flight-log-analyzer.vercel.app/',
    code: 'https://github.com/naol-zewdie/flightlens-flight-log-analyzer',
    span: 'md:col-span-7',
  },
  {
    id: 'skywin',
    name: 'Skywin Aeronautics',
    title: 'The website for an Ethiopian UAV manufacturer',
    context: 'Skywin Aeronautics · VTOL, FPV and multi-mission drones',
    tags: ['Next.js', 'TypeScript', 'Aerospace'],
    image: skywin,
    frame: 'bg-[#1a2130]',
    live: 'https://skywinaero.et/',
    code: 'https://github.com/naol-zewdie/skywin-aeronautics-website',
    span: 'md:col-span-5',
  },
  {
    id: 'eotc',
    name: 'EOTC Digital Platform',
    title: 'A trilingual digital archive for a 1,600-year-old church',
    context: 'EOTC Digital Platform · Amharic, Ge’ez and English',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Full stack'],
    image: eotc,
    frame: 'bg-[#eee7d8]',
    live: 'https://eotc-digital-platform.vercel.app/en',
    code: 'https://github.com/naol-zewdie/eotc-digital-platform',
    span: 'md:col-span-5',
  },
  {
    id: 'tizita',
    name: 'Tizita',
    title: 'Travel in Ethiopia, with a CMS the team can run themselves',
    context: 'Tizita · destinations, itineraries and trip enquiries',
    tags: ['Next.js 15', 'Sanity CMS', 'Tailwind CSS'],
    image: tizita,
    frame: 'bg-[#e8e0d2]',
    live: 'https://tizitatourism.vercel.app/',
    code: 'https://github.com/naol-zewdie/tizitatourism',
    span: 'md:col-span-7',
  },
];
