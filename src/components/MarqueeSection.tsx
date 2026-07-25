import { Marquee } from "@/components/magicui/marquee";
import { BlurFade } from "@/components/magicui/blur-fade";

const tools = [
  "OpenAI",
  "Supabase",
  "Vercel",
  "Stripe",
  "LangChain",
  "Anthropic",
  "Pinecone",
  "Next.js",
  "Claude",
  "Node.js",
];

const MarqueeSection = () => {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <BlurFade delay={0.1} direction="up">
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
              Trusted by builders using
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={0.2} direction="up">
          <Marquee pauseOnHover repeat={3} className="[--duration:32s]">
          {tools.map((tool) => (
            <div
              key={tool}
              className="mx-3 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/12 transition-colors"
            >
              {tool}
            </div>
          ))}
        </Marquee>
        </BlurFade>
      </div>
    </section>
  );
};

export default MarqueeSection;
