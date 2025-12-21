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
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-white/[0.08]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container-tight">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl gradient-bg flex items-center justify-center overflow-hidden">
              <span className="text-white font-bold text-lg relative z-10">P</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-bold text-xl text-foreground">
              Peta<span className="gradient-text-colored">sync</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "text-foreground bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="gap-2 text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              <Link to="/privatkunden#leih-pc">
                <Monitor className="w-4 h-4" />
                <span>Leih-PC</span>
              </Link>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="gap-2 gradient-bg border-0 btn-glow hover:opacity-90"
            >
              <Link to="/kontakt">
                <Phone className="w-4 h-4" />
                <span>Kontakt</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="glass rounded-2xl p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                    location.pathname === item.href
                      ? "text-foreground bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-white/10 mt-2">
                <Button variant="outline" className="w-full gap-2 border-white/10" asChild>
                  <Link to="/privatkunden#leih-pc">
                    <Monitor className="w-4 h-4" />
                    Leih-PC Service
                  </Link>
                </Button>
                <Button className="w-full gap-2 gradient-bg border-0" asChild>
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
