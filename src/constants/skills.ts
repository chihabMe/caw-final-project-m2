export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Golang", "HTML5", "CSS3"],
  },
  {
    name: "Frameworks",
    skills: ["React", "Next.js", "Django", "Node.js", "Express", "Hono", "FastAPI", "Vite", "Framer Motion"],
  },
  {
    name: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Linux", "VS Code", "Figma"],
  },
  {
    name: "AI & Automation",
    skills: ["n8n", "AI Integration", "Workflow Automation"],
  },
];
