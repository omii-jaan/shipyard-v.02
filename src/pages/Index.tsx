import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
