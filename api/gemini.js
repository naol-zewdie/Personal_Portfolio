import { GoogleGenAI } from "@google/genai";

const NaolContext = `
Naol Zewdie is a dedicated Full Stack and Backend Developer based in Addis Ababa, Ethiopia.
He specializes in building reliable, high-performance APIs and scalable architectures using TypeScript, NestJS, and PostgreSQL, with disciplined load testing before launch.
Technical Skills:
- Backend: TypeScript, NestJS, Node.js, Express, PostgreSQL, SQL, REST APIs, GraphQL, Microservices, Database Optimization.
- Frontend: React, JavaScript, TypeScript, Tailwind CSS, Next.js.
- DevOps & Tools: Docker, Git, GitHub, Load Testing & Benchmarking tools, CI/CD.

Key Strengths:
- Helping startups ship reliable, production-ready APIs.
- Designing clean relational schemas and indexing strategies with PostgreSQL.
- Stress testing and load testing systems before deployment to guarantee zero downtime.
- Commitment to high-performance, maintainable, and type-safe software architecture.

Personal Values:
Naol is driven by technical excellence, disciplined engineering, continuous learning, and creating impactful solutions for startups and global teams.
He is currently available for new projects, startup roles, and remote opportunities.

Respond as Naol Zewdie's Digital Assistant. Be professional, friendly, and concise. 
Highlight his engineering expertise in TypeScript, NestJS, and PostgreSQL, and his focus on shipping reliable APIs.
If asked about his location, mention he is based in Addis Ababa, Ethiopia, and works with clients globally.
If asked about hiring or contacting him, suggest using the portfolio contact form or reaching out via LinkedIn (naol-zewdie), GitHub (naol-zewdie), or email at naol1000zedu@gmail.com.
`;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: "userMessage is required" });
        }

        const apiKey = process.env.GEMINI_API_KEY; // SAFE (server only)
        if (!apiKey) {
            return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
        }

        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: userMessage,
            config: {
                systemInstruction: NaolContext,
                temperature: 0.7,
                maxOutputTokens: 500,
            },
        });

        return res.status(200).json({ text: response.text });
    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(500).json({
            text: "I'm sorry, I'm having trouble connecting to Naol's brain right now. Please try again in a few seconds!",
        });
    }
}
