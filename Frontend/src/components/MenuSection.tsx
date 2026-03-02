import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, menuItems } from '@/data/MenuData';
import MobileCategoryCard from '@/components/menu/MobileCategoryCard';
import CartSummary from '@/components/menu/CartSummary';
import { useCart } from '@/contexts/CartContext';
import ViewCartBar from './menu/ViewCartBar';
import CartDrawer from './menu/CartDrawer';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";


const MenuSection = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);


  const scrollCategoriesRight = () => {
  categoryScrollRef.current?.scrollBy({
    left: 160,
    behavior: "smooth",
  });
};

const scrollCategoriesLeft = () => {
  categoryScrollRef.current?.scrollBy({
    left: -160,
    behavior: "smooth",
  });
};


const handleCategoryScroll = () => {
  if (!categoryScrollRef.current) return;
  setShowLeftArrow(categoryScrollRef.current.scrollLeft > 10);
};


  const getItemsForCategory = (categoryId: string) => {
    return menuItems.filter(item => item.category === categoryId);
  };

  const bestsellers = menuItems.filter(item => item.isBestseller);

  return (
    <section id="menu" className="py-12 sm:py-20 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-26">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Our Special Menu
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Authentic Ahuna prepared in traditional earthen pots with aromatic spices
          </p>
        </div>

        {/* Mobile Category Scroll */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 px-1">
            What would you like to order?
          </h3>
          
          <div className="relative">
  {/* Scroll container */}
  <div
    ref={categoryScrollRef}
    onScroll={handleCategoryScroll}
    className="overflow-x-auto scrollbar-hide pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
  >
    <div className="flex gap-4 sm:gap-6 sm:flex-wrap sm:justify-center lg:justify-start min-w-max sm:min-w-0 px-2">
      {categories.map(category => (
        <MobileCategoryCard key={category.id} category={category} />
      ))}
    </div>
  </div>

  {/* LEFT ARROW – only after scroll */}
  {showLeftArrow && (
    <button
      onClick={scrollCategoriesLeft}
      className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full p-2"
    >
      <ChevronLeft className="h-5 w-5 text-foreground" />
    </button>
  )}

  {/* RIGHT ARROW – always visible */}
  <button
    onClick={scrollCategoriesRight}
    className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full p-2"
  >
    <ChevronRight className="h-5 w-5 text-foreground" />
  </button>
</div>


          {/* Scroll indicator dots for mobile */}
          <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
            {categories.map((_, idx) => (
              <div key={idx} className="w-2 h-2 rounded-full bg-primary/30" />
            ))}
          </div>
        </div>

        {/* Desktop Grid View for Categories */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 mb-12">
          {categories.map(category => {
            const items = getItemsForCategory(category.id);
            return (
              <button
                key={category.id}
                onClick={() => navigate(`/menu/${category.id}`)}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300 text-left"
              >
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <p className="text-sm font-semibold text-primary mt-2">
                    {items.length} items →
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bestsellers Section */}
        <div className="mt-8 sm:mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            🔥 Bestsellers
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bestsellers.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(`/menu/${item.category}`)}
                className="menu-card p-4 hover-lift text-left group"
              >
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.isVeg ? (
                        <div className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                      )}
                      <span className="text-xs font-semibold text-orange-600">
                        Bestseller
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.pieces}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">₹{item.price}</span>
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Bar for Home Page */}
      {getTotalItems() > 0 && (
        <ViewCartBar onViewCart={() => setIsCartOpen(true)} />
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </section>
  );
};

export default MenuSection;
