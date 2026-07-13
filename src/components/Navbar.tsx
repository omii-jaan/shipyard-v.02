import { Zap, Menu, LogOut, User, FolderGit2, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-300">
      <nav className="px-6 py-3.5 rounded-full border border-white/10 bg-card/60 backdrop-blur-xl flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Logo and Live Indicator */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center glow-cyan">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-black text-xl tracking-wider gradient-text-cyan">SHIPYARD</span>
          </Link>
          
          {/* Live Online Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            2,482 Live
          </div>
        </div>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          <a href="#builders" className="hover:text-primary hover:text-glow-cyan transition-all duration-200">Builders</a>
          <a href="#projects" className="hover:text-primary hover:text-glow-cyan transition-all duration-200">Projects</a>
          <a href="#hire" className="hover:text-primary hover:text-glow-cyan transition-all duration-200">Hire</a>
          <a href="#discover" className="hover:text-primary hover:text-glow-cyan transition-all duration-200">Discover</a>
        </div>

        {/* CTA & Sign In */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <span className="text-sm font-semibold text-white hidden sm:block">
                  {user.user_metadata?.full_name?.split(" ")[0] || user.user_metadata?.user_name || "Builder"}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-card/95 backdrop-blur-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-primary/10">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-primary/10">
                    <FolderGit2 className="w-4 h-4" />
                    My Ships
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-primary/10">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <hr className="border-white/10 my-2" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold glow-cyan hover:opacity-95 hover:scale-102 active:scale-98 transition-all duration-200">
                Join as Builder
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
        >
          <Menu className="w-4 h-4" />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="absolute top-16 left-0 right-0 p-5 rounded-3xl border border-white/10 bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <a href="#builders" className="text-sm font-semibold hover:text-primary transition-colors py-2 border-b border-white/5" onClick={() => setOpen(false)}>Builders</a>
          <a href="#projects" className="text-sm font-semibold hover:text-primary transition-colors py-2 border-b border-white/5" onClick={() => setOpen(false)}>Projects</a>
          <a href="#hire" className="text-sm font-semibold hover:text-primary transition-colors py-2 border-b border-white/5" onClick={() => setOpen(false)}>Hire</a>
          <a href="#discover" className="text-sm font-semibold hover:text-primary transition-colors py-2" onClick={() => setOpen(false)}>Discover</a>
          <div className="flex flex-col gap-3 mt-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold glow-cyan text-center">
                    Dashboard
                  </Link>
                <button
                  onClick={() => { handleSignOut(); setOpen(false); }}
                  className="py-2.5 rounded-full border border-white/10 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="py-2.5 rounded-full border border-white/10 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors text-center">
                    Sign In
                  </Link>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold glow-cyan text-center">
                    Join as Builder
                  </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
