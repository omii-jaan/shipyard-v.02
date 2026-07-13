import { useState, useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Sparkles, Users, Rocket, Terminal, Play, RotateCcw, Monitor, Code, Eye, RefreshCw, CheckCircle2 } from "lucide-react";

// Presets for the interactive terminal simulation
const PRESETS = [
  {
    id: "defi",
    label: "DeFi Swap",
    prompt: "Create a modern, glassmorphic crypto swap interface with neon glows.",
    files: ["Swap.tsx", "index.css", "tailwind.config.js"],
    logs: [
      "Initializing environment...",
      "Installed tailwindcss, postcss, autoprefixer",
      "Created components/SwapInterface.tsx",
      "Applying neon gradients and backdrop-blur formulas...",
      "Vite dev server running on http://localhost:5173",
    ],
    preview: (
      <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-[#0a0f1d] rounded-xl border border-white/5 relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,hsl(183_100%_50%_/_0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,hsl(270_60%_62%_/_0.08),transparent_50%)] pointer-events-none" />
        
        {/* Card */}
        <div className="w-full max-w-[280px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-2xl z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-white/80 tracking-wider">SWAP TOKENS</span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          
          {/* Input 1 */}
          <div className="bg-white/[0.04] border border-white/5 rounded-xl p-3 mb-2">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>You Pay</span>
              <span>Bal: 1.42 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">0.5</span>
              <span className="px-2 py-1 rounded-lg bg-white/10 text-xs font-bold text-white flex items-center gap-1">
                ETH
              </span>
            </div>
          </div>
          
          {/* Input 2 */}
          <div className="bg-white/[0.04] border border-white/5 rounded-xl p-3 mb-4">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>You Receive</span>
              <span>Bal: 0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary text-glow-cyan">1,732.4</span>
              <span className="px-2 py-1 rounded-lg bg-primary/20 border border-primary/30 text-xs font-bold text-primary flex items-center gap-1">
                USDC
              </span>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-xs glow-cyan transition-transform active:scale-95">
            Execute Swap
          </button>
        </div>
      </div>
    ),
  },
  {
    id: "ai-agent",
    label: "AI Chat Agent",
    prompt: "Design a dark-mode conversational AI assistant screen with active indicators.",
    files: ["AgentChat.tsx", "chatService.ts"],
    logs: [
      "Setting up system prompts...",
      "Connected to Claude-3.5-Sonnet API",
      "Constructed virtual stream layout...",
      "Rendered scrollable history viewport",
      "Vite dev server running on http://localhost:5173",
    ],
    preview: (
      <div className="w-full h-full flex flex-col justify-between p-3 bg-[#070b14] rounded-xl border border-white/5 relative">
        {/* Chat header */}
        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-white">
              AI
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-accent border-2 border-[#070b14] animate-pulse" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-white leading-none">Shipyard Agent</p>
            <p className="text-[9px] text-accent font-semibold uppercase tracking-wider mt-0.5">Active Dock</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 my-3 overflow-y-auto space-y-2 flex flex-col justify-end text-[10px]">
          <div className="bg-white/5 rounded-2xl rounded-tl-none p-2.5 max-w-[85%] text-white/90 self-start">
            Hello! I can dock your project files automatically. What should we ship?
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-none p-2.5 max-w-[85%] text-primary self-end">
            Deploy my dashboard components to Vercel.
          </div>
          <div className="bg-white/5 rounded-2xl rounded-tl-none p-2.5 max-w-[85%] text-white/90 self-start flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0.1s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-1.5">
          <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg px-2.5 py-1.5 text-[10px] text-white/40">
            Write message...
          </div>
          <button className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white font-bold text-[10px]">
            Send
          </button>
        </div>
      </div>
    ),
  },
  {
    id: "creator",
    label: "Creator Dashboard",
    prompt: "Create a SaaS metrics dashboard featuring revenue stats and trends.",
    files: ["Dashboard.tsx", "metricsDb.ts", "chartConfig.ts"],
    logs: [
      "Importing charting libraries...",
      "Configured grid alignment layout",
      "Parsed mock database telemetry...",
      "Preloaded trendlines...",
      "Vite dev server running on http://localhost:5173",
    ],
    preview: (
      <div className="w-full h-full flex flex-col justify-between p-3 bg-[#0a0a0f] rounded-xl border border-white/5">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-white/80 uppercase">Performance</span>
          <span className="text-[9px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full font-bold">
            +18.4%
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
            <p className="text-[8px] text-muted-foreground uppercase">Revenue</p>
            <p className="text-sm font-bold text-white mt-0.5">$14,280</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
            <p className="text-[8px] text-muted-foreground uppercase">Retention</p>
            <p className="text-sm font-bold text-white mt-0.5">94.2%</p>
          </div>
        </div>

        {/* Fake Graph */}
        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col justify-between">
          <div className="flex justify-between text-[8px] text-muted-foreground">
            <span>Weekly Sales</span>
            <span>$4,289 today</span>
          </div>
          <div className="h-10 w-full flex items-end gap-1 px-1 mt-2">
            {[40, 20, 60, 45, 80, 50, 95, 70, 110, 85].map((val, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-gradient-to-t from-primary/30 to-primary rounded-t-sm" 
                style={{ height: `${(val / 110) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const stats = [
  { label: "AI Builders Docked", value: "2,400+", icon: Users },
  { label: "Projects Shipped", value: "8,900+", icon: Rocket },
  { label: "Tools in the Yard", value: "1,200+", icon: Sparkles },
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(PRESETS[0]);
  const [terminalState, setTerminalState] = useState<"idle" | "typing" | "logs" | "complete">("complete");
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [promptText, setPromptText] = useState(PRESETS[0].prompt);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger terminal simulation sequence
  const startSimulation = (preset: typeof PRESETS[0]) => {
    if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    
    setActiveTab(preset);
    setPromptText(preset.prompt);
    setTerminalState("typing");
    setVisibleLogs([]);

    // Step 1: Simulated "typing" the prompt for 1 second
    setTimeout(() => {
      setTerminalState("logs");
      let currentLogIdx = 0;
      
      // Step 2: Print logs line by line
      logIntervalRef.current = setInterval(() => {
        if (currentLogIdx < preset.logs.length) {
          setVisibleLogs((prev) => [...prev, preset.logs[currentLogIdx]]);
          currentLogIdx++;
        } else {
          if (logIntervalRef.current) clearInterval(logIntervalRef.current);
          setTerminalState("complete");
        }
      }, 350);
    }, 1000);
  };

  // Run simulation on mount once
  useEffect(() => {
    startSimulation(PRESETS[0]);
    return () => {
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 px-6 bg-canvas-dots">
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_80%_60%_at_50%_-10%,hsl(183_100%_50%_/_0.08),transparent_50%)] pointer-events-none" />

      {/* Futuristic floating lines */}
      <div className="absolute top-1/4 left-5 w-40 h-40 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-5 w-60 h-60 bg-secondary/5 rounded-full blur-[100px]" />

      <div className="relative z-10 container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-pulse-glow">
              <Sparkles className="w-3.5 h-3.5" />
              The Next Gen Port for Vibe Coding
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6">
              Build. <span className="gradient-text-cyan text-glow-cyan">Dock.</span> <br />
              Ship. <span className="gradient-text-purple text-glow-purple">Get Paid.</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Welcome to the global ecosystem where developer vibes become live products.
              Dock your AI-assisted repositories, verify performance metrics, and match
              with founders paying $10k+ for proven builders. No resumes. Only code.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-bold text-base glow-cyan hover:brightness-110 hover:scale-102 transition-all duration-200">
                Dock Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold text-base hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                Hire Vibe Builders
              </button>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 w-full">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-display font-black text-xl md:text-2xl gradient-text-cyan flex items-center gap-1.5">
                    {value}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Sandbox Terminal */}
          <div className="lg:col-span-6 w-full flex flex-col">
            <div className="relative w-full rounded-2xl border border-white/15 bg-card/40 backdrop-blur-2xl shadow-3xl overflow-hidden p-1">
              
              {/* Terminal Frame Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/10">
                {/* Windows dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                
                {/* File tab labels */}
                <div className="flex gap-2">
                  {activeTab.files.map((file) => (
                    <span key={file} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-white/60 font-mono">
                      {file}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Live Preview
                </div>
              </div>

              {/* Preset Selector Tabs */}
              <div className="grid grid-cols-3 border-b border-white/15 bg-white/[0.01]">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => startSimulation(preset)}
                    className={`py-2 text-[11px] font-bold tracking-wider border-r border-white/15 last:border-r-0 transition-colors ${
                      activeTab.id === preset.id
                        ? "bg-primary/10 text-primary border-b border-b-primary"
                        : "text-muted-foreground hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Interactive Sandbox Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[280px]">
                
                {/* Left side: Code / Console Logs */}
                <div className="p-4 border-b md:border-b-0 md:border-r border-white/15 font-mono text-[11px] flex flex-col justify-between bg-black/30">
                  <div className="space-y-3">
                    {/* Prompt Typing */}
                    <div className="flex items-start gap-1.5 text-glow-cyan text-primary">
                      <Terminal className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-white/50 block font-semibold uppercase tracking-wider mb-0.5 font-sans">Prompt:</span>
                        {terminalState === "typing" ? (
                          <span className="border-r-2 border-primary animate-pulse">{promptText}</span>
                        ) : (
                          <span>{promptText}</span>
                        )}
                      </div>
                    </div>

                    {/* Console Logs */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5 text-white/70">
                      {visibleLogs.map((log, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-white/30 shrink-0 select-none">{i+1}</span>
                          <span className={log && log.includes("Vite dev") ? "text-accent font-bold" : ""}>
                            {log && log.includes("Vite dev") ? "➜ " : ""}
                            {log}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Re-simulate controls */}
                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-widest">
                      State: {terminalState}
                    </span>
                    <button 
                      onClick={() => startSimulation(activeTab)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 flex items-center gap-1"
                      title="Rerun Simulation"
                    >
                      <RefreshCw className={`w-3 h-3 ${terminalState === "logs" || terminalState === "typing" ? "animate-spin" : ""}`} />
                      <span className="text-[9px] font-bold">RERUN</span>
                    </button>
                  </div>
                </div>

                {/* Right side: Live Simulated Rendering */}
                <div className="p-4 flex flex-col items-center justify-center bg-[#05070d] relative overflow-hidden">
                  
                  {/* Backdrop lights */}
                  <div className="absolute inset-0 bg-radial-dots pointer-events-none opacity-30" />
                  
                  {/* Compilation Overlay States */}
                  {terminalState !== "complete" && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
                        <div className="absolute inset-0 border-2 border-t-primary rounded-full animate-spin" />
                      </div>
                      <p className="text-[10px] font-mono tracking-widest text-primary animate-pulse uppercase">
                        {terminalState === "typing" ? "Typing prompt..." : "Compiling Code..."}
                      </p>
                    </div>
                  )}

                  {/* Rendered Preview Screen */}
                  <div className="w-full h-full animate-in fade-in zoom-in-95 duration-300">
                    {activeTab.preview}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom section gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
