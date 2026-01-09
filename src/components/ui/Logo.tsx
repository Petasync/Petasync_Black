import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Using the new logos from public/logos/SVG_ohne_hintergrund
// 1.svg = Dark/black logo (for light mode backgrounds)
// 2.svg = Light/white logo (for dark mode backgrounds)
const LogoIconDark = "/logos/SVG_ohne_hintergrund/1.svg";
const LogoIconLight = "/logos/SVG_ohne_hintergrund/2.svg";
const LogoHorizontalDark = "/logos/SVG_ohne_hintergrund/1.svg";
const LogoHorizontalLight = "/logos/SVG_ohne_hintergrund/2.svg";
const LogoFullDark = "/logos/SVG_ohne_hintergrund/1.svg";
const LogoFullLight = "/logos/SVG_ohne_hintergrund/2.svg";

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
  const { theme, systemTheme } = useTheme();

  // Logo version based on theme
  // Dark theme: White logo (for dark backgrounds)
  // Light theme: Black logo (for light backgrounds)
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  // Select appropriate logo based on variant and theme
  const getLogoSrc = () => {
    switch (variant) {
      case "icon":
        return isDark ? LogoIconDark : LogoIconLight;
      case "horizontal":
        return isDark ? LogoHorizontalDark : LogoHorizontalLight;
      case "full":
        return isDark ? LogoFullDark : LogoFullLight;
      default:
        return isDark ? LogoHorizontalDark : LogoHorizontalLight;
    }
  };

  if (variant === "wordmark") {
    return (
      <div className={cn("font-black text-2xl tracking-tight", className, textClassName)}>
        PETASYNC
      </div>
    );
  }

  // For icon, horizontal, and full variants - use the SVG directly
  return (
    <img
      src={getLogoSrc()}
      alt="Petasync Logo"
      className={cn(
        variant === "icon" ? "w-8 h-auto" : "h-8 w-auto",
        className,
        iconClassName
      )}
    />
  );
}
