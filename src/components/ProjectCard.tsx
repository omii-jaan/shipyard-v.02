import { ExternalLink, Rocket, Eye } from "lucide-react";
import { useCardGlow } from "@/hooks/useCardGlow";

export interface Project {
  id: number;
  title: string;
  description: string;
  builder: string;
  builderAvatar: string;
  category: string;
  categoryColor: "cyan" | "purple" | "green" | "orange";
  stack: string[];
  views: number;
  liveLink: string;
  featured?: boolean;
}

const categoryStyles = {
  cyan: "bg-primary/10 text-primary border-primary/20",
  purple: "bg-secondary/10 text-secondary border-secondary/20",
  green: "bg-accent/10 text-accent border-accent/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const spotlightColors: Record<string, string> = {
  cyan: "hsla(183, 100%, 50%, 0.08)",
  purple: "hsla(183, 100%, 50%, 0.08)",
  green: "hsla(183, 100%, 50%, 0.08)",
  orange: "hsla(183, 100%, 50%, 0.08)",
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useCardGlow();

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative card-shine rounded-2xl p-5 group cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden ${project.featured ? "border-primary/25 glow-cyan" : ""}`}
      style={{ "--glow-x": "-9999px", "--glow-y": "-9999px" } as React.CSSProperties}
    >
      {/* Mouse-following glow overlay */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[inherit]"
        style={{
          background: `radial-gradient(350px circle at var(--glow-x) var(--glow-y), ${spotlightColors[project.categoryColor] || spotlightColors.cyan}, transparent 70%)`,
        }}
      />

      {project.featured && (
        <div className="absolute -top-2.5 left-4">
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-primary text-primary-foreground">
            ✦ Featured
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-3 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-shine flex items-center justify-center border border-border">
            <Rocket className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">{project.title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <img src={project.builderAvatar} alt={project.builder} className="w-4 h-4 rounded-full" />
              <span className="text-xs text-muted-foreground">{project.builder}</span>
            </div>
          </div>
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${categoryStyles[project.categoryColor]}`}>
          {project.category}
        </span>
      </div>

      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
          <span key={tech} className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground font-mono">
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye className="w-3.5 h-3.5" /> {project.views.toLocaleString()} views
        </span>
        <a href={project.liveLink} className="flex items-center gap-1 text-xs text-primary hover:underline">
          Live Demo <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
