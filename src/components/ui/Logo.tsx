import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "horizontal" | "wordmark";
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({
  variant = "horizontal",
  className,
  iconClassName,
  textClassName
}: LogoProps) {

  const PIcon = ({ className: iconClass }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 280"
      fill="none"
      className={cn("w-8 h-auto", iconClass)}
    >
      <g fill="currentColor">
        {/* Top curved section */}
        <path d="M 20 20 L 140 20 C 170 20 180 40 180 70 C 180 90 170 100 150 100 L 60 100 C 40 100 40 80 40 60 L 40 40 C 40 20 20 20 20 20 Z"/>

        {/* Middle curved section */}
        <path d="M 20 110 L 150 110 C 170 110 180 125 180 145 C 180 175 170 180 150 180 L 60 180 C 40 180 40 160 40 140 L 40 130 C 40 110 20 110 20 110 Z"/>

        {/* Bottom curved section */}
        <path d="M 20 190 L 100 190 C 115 190 120 200 120 220 C 120 245 115 250 100 250 L 60 250 C 40 250 40 230 40 210 L 40 205 C 40 190 20 190 20 190 Z"/>

        {/* Center circle for sync effect */}
        <circle cx="140" cy="145" r="28" fill="currentColor" fillOpacity="0.15"/>
      </g>
    </svg>
  );

  if (variant === "icon") {
    return <PIcon className={cn(className, iconClassName)} />;
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("font-black text-2xl tracking-tight", className, textClassName)}>
        PETASYNC
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <PIcon className={iconClassName} />
        <div className={cn("font-black text-3xl tracking-tight", textClassName)}>
          PETASYNC
        </div>
      </div>
    );
  }

  // horizontal (default)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <PIcon className={iconClassName} />
      <div className={cn("font-black text-xl tracking-tight", textClassName)}>
        PETASYNC
      </div>
    </div>
  );
}
