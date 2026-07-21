import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProfilePreview from "./pages/ProfilePreview.tsx";
import BuilderProfile from "./pages/BuilderProfile.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25, ease: "easeOut" }}>
    {children}
  </motion.div>
);

const AppRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage>{user ? <Navigate to="/dashboard" replace /> : <Login />}</AnimatedPage>} />
        <Route path="/auth/callback" element={<AnimatedPage><AuthCallback /></AnimatedPage>} />
        <Route path="/profile-preview" element={<AnimatedPage><ProfilePreview /></AnimatedPage>} />
        <Route path="/builder/:username" element={<AnimatedPage><BuilderProfile /></AnimatedPage>} />
        <Route
          path="/dashboard"
          element={
            <AnimatedPage>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </AnimatedPage>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
