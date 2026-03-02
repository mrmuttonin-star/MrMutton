import { Phone, UtensilsCrossed, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
// import logo from "@/assets/logo.jpeg";
import orderNowImage from "@/assets/elements/ordernow1.jpeg";
import orderNowImagemobile from "@/assets/elements/ordermobile1.jpeg";
import logo from "@/assets/elements/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center flex-nowrap min-h-[64px] sm:min-h-[80px]">
            {/* LEFT: Logo + Brand */}
            {/* <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
        <img
          src={logo}
          alt="Mr Mutton Logo"
          className="h-12 w-12 sm:h-16 sm:w-16 object-contain shrink-0"
        />
        <div className="min-w-0">
          <h1 className="text-sm sm:text-2xl font-bold text-primary leading-tight">
            Mr. Mutton
          </h1>
          <p className="text-[9px] sm:text-xs text-foreground/70 uppercase tracking-wider whitespace-nowrap leading-tight">
            Slow Cooked. Soul Satisfied.
          </p>
        </div>
      </Link> */}

            {/* LEFT: Brand Image  */}
            {
              <Link to="/" className="flex items-center min-w-0 shrink">
                <img
                  src={logo}
                  alt="Mr. Mutton"
                  className="h-8 sm:h-16 md:h-16 w-auto max-w-[100%] object-cover"
                />
              </Link>
            }

            {/* RIGHT: NAV + CTA */}
            <div className="ml-auto flex items-center gap-6">
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6">
                {/* <button onClick={() => scrollToSection("menu")} className="font-semibold hover:text-primary">
            Menu
          </button> */}
                <Link
                  to="/products"
                  className="font-semibold flex items-center gap-1 hover:text-primary"
                >
                  <UtensilsCrossed className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  to="/reviews"
                  className="font-semibold flex items-center gap-1 hover:text-primary"
                >
                  <Star className="h-4 w-4" />
                  Reviews
                </Link>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="font-semibold hover:text-primary"
                >
                  Contact
                </button>

                {user ? (
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2"
                    onClick={() => navigate("/auth")}
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Button>
                )}
                {/* Desktop ORDER NOW */}
                <Button
                  className="hidden md:block p-0 h-[48px] w-auto bg-transparent hover:bg-transparent overflow-hidden shrink-0"
                  onClick={() => {
                    window.open(
                      "https://wa.me/919220829266?text=Hello! I would like to order from Mr. Mutton",
                      "_blank",
                    );
                  }}
                >
                  <img
                    src={orderNowImage}
                    alt="Order Now"
                    className="p-0 h-full w-full object-cover "
                  />
                </Button>
              </nav>

              {/* Mobile ORDER NOW */}
              <div className="flex items-center gap-2 md:hidden">
                {user ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="p-2 rounded-full bg-primary/10 text-primary"
                  >
                    <User className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/auth")}
                    className="p-2 rounded-full bg-secondary text-foreground"
                  >
                    <User className="h-5 w-5" />
                  </button>
                )}
                {/* <Button
                  className="md:hidden p-0 h-[40px] w-auto bg-transparent hover:bg-transparent shrink-0"
                  onClick={() => {
                    window.open(
                      "https://wa.me/919220829266?text=Hello! I would like to order from Mr. Mutton",
                      "_blank",
                    );
                  }}
                >
                  <img
                    src={orderNowImagemobile}
                    alt="Order Now"
                    className="h-full w-auto object-contain"
                  />
                </Button> */}

                {/* MOBILE HAMBURGER */}
                <Button
                  className="md:hidden p-2"
                  variant="ghost"
                  onClick={() => setOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity
  ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[100%] max-w-sm
  bg-background z-50 transform transition-transform duration-300
  ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <img src={logo} alt="Mr Mutton" className="h-10" />
          <Button variant="ghost" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex flex-col p-6 gap-5 text-lg font-semibold">
          <Link to="/products" onClick={() => setOpen(false)}>
            Products
          </Link>

          <Link to="/reviews" onClick={() => setOpen(false)}>
            Reviews
          </Link>

          <Link to="/privacy-policy" onClick={() => setOpen(false)}>
            Privacy Policy
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              scrollToSection("contact");
            }}
            className="text-left"
          >
            Contact
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
