import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Github,
  Lock,
  Mail,
  Terminal,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signInWithGithub, signInWithGoogle } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Enter your email and password to dock in.");
      return;
    }

    setLoading(true);
    // Email/password auth can be added later with supabase.auth.signInWithPassword
    setTimeout(() => {
      setLoading(false);
      toast.success("Email/password auth coming next. Use GitHub or Google for now.");
    }, 900);
  };

  const handleGithub = async () => {
    setLoading(true);
    await signInWithGithub();
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-16 bg-background bg-canvas-dots">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[520px] bg-[radial-gradient(circle_at_50%_0%,hsl(183_100%_50%_/_0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute top-1/3 left-8 w-48 h-48 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-8 w-64 h-64 bg-secondary/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 group mb-5">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center glow-cyan group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-black text-2xl tracking-wider gradient-text-cyan">
              SHIPYARD
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-4 animate-pulse-glow">
            <Terminal className="w-3.5 h-3.5" />
            Auth Terminal · Secure Dock
          </div>

          <h1 className="font-display font-black text-3xl md:text-4xl text-white text-center leading-tight">
            Dock back into{" "}
            <span className="gradient-text-cyan text-glow-cyan">the yard</span>
          </h1>
          <p className="text-muted-foreground text-sm text-center mt-3 max-w-sm leading-relaxed">
            Sign in to manage ships, review contracts, and keep your builder port live.
          </p>
        </div>

        {/* Glass auth card */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-card/90 via-card/70 to-card/40 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* Terminal-style header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              login.session
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-accent uppercase tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              Online
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* OAuth */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={handleGithub}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-bold text-white/90 hover:bg-white/[0.07] hover:border-white/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </button>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-bold text-white/90 hover:bg-white/[0.07] hover:border-white/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                or email access
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="builder@shipyard.dev"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/30 border border-white/10 text-sm text-white placeholder:text-muted-foreground/60 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.message("Password reset docking soon.")}
                    className="text-[10px] font-semibold text-primary hover:text-white transition-colors"
                  >
                    Forgot access?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-2xl bg-black/30 border border-white/10 text-sm text-white placeholder:text-muted-foreground/60 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="sr-only peer"
                />
                <span className="w-4 h-4 rounded border border-white/15 bg-white/5 peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-all">
                  {remember && (
                    <svg className="w-2.5 h-2.5 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-xs text-muted-foreground">Keep this port logged in</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group w-full mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-bold text-sm glow-cyan hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Docking session...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Status footer */}
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Status: awaiting credentials
              </span>
              <span className="text-[10px] font-mono text-primary/80">tls · 256</span>
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            New builder?{" "}
            <Link
              to="/#hire"
              className="text-primary font-semibold hover:text-white transition-colors"
            >
              Join the yard
            </Link>
          </p>
          <Link
            to="/"
            className="inline-flex text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Shipyard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
