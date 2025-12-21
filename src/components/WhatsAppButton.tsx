import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "4991611234567"; // Replace with actual number
  const message = encodeURIComponent("Hallo Petasync, ich habe eine Frage zu Ihrem IT-Service.");
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="WhatsApp kontaktieren"
    >
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-foreground text-background text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Schreib uns auf WhatsApp!
          </div>
        </div>
      </div>
    </a>
  );
}
