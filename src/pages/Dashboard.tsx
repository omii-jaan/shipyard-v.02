import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { LogOut, Zap, FolderGit2, Settings, User, ShieldCheck } from "lucide-react";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background bg-canvas-dots py-28 px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white">
              Welcome back,{" "}
              <span className="gradient-text-cyan text-glow-cyan">
                {user?.user_metadata?.full_name?.split(" ")[0] || user?.user_metadata?.user_name || "Builder"}
              </span>
            </h1>
            <p className="text-muted-foreground mt-2">Your Shipyard command deck</p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Ships Docked", value: "3", icon: FolderGit2, color: "primary" },
            { label: "Active Contracts", value: "1", icon: ShieldCheck, color: "accent" },
            { label: "Vibe Score", value: "94%", icon: Zap, color: "secondary" },
            { label: "Earnings", value: "$12.4k", icon: User, color: "primary" },
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="#"
            className="group rounded-2xl border border-white/5 bg-gradient-to-br from-card/90 to-card/50 p-6 backdrop-blur-xl hover:border-primary/30 hover:shadow-[0_0_20px_rgba(183,100,50,0.1)] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">Dock New Ship</h3>
            <p className="text-sm text-muted-foreground">Connect repo, verify, go live</p>
          </Link>

          <Link
            to="#"
            className="group rounded-2xl border border-white/5 bg-gradient-to-br from-card/90 to-card/50 p-6 backdrop-blur-xl hover:border-secondary/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Settings className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">Builder Profile</h3>
            <p className="text-sm text-muted-foreground">Update stack, bio, availability</p>
          </Link>

          <Link
            to="#"
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