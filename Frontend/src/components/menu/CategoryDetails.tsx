import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category, MenuItem, priceRanges } from '@/data/MenuData';
import MenuFilters from "./MenuFilters";
import { useState, useMemo } from 'react';
import MenuItemCard from './MenuItemCard';

interface CategoryDetailProps {
  category: Category;
  items: MenuItem[];
  onBack: () => void;
}

const CategoryDetail = ({ category, items, onBack }: CategoryDetailProps) => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [showBestseller, setShowBestseller] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Price filter
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          if (!range) return false;
          return item.price >= range.min && item.price < range.max;
        });
        if (!matchesPrice) return false;
      }

      // Veg filter
      if (showVegOnly && !item.isVeg) return false;

      // Bestseller filter
      if (showBestseller && !item.isBestseller) return false;

      return true;
    });
  }, [items, selectedPriceRanges, showVegOnly, showBestseller]);

  return (
    <div className="animate-fade-in pt-[88px]">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40">
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {category.name}
            </h2>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </div>

      <MenuFilters
        selectedPriceRanges={selectedPriceRanges}
        onPriceRangeChange={setSelectedPriceRanges}
        showVegOnly={showVegOnly}
        onVegOnlyChange={setShowVegOnly}
        showBestseller={showBestseller}
        onBestsellerChange={setShowBestseller}
      />

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No items match your filters</p>
          <Button
            variant="link"
            onClick={() => {
              setSelectedPriceRanges([]);
              setShowVegOnly(false);
              setShowBestseller(false);
            }}
            className="text-primary mt-2"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} /> 
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
