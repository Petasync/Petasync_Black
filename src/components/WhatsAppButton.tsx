import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppButton() {
  const phoneNumber = "491637117198";
  const message = encodeURIComponent("Hallo Petasync, ich habe eine Frage zu Ihrem IT-Service.");

  const handleClick = () => {
    trackWhatsAppClick();
  };

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="WhatsApp kontaktieren"
      onClick={handleClick}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
        
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-2 group-hover:translate-x-0">
          <div className="glass px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium text-foreground">
            Schreib uns auf WhatsApp!
          </div>
        </div>
      </div>
    </a>
  );
}
