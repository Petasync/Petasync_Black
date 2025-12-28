import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  // Logo version based on theme
  // Version 1: White (for dark backgrounds)
  // Version 2: Black (for light backgrounds)
  const logoVersion = theme === "dark" ? "1" : "2";
  const logoPath = `/logos/SVG_ohne_hintergrund/${logoVersion}.svg`;

  const LogoImage = ({ className: imgClass }: { className?: string }) => (
    <img
      src={logoPath}
      alt="Petasync Logo"
      className={cn("w-8 h-auto", imgClass)}
    />
  );

  if (variant === "icon") {
    return <LogoImage className={cn(className, iconClassName)} />;
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
        <LogoImage className={iconClassName} />
        <div className={cn("font-black text-3xl tracking-tight", textClassName)}>
          PETASYNC
        </div>
      </div>
    );
  }

  // horizontal (default)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoImage className={iconClassName} />
      <div className={cn("font-black text-xl tracking-tight", textClassName)}>
        PETASYNC
      </div>
    </div>
  );
}
