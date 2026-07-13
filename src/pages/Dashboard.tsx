import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { profileApi, projectApi } from "@/lib/api";
import { LogOut, Zap, FolderGit2, Settings, User, ShieldCheck, Plus, ExternalLink, Loader2 } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    shipsCount: 0,
    activeContracts: 0,
    vibeScore: 0,
    earnings: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) return;

      try {
        const [profileData, projectsData] = await Promise.all([
          profileApi.getCurrent(),
          projectApi.getAll({ builder_id: user.id, limit: 10 }),
        ]);

        setProfile(profileData);
        setProjects(projectsData || []);
        setStats({
          shipsCount: projectsData?.length || 0,
          activeContracts: 0, // TODO: fetch from contracts
          vibeScore: profileData?.vibe_score || 0,
          earnings: 0, // TODO: fetch from contracts
        });
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background bg-canvas-dots flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background bg-canvas-dots py-28 px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white">
              Welcome back,{" "}
              <span className="gradient-text-cyan text-glow-cyan">
                {profile?.full_name?.split(" ")[0] || profile?.username || "Builder"}
              </span>
            </h1>
            <p className="text-muted-foreground mt-2">Your Shipyard command deck</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/projects/new"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-bold text-sm glow-cyan hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" />
              Dock New Ship
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Ships Docked", value: stats.shipsCount, icon: FolderGit2, color: "primary" },
            { label: "Active Contracts", value: stats.activeContracts, icon: ShieldCheck, color: "accent" },
            { label: "Vibe Score", value: `${stats.vibeScore}%`, icon: Zap, color: "secondary" },
            { label: "Earnings", value: `$${stats.earnings.toLocaleString()}`, icon: User, color: "primary" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-gradient-to-br from-card/90 to-card/50 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Live
                </span>
              </div>
              <p className="font-display font-black text-3xl text-white">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* My Ships */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-white">My Ships</h2>
            <Link
              to="/dashboard/projects"
              className="text-sm font-medium text-primary hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-card/90 to-card/50 p-12 text-center backdrop-blur-xl">
              <FolderGit2 className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-display font-bold text-xl text-white mb-2">No ships docked yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Connect your GitHub repo, verify the build, and launch your first ship to the yard.
              </p>
              <Link
                to="/dashboard/projects/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-bold text-sm glow-cyan hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                Dock Your First Ship
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((project) => (
                <Link
                  key={project.id}
                  to={`/dashboard/projects/${project.id}`}
                  className="group rounded-2xl border border-white/5 bg-gradient-to-br from-card/90 to-card/50 p-5 backdrop-blur-xl hover:border-primary/30 hover:shadow-[0_0_20px_rgba(183,100,50,0.1)] transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <FolderGit2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      project.status === "verified"
                        ? "bg-accent/10 text-accent border-accent/20"
                        : project.status === "docked"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground border-white/10"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.description || "No description provided"}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack?.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] rounded-md bg-muted text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack && project.stack.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] rounded-md bg-muted text-muted-foreground font-mono">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {format(new Date(project.created_at), "MMM d, yyyy")}
                    </span>
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-primary hover:text-white font-mono transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/projects/new"
            className="group rounded-2xl border border-white/5 bg-gradient-to-br from-card/90 to-card/50 p-6 backdrop-blur-xl hover:border-primary/30 hover:shadow-[0_0_20px_rgba(183,100,50,0.1)] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">Dock New Ship</h3>
            <p className="text-sm text-muted-foreground">Connect repo, verify, go live</p>
          </Link>

          <Link
            to="/dashboard/profile"
            className="group rounded-2xl border border-white/5 bg-gradient-to-br from-card/90 to-card/50 p-6 backdrop-blur-xl hover:border-secondary/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Settings className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">Builder Profile</h3>
            <p className="text-sm text-muted-foreground">Update stack, bio, availability</p>
          </Link>

          <Link
            to="/dashboard/contracts"
            className="group rounded-2xl border border-white/5 bg-gradient-to-br from-card/90 to-card/50 p-6 backdrop-blur-xl hover:border-accent/30 hover:shadow-[0_0_20px_rgba(142,76,55,0.1)] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">Active Contracts</h3>
            <p className="text-sm text-muted-foreground">Review milestones, get paid</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;