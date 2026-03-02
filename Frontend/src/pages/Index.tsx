import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import AvailableOnSection from "@/components/AvailableOnSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AvailableOnSection />
      <MenuSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
