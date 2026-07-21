import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { profileApi, projectApi } from "@/lib/api";
import { format } from "date-fns";
import {
  Bell, LayoutDashboard, FolderGit2, FileText, User, Settings,
  LogOut, Plus, ExternalLink, Loader2, ChevronRight, Search, Zap
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, color: "primary" },
  { id: "ships", label: "Ships", icon: FolderGit2, color: "primary" },
  { id: "contracts", label: "Contracts", icon: FileText, color: "accent" },
  { id: "profile", label: "Profile", icon: User, color: "secondary" },
  { id: "settings", label: "Settings", icon: Settings, color: "muted" },
];

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const userName = user?.user_metadata?.full_name?.split(" ")[0] || user?.user_metadata?.user_name || "Builder";
  const userRole = user?.user_metadata?.role || "Builder";

  const [stats, setStats] = useState({
    shipsCount: 0,
    activeContracts: 0,
    vibeScore: 0,
    earnings: 0,
  });

  const activityFeed = [
    { time: "2m ago", event: "> project.dock()", detail: "AI Chatbot deployed to production", status: "success" },
    { time: "1h ago", event: "> contract.signed()", detail: "New milestone agreement with TechCorp", status: "success" },
    { time: "3h ago", event: "> profile.update()", detail: "Stack updated: added Rust, Solidity", status: "info" },
    { time: "1d ago", event: "> payment.received()", detail: "$2,400 — Milestone #3 completed", status: "success" },
    { time: "2d ago", event: "> review.submitted()", detail: "5-star review from Alice Chen", status: "accent" },
  ];

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
          activeContracts: 0,
          vibeScore: profileData?.vibe_score || 0,
          earnings: 0,
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
      <div className="min-h-screen bg-[#080b14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xs font-mono text-muted-foreground">{`> connecting to bridge...`}</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#080b14] flex">
      {/* ---- Sidebar ---- */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-white/5 bg-[#0b0f17] shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-white/5">
          <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-black text-base tracking-wider gradient-text-cyan">SHIPYARD</span>
        </div>

        {/* User card */}
        <div className="px-4 py-3.5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt={userName} className="w-8 h-8 rounded-full" />
              ) : (
                <User className="w-3.5 h-3.5 text-primary-foreground" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{userName}</p>
              <p className="text-[10px] font-mono text-primary">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? `text-primary` : "text-muted-foreground/60"}`} />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1 h-4 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-4">
          <button
            onClick={() => { signOut(); navigate("/"); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all border border-transparent"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Bottom status */}
        <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] font-mono text-muted-foreground/40">{`[bridge] $`}</span>
          <span className="text-[9px] font-mono text-accent/60">{`● live`}</span>
        </div>
      </aside>

      {/* ---- Main Area ---- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ---- Top Bar ---- */}
        <header className="h-14 border-b border-white/5 bg-[#0b0f17]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/60 hidden sm:block">{`[~] $`}</span>
            <span className="text-xs font-mono text-primary hidden sm:block">{`./${activeTab}`}</span>
            <span className="inline-block w-1.5 h-4 bg-primary/60 animate-pulse hidden sm:block" />
          </div>

          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
            <button className="relative w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary text-[6px] font-bold text-primary-foreground flex items-center justify-center">3</span>
            </button>
            <div className="w-px h-5 bg-white/10 mx-1" />
            <div className="flex items-center gap-2 pl-1">
              <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center">
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt={userName} className="w-7 h-7 rounded-full" />
                ) : (
                  <User className="w-3 h-3 text-primary-foreground" />
                )}
              </div>
              <span className="text-xs font-semibold text-foreground hidden sm:block">{userName}</span>
            </div>
          </div>
        </header>

        {/* ---- Content ---- */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          {/* Overview tab */}
          {activeTab === "overview" && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="font-display font-black text-2xl md:text-3xl text-foreground">
                    Welcome back,{" "}
                    <span className="gradient-text-cyan">{userName}</span>
                  </h1>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{`> bridge.status · all systems nominal`}</p>
                </div>
                <Link
                  to="/dashboard/projects/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-bold text-xs glow-cyan hover:brightness-110 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Dock New Ship
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: "Ships Docked", value: stats.shipsCount, icon: FolderGit2, color: "primary", sparkline: [2, 3, 1, 4, 3, 5, stats.shipsCount] },
                  { label: "Active Contracts", value: stats.activeContracts, icon: FileText, color: "accent", sparkline: [0, 1, 0, 2, 1, 1, stats.activeContracts] },
                  { label: "Vibe Score", value: `${stats.vibeScore}%`, icon: Zap, color: "secondary", sparkline: [70, 75, 72, 80, 78, 85, stats.vibeScore] },
                  { label: "Earnings", value: `$${stats.earnings.toLocaleString()}`, icon: LayoutDashboard, color: "primary", sparkline: [0, 400, 200, 800, 600, 1200, stats.earnings] },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl border border-white/5 bg-[#0b0f17] p-4 hover:border-primary/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg bg-${stat.color}/10 border border-${stat.color}/20 flex items-center justify-center`}>
                        <stat.icon className={`w-3.5 h-3.5 text-${stat.color}`} />
                      </div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground/50">Live</span>
                    </div>
                    <p className="font-display font-black text-2xl text-foreground">{stat.value}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{stat.label}</p>
                    {/* Simple sparkline */}
                    <div className="flex items-end gap-[2px] mt-2 h-6">
                      {stat.sparkline.map((v, j) => (
                        <div
                          key={j}
                          className="w-full rounded-[1px]"
                          style={{
                            height: `${Math.max((v / Math.max(...stat.sparkline, 1)) * 100, 8)}%`,
                            backgroundColor: `hsl(${i === 0 ? "183, 100%, 50%" : i === 1 ? "142, 76%, 55%" : i === 2 ? "270, 60%, 62%" : "183, 100%, 50%"})`,
                            opacity: 0.4 + (j / stat.sparkline.length) * 0.4,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity feed + Ships */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity */}
                <div className="lg:col-span-1 rounded-xl border border-white/5 bg-[#0b0f17] overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-foreground font-semibold">Activity</span>
                    <span className="text-[9px] font-mono text-muted-foreground/50">tail -f</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {activityFeed.map((item, i) => (
                      <div key={i} className="px-4 py-2.5 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-start gap-2">
                          <div className="flex flex-col items-center gap-0.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full bg-${item.status === "success" ? "accent" : item.status === "info" ? "primary" : "secondary"}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-[11px] font-mono ${
                              item.status === "success" ? "text-accent" : item.status === "info" ? "text-primary" : "text-secondary"
                            }`}>
                              {item.event}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">{item.detail}</p>
                            <p className="text-[9px] font-mono text-muted-foreground/40 mt-0.5">{item.time}</p>
                          </div>
                          <ChevronRight className="w-3 h-3 text-muted-foreground/20 shrink-0 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ships */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-mono font-semibold text-foreground">{`> ls ./ships`}</h2>
                    <Link to="/dashboard/projects" className="text-[10px] font-mono text-primary hover:text-foreground transition-colors">
                      view all →
                    </Link>
                  </div>

                  {projects.length === 0 ? (
                    <div className="rounded-xl border border-white/5 bg-[#0b0f17] p-8 text-center">
                      <FolderGit2 className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" />
                      <p className="text-sm font-semibold text-foreground mb-1">No ships docked yet</p>
                      <p className="text-xs text-muted-foreground mb-4">Connect your repo and launch your first ship.</p>
                      <Link
                        to="/dashboard/projects/new"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-bold text-xs glow-cyan hover:brightness-110 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        Dock Your First Ship
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projects.slice(0, 4).map((project) => (
                        <Link
                          key={project.id}
                          to={`/dashboard/projects/${project.id}`}
                          className="group rounded-xl border border-white/5 bg-[#0b0f17] p-4 hover:border-primary/20 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <FolderGit2 className="w-4 h-4 text-primary" />
                            </div>
                            <span className={`px-2 py-0.5 text-[10px] font-mono rounded-md ${
                              project.status === "verified"
                                ? "bg-accent/10 text-accent border border-accent/20"
                                : project.status === "docked"
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-muted text-muted-foreground border border-white/10"
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors truncate">
                            {project.title}
                          </h3>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mb-2">
                            {project.description || "No description"}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.stack?.slice(0, 3).map((tech: string) => (
                              <span key={tech} className="px-1.5 py-0.5 text-[9px] rounded bg-white/5 text-muted-foreground font-mono">
                                {tech}
                              </span>
                            ))}
                            {project.stack && project.stack.length > 3 && (
                              <span className="px-1.5 py-0.5 text-[9px] rounded bg-white/5 text-muted-foreground font-mono">
                                +{project.stack.length - 3}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                            <span className="text-[9px] font-mono text-muted-foreground/60">
                              {format(new Date(project.created_at), "MMM d")}
                            </span>
                            {project.live_url && (
                              <ExternalLink className="w-3 h-3 text-primary/60" />
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { to: "/dashboard/projects/new", label: "Dock New Ship", desc: "Connect repo, verify, go live", icon: Plus, color: "primary" },
                  { to: "/dashboard/profile", label: "Builder Profile", desc: "Update stack, bio, availability", icon: Settings, color: "secondary" },
                  { to: "/dashboard/contracts", label: "Active Contracts", desc: "Review milestones, get paid", icon: FileText, color: "accent" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className="group rounded-xl border border-white/5 bg-[#0b0f17] p-4 hover:border-primary/20 transition-all flex items-center gap-3"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <item.icon className={`w-4 h-4 text-${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder tabs */}
          {activeTab === "ships" && (
            <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
              <p className="text-sm font-mono text-muted-foreground">{`> ships.dashboard — coming soon`}</p>
            </div>
          )}
          {activeTab === "contracts" && (
            <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
              <p className="text-sm font-mono text-muted-foreground">{`> contracts.pipeline — coming soon`}</p>
            </div>
          )}
          {activeTab === "profile" && (
            <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
              <p className="text-sm font-mono text-muted-foreground">{`> profile.edit — coming soon`}</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
              <p className="text-sm font-mono text-muted-foreground">{`> settings — coming soon`}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;