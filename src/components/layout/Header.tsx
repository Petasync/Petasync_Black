import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Start", href: "/" },
  { name: "Privatkunden", href: "/privatkunden" },
  { name: "Geschäftskunden", href: "/geschaeftskunden" },
  { name: "Websites", href: "/websites" },
  { name: "Kontakt", href: "/kontakt" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-4 bg-background/80 backdrop-blur-xl"
          : "py-6 bg-transparent"
      )}
    >
      <div className="container-tight">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg bg-foreground flex items-center justify-center overflow-hidden">
              <span className="text-background font-bold text-lg relative z-10">P</span>
            </div>
            <span className="font-semibold text-lg text-foreground">
              Petasync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm transition-colors duration-200",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/privatkunden#leih-pc"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              <span>Leih-PC</span>
            </Link>
            <Button 
              size="sm" 
              asChild 
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full gap-2"
            >
              <Link to="/kontakt">
                <Phone className="w-3.5 h-3.5" />
                <span>Kontakt</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 animate-fade-in">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "block py-3 text-base transition-colors",
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                <Button variant="outline" className="w-full gap-2 rounded-full border-white/10" asChild>
                  <Link to="/privatkunden#leih-pc">
                    <Monitor className="w-4 h-4" />
                    Leih-PC Service
                  </Link>
                </Button>
                <Button className="w-full gap-2 bg-foreground text-background rounded-full" asChild>
                  <Link to="/kontakt">
                    <Phone className="w-4 h-4" />
                    Jetzt anfragen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
