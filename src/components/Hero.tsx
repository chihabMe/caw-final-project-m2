import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { profile } from "@/constants/profile";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.1]" />

      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]" 
      />

      <div className="section-container relative z-10 w-full px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-[1px] w-8 bg-primary/60 inline-block" />
            <span className="text-secondary-foreground/80 text-sm font-medium tracking-[0.2em] uppercase">
              Portfolio
            </span>
            <span className="h-[1px] w-8 bg-primary/60 inline-block" />
          </motion.div>

          {/* Name */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight flex flex-col items-center justify-center">
              <motion.span 
                className="inline-block"
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {profile.name.split(" ")[0].split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
              
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-500 animate-gradient-x bg-[length:200%_auto]"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.8, // Wait for first name
                      staggerChildren: 0.1,
                      delayChildren: 0.8
                    },
                  },
                }}
              >
                {profile.name.split(" ")[1].split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-3xl text-muted-foreground font-light"
          >
            {profile.title}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto text-base md:text-lg"
          >
            {profile.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <button
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <div className="flex items-center gap-4">
              {[
                { icon: Github, link: profile.social.github, label: "GitHub" },
                { icon: Linkedin, link: profile.social.linkedin, label: "LinkedIn" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer text-muted-foreground/50 hover:text-primary transition-colors"
          onClick={scrollToProjects}
        >
          <span className="text-xs uppercase tracking-widest mb-2 block text-center">Scroll</span>
          <ArrowDown className="w-6 h-6 mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
