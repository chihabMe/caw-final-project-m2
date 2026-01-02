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
    title: "Lab 7: Kanban Board",
    description:
      "Interactive task management board with drag-and-drop functionality, column management, and responsive design using React hooks.",
    techStack: ["React", "Vite", "Tailwind CSS", "React DnD"],
    githubUrl: "https://github.com/chihabMe/lab-7-kanban-board",
  },
  {
    id: 2,
    title: "Lab 5: Authentication Forms",
    description:
      "Complete login/register system with form validation, error handling, password strength checking, and loading states.",
    techStack: ["React", "Tailwind CSS", "React Hook Form", "Zod"],
    githubUrl: "https://github.com/chihabMe/lab-5-authentication-forms",
  },
  {
    id: 3,
    title: "Lab 3: Todo Dashboard",
    description:
      "Full-featured todo app with local storage persistence, filtering, search, and dark mode toggle using React Context.",
    techStack: ["React", "Vite", "Tailwind CSS", "Local Storage"],
    githubUrl: "https://github.com/chihabMe/lab-3-todo-dashboard",
  },
];
