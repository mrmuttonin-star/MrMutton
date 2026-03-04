import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { categories, menuItems, priceRanges } from '@/data/MenuData';
import MobileMenuItemCard from '@/components/menu/MobileMenuItemCard';
import ViewCartBar from '@/components/menu/ViewCartBar';
import FloatingMenuButton from '@/components/menu/FloatingMenuButton';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const MenuPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  
  const [showNonVegOnly, setShowNonVegOnly] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [showBestseller, setShowBestseller] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Safety: ensure body scroll is never stuck disabled on this page
  useEffect(() => {
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const category = categories.find(c => c.id === categoryId);
  
  const categoryItems = useMemo(() => {
    return menuItems.filter(item => item.category === categoryId);
  }, [categoryId]);

  const filteredItems = useMemo(() => {
    return categoryItems.filter(item => {
      // Non-veg filter
      if (showNonVegOnly && item.isVeg) return false;
      // Bestseller filter
      if (showBestseller && !item.isBestseller) return false;
      // Price filter
      if (selectedPriceRange) {
        const range = priceRanges.find(r => r.id === selectedPriceRange);
        if (range && (item.price < range.min || item.price >= range.max)) {
          return false;
        }
      }
      return true;
    });
  }, [categoryItems, showNonVegOnly, showBestseller, selectedPriceRange]);

  const clearFilters = () => {
    setShowNonVegOnly(false);
    setShowBestseller(false);
    setSelectedPriceRange(null);
  };

  const hasActiveFilters = showNonVegOnly || showBestseller || selectedPriceRange;

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Category not found</h2>
          <Link to="/#menu" className="text-primary hover:underline">
            Go back to menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      {/* Main Header */}
      <Header />

      {/* Content with padding for fixed header - responsive for different screen sizes */}
      <div className="pt-16 sm:pt-20">
        {/* Category Header */}
        <div className="sticky top-16 sm:top-20 z-30 shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Category Title */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                <span className="text-sm text-muted-foreground">{categoryItems.length} items available</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {/* <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  showFilters || hasActiveFilters
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:bg-muted'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && <span className="ml-1">•</span>}
              </button> */}
              
              {/* <button
                onClick={() => setShowNonVegOnly(!showNonVegOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  showNonVegOnly
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-card text-foreground border-border hover:bg-muted'
                }`}
              >
                <div className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center bg-white">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
                Non-Veg
              </button> */}
              
              <button
                onClick={() => setShowBestseller(!showBestseller)}
                className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  showBestseller
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-card text-foreground border-border hover:bg-muted'
                }`}
              >
                🔥 Bestseller
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1.5 rounded-full border border-destructive text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Price Filter Dropdown */}
          {showFilters && (
            <div className="px-4 pb-3 border-t border-border pt-3 animate-fade-in">
              <p className="text-sm font-medium text-muted-foreground mb-2">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map(range => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)}
                    className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                      selectedPriceRange === range.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu Items List */}
        <div className="px-4 py-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No items match your filters</p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map(item => (
                <MobileMenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Cart Bar */}
      {getTotalItems() > 0 && (
        <ViewCartBar />
      )}

      {/* Floating Menu Button */}
      <FloatingMenuButton hidden={false} />
    </div>
  );
};

export default MenuPage;
