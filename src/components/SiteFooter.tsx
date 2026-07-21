import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg gradient-text-cyan">Shipyard</span>
            </Link>
            <span className="text-muted-foreground text-sm ml-2">— Where AI builders dock & ship.</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/#builders" className="hover:text-primary transition-colors">Builders</a>
            <a href="/#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="/#discover" className="hover:text-primary transition-colors">Hire</a>
            <a href="https://discord.gg/shipyard" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Discord</a>
            <a href="https://twitter.com/shipyard" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Twitter</a>
          </div>

          <p className="text-muted-foreground text-xs">© 2026 Shipyard. Built with AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
