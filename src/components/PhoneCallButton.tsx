import { Phone } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

export function PhoneCallButton() {
  return (
    <a
      href="tel:+491637117198"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Jetzt anrufen"
      onClick={() => trackCTAClick('Sticky Phone Button', 'Sticky')}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />

        {/* Pulse ring */}
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />

        {/* Button */}
        <div className="relative w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
          <Phone className="w-6 h-6 text-primary-foreground" />
        </div>

        {/* Tooltip */}
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-2 group-hover:translate-x-0">
          <div className="glass px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium text-foreground">
            0163 711 7198
          </div>
        </div>
      </div>
    </a>
  );
}
