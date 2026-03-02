import swiggyLogo from "@/assets/platforms/swiggy.png";
import zomatoLogo from "@/assets/platforms/zomato.png";
import magicpinLogo from "@/assets/platforms/magicpin.png";
import { ExternalLink } from "lucide-react";

const platforms = [
  {
    name: "Swiggy",
    logo: swiggyLogo,
    color: "hsl(25, 100%, 50%)",
    bg: "hsl(25, 100%, 97%)",
    link:"https://www.swiggy.com/",
  },
  {
    name: "Zomato",
    logo: zomatoLogo,
    color: "hsl(0, 80%, 50%)",
    bg: "hsl(0, 80%, 97%)",
    link:"https://www.zomato.com/",
  },
  {
    name: "Magicpin",
    logo: magicpinLogo,
    color: "hsl(120, 60%, 40%)",
    bg: "hsl(120, 60%, 96%)",
    link:"https://www.magicpin.com/",
  },
];

const AvailableOnSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-2">
            Order From Anywhere
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
            We're <span className="text-primary">Live</span> On
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-md mx-auto">
            Order your favourite Mr. Mutton dishes from these popular platforms
          </p>
        </div>

        {/* Platform Cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-3 p-5 sm:p-6 lg:p-8 rounded-2xl bg-card border border-border/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-[140px] sm:w-[180px] lg:w-[200px] cursor-pointer no-underline"
            >
              {/* Live dot */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: platform.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ backgroundColor: platform.color }}
                  />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Live
                </span>
              </div>

              {/* Logo container */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: platform.bg }}
              >
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Name */}
              <span className="font-bold text-sm sm:text-base text-foreground">
                {platform.name}
              </span>

              {/* Order link */}
              <span
                className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: platform.color }}
              >
                Order Now <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableOnSection;
