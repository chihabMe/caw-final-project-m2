export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Sorting Algorithms Visualizer",
    description:
      "A visual tool that demonstrates how different sorting algorithms work step by step using animated bars and real-time updates.",
    techStack: ["React", "TypeScript", "Vite"],
    githubUrl: "https://github.com/chihabmegg/sorting-algorithms-visualizer",
  },
  {
    id: 2,
    title: "Mental Health Chatbot",
    description:
      "A web-based chatbot that provides mental health guidance by asking progressive questions and analyzing user responses to give informative feedback.",
    techStack: ["React", "TypeScript", "FastAPI"],
    githubUrl: "https://github.com/chihabmegg/mental-health-chatbot",
  },
  {
    id: 3,
    title: "Manga Reader Web App",
    description:
      "An offline-friendly manga reader that allows users to browse, download, and read manga chapters through a clean interface.",
    techStack: ["React", "TypeScript", "FastAPI", "Docker"],
    githubUrl: "https://github.com/chihabmegg/manga-reader",
  },
  {
    id: 4,
    title: "Developer Portfolio",
    description:
      "A personal portfolio website built as a Single Page Application to showcase projects, skills, and contact information.",
    techStack: ["React", "TypeScript", "Vite", "Framer Motion"],
    githubUrl: "https://github.com/chihabmegg/portfolio",
  },
];
