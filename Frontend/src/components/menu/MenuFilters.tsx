import { Filter, Leaf, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { priceRanges } from '@/data/MenuData';

interface MenuFiltersProps {
  selectedPriceRanges: string[];
  onPriceRangeChange: (ranges: string[]) => void;
  showVegOnly: boolean;
  onVegOnlyChange: (value: boolean) => void;
  showBestseller: boolean;
  onBestsellerChange: (value: boolean) => void;
}

const MenuFilters = ({
  selectedPriceRanges,
  onPriceRangeChange,
  showVegOnly,
  onVegOnlyChange,
  showBestseller,
  onBestsellerChange,
}: MenuFiltersProps) => {
  const togglePriceRange = (rangeId: string) => {
    if (selectedPriceRanges.includes(rangeId)) {
      onPriceRangeChange(selectedPriceRanges.filter(id => id !== rangeId));
    } else {
      onPriceRangeChange([...selectedPriceRanges, rangeId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* Main Filters Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 bg-card border-border hover:bg-muted"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedPriceRanges.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                {selectedPriceRanges.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-card border-border z-50" align="start">
          {priceRanges.map(range => (
            <DropdownMenuCheckboxItem
              key={range.id}
              checked={selectedPriceRanges.includes(range.id)}
              onCheckedChange={() => togglePriceRange(range.id)}
              className="cursor-pointer"
            >
              {range.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Veg Only Toggle */}
      <Button
        variant={showVegOnly ? "default" : "outline"}
        onClick={() => onVegOnlyChange(!showVegOnly)}
        className={`gap-2 ${showVegOnly 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'bg-card border-border hover:bg-muted'
        }`}
      >
        <Leaf className="h-4 w-4" />
        Pure Veg
      </Button>

      {/* Bestseller Toggle */}
      <Button
        variant={showBestseller ? "default" : "outline"}
        onClick={() => onBestsellerChange(!showBestseller)}
        className={`gap-2 ${showBestseller 
          ? 'bg-primary hover:bg-primary/90' 
          : 'bg-card border-border hover:bg-muted'
        }`}
      >
        <Flame className="h-4 w-4" />
        Bestseller
      </Button>
    </div>
  );
};

export default MenuFilters;
