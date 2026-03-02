import { Home, ClipboardList, Menu, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ClipboardList, label: "Orders", path: "/orders" },
    { icon: Menu, label: "Menu", path: "/products" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  // Hide on cart and thank you pages
  if (
    location.pathname === "/cart" ||
    location.pathname === "/thank-you" ||
    location.pathname === "/checkout"
  ) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/products" &&
              location.pathname.startsWith("/menu"));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon
                className={cn("w-5 h-5", isActive && "fill-primary/20")}
              />
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive && "font-semibold",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
