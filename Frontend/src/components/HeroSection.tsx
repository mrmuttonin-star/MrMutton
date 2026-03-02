// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import heroMutton from "@/assets/hero-mutton.jpg";
// import heroChicken from "@/assets/hero-chicken.jpg";

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const slides = [
//     {
//       image: heroMutton,
//       title: "Melt-in-Your-Mouth Perfection",
//       subtitle: "Slow-cooked in Earthen Pots",
//       description: "Experience the authentic taste of traditional mutton handi, prepared with love and centuries-old recipes"
//     },
//     {
//       image: heroChicken,
//       title: "Tender & Aromatic Chicken",
//       subtitle: "Cooked to Golden Perfection",
//       description: "Savor our signature chicken handi with rich spices and tender meat that falls off the bone"
//     }
//   ];

//   const whatsappNumber = "919876543210"; // Update with actual WhatsApp number
//   const message = "Hello! I would like to order from Mr. Mutton";
//   const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

//   return (
//     <section className="relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full overflow-hidden mt-16 sm:mt-20">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent z-10" />
//           <img
//             src={slide.image}
//             alt={slide.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 z-20 flex items-center">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in pr-8 sm:pr-0">
//                 <p className="text-accent text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-wider">{slide.subtitle}</p>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
//                   {slide.title}
//                 </h2>
//                 <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-md lg:max-w-xl leading-relaxed">
//                   {slide.description}
//                 </p>
//                 <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
//                   <Button 
//                     size="lg" 
//                     className="gap-2 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6"
//                     onClick={() => window.open(whatsappUrl, "_blank")}
//                   >
//                     <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
//                     Order Now
//                   </Button>
//                   <Button 
//                     size="lg" 
//                     variant="outline" 
//                     className="text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6"
//                     onClick={() => {
//                       document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                   >
//                     View Menu
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
      
//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
//       </button>
      
//       {/* Slide Indicators */}
//       <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-1.5 sm:h-2 rounded-full transition-all ${
//               index === currentSlide ? "w-6 sm:w-8 bg-primary" : "w-1.5 sm:w-2 bg-muted"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMutton from "@/assets/hero-mutton1.jpeg";
import heroChicken from "@/assets/hero-chicken1.jpeg";
import logoNew from "@/assets/logo.jpeg";
import herosectiondesktop from "@/assets/elements/herosection.png";
import { useNavigate } from "react-router-dom";



const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  
  const slides = [
    {
      image: heroMutton,
      title: "Melt-in-Your-Mouth Perfection",
      subtitle: "Slow-cooked in Earthen Pots",
      description: "Experience the authentic taste of traditional mutton handi, prepared with love and centuries-old recipes"
    },
    {
      image: heroChicken,
      title: "Tender & Aromatic Chicken",
      subtitle: "Cooked to Golden Perfection",
      description: "Savor our signature chicken handi with rich spices and tender meat that falls off the bone"
    }
  ];

  const whatsappNumber = "919220829266";
  const message = "Hello! I would like to order from Mr. Mutton";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[100svh] sm:min-h-[calc(100vh-5rem)] w-full overflow-hidden mt-16 sm:mt-20">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-background/90 via-background/70 to-background/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="
  w-full h-full object-cover
  object-[75%_center]
  sm:object-center
"
            //  className="relative z-10 w-full h-full object-cover rounded-full"
          />
        </div>
      ))}

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Column (logo top, text below) | Desktop: Row (logo left, text right) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-16">
            
            {/* Large Gradient Circle with Logo - LEFT on desktop, TOP on mobile */}
            <div className="flex-shrink-0 order-1 md:order-1">
              <div className="relative">
                {/* Outer glow effect */}
                {/* <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-destructive to-accent blur-xl opacity-30 scale-110" /> */}
                
                {/* Main gradient circle */}
                {/* <div 
                  className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--destructive)) 0%, hsl(var(--primary)) 50%, hsl(10, 80%, 35%) 100%)"
                  }}
                > */}
                  {/* Inner circle with logo */}
                  {/* Logo ONLY – no color, no gradient */}
<div className="flex-shrink-0 order-1 md:order-1">
  <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] rounded-full overflow-hidden shadow-2xl">
    <img 
      src={logoNew} 
      alt="Mr. Mutton Logo"
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</div>

                {/* </div> */}
              </div>
            </div>

            {/* Text Content - RIGHT on desktop, BELOW on mobile */}
            <div className="flex-1 order-2 md:order-2 max-w-xl lg:max-w-2xl text-center md:text-left space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in">
              {/* Subtitle */}
              <p className="text-primary text-xs sm:text-sm lg:text-base font-bold uppercase tracking-[0.2em]">
                {slides[currentSlide].subtitle}
              </p>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1]">
                {slides[currentSlide].title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-primary">{slides[currentSlide].title.split(" ").slice(-1)}</span>
              </h1>
              
              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
                {slides[currentSlide].description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button
                          className="p-0 h-[48px] w-auto bg-transparent hover:bg-transparent overflow-hidden shrink-0 border-none shadow-none overflow-hidden border-radius:1px"
                          onClick={() => navigate("/products")}
                        >
                          <img src={herosectiondesktop} alt="Order Now" className="p-0 block h-full w-full object-cover rounded-[24px]" />
                        </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border
border-[hsl(var(--primary-dark))]
text-[hsl(var(--primary-dark))]
hover:text-primary-dark
transition-all
hover:bg-[linear-gradient(to_bottom,
  hsl(var(--primary-light)),
  hsl(var(--primary-dark))
)]"
                  onClick={() => {
                    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Menu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 sm:w-10 bg-primary shadow-md" 
                : "w-2 sm:w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
