// Everything personal on the site lives here, so it can be edited in one place.

export const profile = {
  name: 'Naol Zewdie',
  role: 'Full-stack engineer',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  email: 'naol1000zedu@gmail.com',
  phone: '+251 903 053 038',
  phoneHref: 'tel:+251903053038',
  github: 'https://github.com/naol-zewdie',
  linkedin: 'https://www.linkedin.com/in/naol-zewdie',
};

export const stack = {
  today: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Python',
    'Docker',
    'PX4 & ArduPilot logs',
  ],
  learning: ['C++', 'ROS 2', 'Gazebo', 'Kalman filters', 'OpenCV', 'PyTorch'],
};

// Short answers for the "Small talk" section. `chips` renders the stack lists.
export const faq = [
  {
    q: 'What do you do?',
    a: "I'm a full-stack engineer. I take a product from an empty repo to a deployed site: Next.js and React on the front, NestJS or Node with PostgreSQL behind it. Lately most of my work is around drones, with Skywin Aeronautics in Addis Ababa.",
  },
  {
    q: 'What is FlightLens?',
    a: "A tool that reads a drone's flight log after landing and tells you whether the aircraft is healthy, what went wrong, when it happened and what to fix first. It handles PX4, ArduPilot and MAVLink logs, and runs entirely on your own machine.",
  },
  {
    q: 'Where are you heading?',
    a: "Physical AI, robotics and autonomy. I'm following a six-month plan that goes from ROS 2 and C++ through control, SLAM and perception to autonomous PX4 drones, and ends with a capstone measured over 50+ randomized trials.",
  },
  {
    q: 'What do you work with?',
    chips: true,
  },
  {
    q: 'Where are you based?',
    a: 'Addis Ababa, Ethiopia, at 2,355 m one of the highest capitals on Earth. GMT+3.',
  },
  {
    q: 'How can I get in touch?',
    a: "Email me or use the form below. Tell me what you're building and where it's hard. I write back.",
    email: true,
  },
];
