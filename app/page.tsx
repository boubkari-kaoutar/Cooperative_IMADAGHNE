import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import SavoirFaireSection from "@/components/SavoirFaireSection";
import EngagementSection from "@/components/EngagementSection";
import ProductsSection from "@/components/ProductsSection";
import RaisonsSection from "@/components/RaisonsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <SavoirFaireSection />
      <EngagementSection />
      <ProductsSection />
      <RaisonsSection />
      <ContactSection />
    </>
  );
}
