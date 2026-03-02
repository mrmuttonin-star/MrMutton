import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MobileSidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* DARK OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm
        bg-background z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* LINKS */}
        <nav className="flex flex-col p-6 gap-4 text-lg">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/products">Products</Link>
          <Link onClick={() => setOpen(false)} to="/about">About Us</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>

          {/* ORDER BUTTON */}
          <Button
            className="mt-6"
            onClick={() => {
              setOpen(false);
              window.open(
                "https://wa.me/919220829266?text=Hello! I would like to order from Mr. Mutton",
                "_blank"
              );
            }}
          >
            Order Now
          </Button>
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
