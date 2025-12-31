import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import LogoIconDark from "@/assets/logos/petasync-icon-dark.svg";
import LogoIconLight from "@/assets/logos/petasync-icon-light.svg";
import LogoHorizontalDark from "@/assets/logos/petasync-horizontal-dark.svg";
import LogoHorizontalLight from "@/assets/logos/petasync-horizontal-light.svg";
import LogoFullDark from "@/assets/logos/petasync-full-dark.svg";
import LogoFullLight from "@/assets/logos/petasync-full-light.svg";

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
