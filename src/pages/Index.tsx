import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturedBuilders from "@/components/FeaturedBuilders";
import FeaturedProjects from "@/components/FeaturedProjects";
import HowItWorks from "@/components/HowItWorks";
import DiscoverFeed from "@/components/DiscoverFeed";
import CTASection from "@/components/CTASection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <FeaturedBuilders />
        <HowItWorks />
        <FeaturedProjects />
        <DiscoverFeed />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
