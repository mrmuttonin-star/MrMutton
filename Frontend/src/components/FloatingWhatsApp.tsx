import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import whatsappIcon from "@/assets/whatsapp.png";


const FloatingWhatsApp = () => {
  const whatsappNumber = "919220829266"; // Update with actual WhatsApp number
  const message = "Hello! I would like to order from Mr. Mutton";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 right-6 z-50 animate-fade-in"
    >
      {/* <Button
        size="lg"
        className="rounded-full h-16 w-16 shadow-strong hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BA59] text-white"
      > */}
        <img src={whatsappIcon} alt="WhatsApp" className="h-12 w-12" />

      {/* </Button> */}
    </a>
  );
};

export default FloatingWhatsApp;
