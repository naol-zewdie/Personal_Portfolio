// The six-month Physical AI, Robotics & Autonomy roadmap (started Nov 2026).
// Update `status` as months finish: 'done' | 'now' | 'next'. When a month ships,
// add `link` to its write-up and it becomes clickable.

export const roadmapStart = '2026-11-23';
export const roadmapWeeks = 26;

export const stackLayers = ['Sense', 'Estimate', 'Plan', 'Control', 'Learn'];

export const roadmap = [
  {
    month: 1,
    title: 'Foundations',
    topics: 'Linux, modern C++, ROS 2 nodes, a simulated robot in Gazebo',
    deliverable: 'A robot that drives, sees and stops before it hits a wall',
    status: 'now',
  },
  {
    month: 2,
    title: 'Motion',
    topics: 'Frames and tf2, odometry, PID control, pure pursuit',
    deliverable: 'A path-following controller built and tuned from scratch',
    status: 'next',
  },
  {
    month: 3,
    title: 'Localization',
    topics: 'Kalman filter, EKF sensor fusion, SLAM, Nav2',
    deliverable: 'Indoor navigation with a 50-trial reliability report',
    status: 'next',
  },
  {
    month: 4,
    title: 'Perception',
    topics: 'Camera calibration, OpenCV, YOLO detection, depth + LiDAR fusion',
    deliverable: 'An object-search mission evaluated over 30 runs',
    status: 'next',
  },
  {
    month: 5,
    title: 'Aerial autonomy',
    topics: 'PX4 SITL, vision-based landing, quantized edge models, learned control',
    deliverable: 'A precision-landing eval and an edge-AI benchmark',
    status: 'next',
  },
  {
    month: 6,
    title: 'Capstone',
    topics: 'One autonomous system end to end, plus open-source contributions',
    deliverable: 'Code, video, write-up and results over 50+ randomized trials',
    status: 'next',
  },
];
