import { profile } from "@/constants/profile";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} {profile.name}. Built with React & TypeScript.
        </p>

        <p className="text-sm text-muted-foreground">
          Designed & Developed with{" "}
          <span className="text-primary">♥</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
