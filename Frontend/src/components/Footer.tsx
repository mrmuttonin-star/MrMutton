import { MapPin, Phone, Mail, Star, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/elements/logo.png";
import { Link } from "react-router-dom";
import orderNowImagedesktopfooter from "@/assets/elements/footerdesktop.png";
import { useNavigate } from "react-router-dom";
import fssaiLogo from "@/assets/fssai.jpg";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            {/* <div className="flex items-center gap-3">
              <img src={logo} alt="Mr Mutton Logo" className="h-16 w-16 object-contain" />
              <div>
                <h3 className="text-xl font-bold text-foreground">Mr. Mutton</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Slow Cooked. Soul Satisfied.</p>
              </div>
            </div> */}
            {/* LEFT: Brand Image  */}
 { <Link to="/" className="flex items-center min-w-0 shrink">
  <img
    src={logo}
    alt="Mr. Mutton"
    className="h-8 sm:h-16 md:h-16 w-auto max-w-[100%] object-cover"
  />
</Link> }
            <p className="text-muted-foreground">
              Experience the authentic taste of traditional handi cooking, prepared with love and premium ingredients.
            </p>
            <Button 
              variant="default" 
              className="gap-2 w-full sm:w-auto" 
              onClick={() => window.open("https://g.page/r/CYBFAHa8e50AEAE/review", "_blank")}
            >
              <Star className="h-4 w-4 fill-current" />
              Leave a Review
            </Button>
            {/* <div class="social-links">
  <a href="#" class="icon"><i class="fab fa-linkedin-in"></i></a>
  <a href="#" class="icon"><i class="fab fa-instagram"></i></a>
  <a href="#" class="icon"><i class="fab fa-x-twitter"></i></a>
  <a href="#" class="icon"><i class="fab fa-github"></i></a>
  <a href="#" class="icon"><i class="fab fa-facebook-f"></i></a>
</div> */}
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/mrmutton.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full 
             bg-[#1c120d] text-[#f5b642]
             hover:bg-[#f5b642] hover:text-[#1c120d]
             transition-all duration-300 hover:scale-110 shadow-md"
>
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/mrmutton.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full 
             bg-[#1c120d] text-[#d4af37]
             hover:bg-[#d4af37] hover:text-[#1c120d]
             transition-all duration-300 hover:scale-110 shadow-md"
>
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/mrmutton/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1c120d] text-[#f5b642] hover:bg-[#f5b642] hover:text-[#1c120d]
             p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
>
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@MrMutton_in"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full 
             bg-[#2b0f0f] text-[#f5b642]
             hover:bg-[#f5b642] hover:text-[#2b0f0f]
             transition-all duration-300 hover:scale-110 shadow-md"
>
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <a href="tel:+919220829266" className="hover:text-primary transition-colors">
                    +91 92208 29266
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a href="mailto:contact@mrmutton.com" className="hover:text-primary transition-colors">
                    contact@mrmutton.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <p><span className="font-semibold">600m from Vatika Chowk</span>, Sector 66,</p>
                  <p>Gurugram, Haryana 122101</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-6">Opening Hours</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Monday - Friday</span>
                <span>11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Saturday - Sunday</span>
                <span>11:00 AM - 11:00 PM</span>
              </div>
            </div>
            {/* <div className="pt-6"> */}
              {/* <Button
  className="
    w-full
    h-[48px]
    p-0
    bg-transparent
    hover:bg-transparent
    overflow-hidden
    rounded-[999px]
    border-none
    shrink-0
  "
  onClick={() => navigate("/products")}
>
  <img
    src={orderNowImagedesktopfooter}
    alt="Order Now"
    className="block w-full h-full object-cover rounded-[999px]"
  />
</Button> */}
{/* <div className="flex items-center justify-center p-0 rounded-2xl bg-secondary/40 border border-border/50"> */}
                <img src={fssaiLogo} alt="FSSAI - Food Safety and Standards Authority of India" className="h-16 w-auto object-contain rounded-lg" />
              {/* </div> */}


            {/* </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()}Mr. Mutton.
All rights reserved by Eatora Foods LLP.</p>
          <p className="text-sm mt-2">Made with ❤️ for food lovers everywhere</p>
          <a href="/privacy-policy" className="text-sm mt-2 inline-block hover:text-primary transition-colors underline underline-offset-2">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
