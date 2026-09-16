import { FaReact, FaNodeJs, FaPython, FaDatabase, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiTypescript, SiMongodb, SiExpress, SiNextdotjs, SiNestjs, SiPostgresql, SiPostman } from 'react-icons/si';

export const skillCategories = [
    {
        title: "Backend Architecture",
        skills: [
            { name: "TypeScript", icon: SiTypescript, level: 92 },
            { name: "NestJS", icon: SiNestjs, level: 90 },
            { name: "PostgreSQL", icon: SiPostgresql, level: 88 },
            { name: "Node.js / Express", icon: FaNodeJs, level: 88 },
            { name: "MongoDB", icon: SiMongodb, level: 80 },
        ]
    },
    {
        title: "Frontend Engineering",
        skills: [
            { name: "React", icon: FaReact, level: 88 },
            { name: "TypeScript / JS", icon: SiJavascript, level: 90 },
            { name: "Tailwind CSS", icon: SiTailwindcss, level: 85 },
            { name: "Next.js", icon: SiNextdotjs, level: 80 },
        ]
    },
    {
        title: "DevOps & Quality",
        skills: [
            { name: "Docker", icon: FaDocker, level: 75 },
            { name: "Load Testing & APIs", icon: SiPostman, level: 85 },
            { name: "Git / GitHub", icon: FaGitAlt, level: 90 },
            { name: "AWS", icon: FaAws, level: 65 },
        ]
    }
];
