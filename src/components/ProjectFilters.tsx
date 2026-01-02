import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  allTags: string[];
}

const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  allTags,
}: ProjectFiltersProps) => {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-10 space-y-4"
    >
      {/* Terminal-style search bar */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden">
          <span className="pl-4 text-primary font-mono text-sm select-none">
            ~/projects $
          </span>
          <Input
            type="text"
            placeholder="grep -i 'your search'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm placeholder:text-muted-foreground/50"
          />
          <Search className="w-4 h-4 text-muted-foreground mr-4" />
        </div>
      </div>

      {/* Tags filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-primary font-mono text-xs mr-2">--tags:</span>
        {allTags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-all duration-300 ${
              selectedTags.includes(tag)
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                : "bg-card/50 text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
            }`}
          >
            {tag}
          </motion.button>
        ))}

        {/* Clear filters button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="ml-2 px-3 py-1.5 text-xs font-mono rounded-md bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition-all flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            clear
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectFilters;
