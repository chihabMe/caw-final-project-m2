import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { profile } from "@/constants/profile";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection("#home")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-bold text-lg tracking-tight"
        >
          <span className="gradient-text">
            {profile.name.split(" ")[0][0]}
            {profile.name.split(" ")[1][0]}
          </span>
        </motion.button>

        {/* Nav links - Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => scrollToSection(item.href)}
                className={`nav-link ${
                  activeSection === item.href.slice(1) ? "active" : ""
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu indicator */}
        <div className="md:hidden flex items-center gap-1">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeSection === item.href.slice(1)
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
              aria-label={item.label}
            />
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
