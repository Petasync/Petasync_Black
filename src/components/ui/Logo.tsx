import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import LogoIconDark from "@/assets/logo/petasync-icon-white.svg";
import LogoIconLight from "@/assets/logo/petasync-icon-dark.svg";
import LogoHorizontalDark from "@/assets/logo/petasync-horizontal-white.svg";
import LogoHorizontalLight from "@/assets/logo/petasync-horizontal-dark.svg";
import LogoFullDark from "@/assets/logo/petasync-stacked-white.svg";
import LogoFullLight from "@/assets/logo/petasync-stacked-dark.svg";

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
