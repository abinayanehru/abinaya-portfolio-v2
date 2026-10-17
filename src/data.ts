export const PROFILE = {
  name: "Abinaya Nehru",
  email: "abinaya12asm21@gmail.com",
  github: "https://github.com/abinayanehru",
  linkedin: "https://www.linkedin.com/in/abinaya-n-948027298",
  resume: "./resume.pdf"
};

export type Project = {
  id: string; index: string; title: string;
  category: "AI" | "Enterprise" | "Search" | "Web";
  tagline: string; stack: string[]; repo?: string; hue: "lime" | "orange";
};

export const FEATURED: Project[] = [
  { id: "itim", index: "01", title: "IT Incident Management System", category: "Enterprise",
    tagline: "A web-based incident workflow for reporting, assignment, prioritisation, SLA tracking and resolution, with role-based dashboards.",
    stack: ["Spring Boot", "React", "MySQL", "Jenkins", "Docker"], repo: "https://github.com/abinayanehru/IT_Incident_Manager", hue: "lime" },
  { id: "mlai", index: "02", title: "Multilingual AI Platform for Organisation", category: "AI",
    tagline: "A multilingual AI platform built for organisational use.",
    stack: ["NLP", "AI", "Search"], repo: "https://github.com/abinayanehru/organizational-intelligence-platform", hue: "orange" },
  { id: "leave", index: "03", title: "Leave Compass App", category: "Enterprise",
    tagline: "A leave-management application.",
    stack: ["Application Development"], repo: "https://github.com/abinayanehru/Leave-Compass-App", hue: "orange" },
  { id: "sss", index: "04", title: "String-Similarity Search", category: "Search",
    tagline: "A search project exploring string similarity to find closely matching text.",
    stack: ["String Similarity", "Search"],repo: "https://github.com/abinayanehru/StringSimilaritySearch", hue: "lime" }
];

export const ADDITIONAL: Project[] = [
  { id: "cms", index: "05", title: "Content Management System", category: "Web",
    tagline: "CODTECH internship task project.", stack: [], repo: "https://github.com/abinayanehru/CODTECHTASK2", hue: "lime" },
  { id: "hms", index: "06", title: "Hospital Management System", category: "Web",
    tagline: "Java and Spring Boot internship project.", stack: ["Java", "Spring Boot"], repo: "https://github.com/abinayanehru/CODTECHTASK1", hue: "orange" }
];

export const SKILLS: Record<string, string[]> = {
  Languages: ["Java", "Python", "SQL", "JavaScript", "C#"],
  Frameworks: ["React.js", "Spring Boot", "Flask", "FastAPI", "Django", "Express.js", "Flutter"],
  "Data & AI": ["NLP", "RAG", "GraphRAG", "Knowledge Graphs", "Text Mining"],
  Tools: ["Git", "GitHub", "Docker", "Jenkins", "SonarQube", "AWS", "Linux", "Maven", "MySQL", "PostgreSQL", "SQLite", "Neo4j"]
};

export const EXPERIENCE = [
  { period: "Aug 2025", role: "App Development Intern", org: "Prime Solutions", detail: "App development internship focused on Flutter." },
  { period: "Feb 2025", role: "Full Stack Web Development Intern", org: "BICS Global", detail: "Full-stack web development internship." },
  { period: "Aug 2024", role: "Software Development Intern", org: "CODTECH IT Solutions", detail: "Developed a Java and Spring Boot Hospital Management System." }
];

export const EDUCATION = {
  period: "2022 – 2026",
  title: "B.Tech in Information Technology",
  org: "C. Abdul Hakeem College of Engineering and Technology",
  result: "CGPA 7.8 / 10"
};

export const CERTIFICATIONS = [
  "Microsoft — Foundational C#",
  "Anthropic — Claude 101 & AI Fundamentals",
  "Google Cloud Data Analytics",
  "TCS iON — IT Primer",
  "Infosys Springboard — 13 Certifications",
  "Prompt Infotech — Web Development",
  "Marcello Tech — Full Stack / Web Development"
];