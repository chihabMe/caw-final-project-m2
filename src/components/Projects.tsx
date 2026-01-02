import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Terminal } from "lucide-react";
import { projects } from "@/constants/projects";
import ProjectFilters from "@/components/ProjectFilters";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => tags.add(tech));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on search and tags
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.techStack.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  return (
    <section id="projects" className="relative bg-card/30">
      {/* Terminal-style background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/5 font-mono text-xs whitespace-pre hidden lg:block">
          {`$ ls -la projects/
total ${projects.length}
drwxr-xr-x  ${projects.length} chihab  staff  ${projects.length * 64}B
-rw-r--r--  1 chihab  staff  README.md
-rw-r--r--  1 chihab  staff  package.json`}
        </div>
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-primary text-sm font-mono mb-2">
            <Terminal className="w-4 h-4" />
            <span className="typing-effect">./show_projects.sh</span>
          </div>
          <h2 className="section-title">Featured Work</h2>
          <p className="text-muted-foreground max-w-xl">
            A selection of projects I've built, from visualizers to full-stack applications.
          </p>
        </motion.div>

        {/* Filters */}
        <ProjectFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allTags={allTags}
        />

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-xs font-mono mb-6"
        >
          {`> Found ${filteredProjects.length} of ${projects.length} projects`}
        </motion.p>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm card-glow transition-all duration-500 hover:border-primary/30"
              >
                {/* Terminal-style header */}
                <div className="absolute top-4 left-6 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/50" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <span className="w-3 h-3 rounded-full bg-primary/50" />
                </div>

                {/* Project number */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-primary/10 font-mono">
                  [{String(index).padStart(2, "0")}]
                </span>

                <div className="relative z-10 mt-6">
                  {/* Title with terminal prefix */}
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                    <span className="text-primary font-mono text-sm">$</span>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 pl-5">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6 pl-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`tech-badge ${
                          selectedTags.includes(tech)
                            ? "!bg-primary !text-primary-foreground shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                            : ""
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pl-5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                    >
                      <Github className="w-4 h-4" />
                      <span className="font-mono">git clone</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
                    </a>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-mono">./run</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground font-mono text-sm">
              {`> No projects found matching your criteria`}
            </p>
            <p className="text-primary font-mono text-xs mt-2">
              {`> Try adjusting your search or filters`}
            </p>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-primary text-sm font-mono mt-12"
        >
          {"</projects>"}
        </motion.p>
      </div>
    </section>
  );
};

export default Projects;
