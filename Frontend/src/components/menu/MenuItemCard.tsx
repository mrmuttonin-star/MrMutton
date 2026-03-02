import { useState } from 'react';
import { Plus, Minus, Flame, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/MenuData';
import { toast } from '@/hooks/use-toast';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;
  
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [displayRating, setDisplayRating] = useState<number>(item.rating);
  const [displayRatingCount, setDisplayRatingCount] = useState<number>(item.ratingCount);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      pieces: item.pieces,
      price: item.price,
      originalPrice: item.originalPrice,
      category: item.category,
      isVeg: item.isVeg,
    });
  };

  const handleRating = (rating: number) => {
    if (hasRated) return;
    
    setUserRating(rating);
    setHasRated(true);
    
    // Calculate new average rating
    const newRatingCount = displayRatingCount + 1;
    const newRating = ((displayRating * displayRatingCount) + rating) / newRatingCount;
    setDisplayRating(Math.round(newRating * 10) / 10);
    setDisplayRatingCount(newRatingCount);
    
    toast({
      title: "Thanks for rating!",
      description: `You rated ${item.name} ${rating} stars`,
    });
  };

  const discountPercent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <div className="menu-card overflow-hidden hover-lift transition-all duration-300 bg-card rounded-xl shadow-lg">
      {/* Dish Image */}
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-bold shadow-lg">
            {discountPercent}% OFF
          </div>
        )}
        {/* Bestseller Badge */}
        {item.isBestseller && (
          <div className="absolute top-3 left-3 flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded-full shadow-lg">
            <Flame className="h-3 w-3" /> Bestseller
          </div>
        )}
        {/* Veg/Non-veg indicator */}
        <div className="absolute top-3 right-3">
          {item.isVeg ? (
            <div className="w-5 h-5 border-2 border-green-600 bg-white rounded-sm flex items-center justify-center shadow-md">
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="w-5 h-5 border-2 border-red-600 bg-white rounded-sm flex items-center justify-center shadow-md">
              <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
            </div>
          )}
        </div>
        {/* Rating Display Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md shadow-lg">
          <span className="font-bold text-sm">{displayRating.toFixed(1)}</span>
          <Star className="h-3 w-3 fill-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-foreground text-lg leading-tight mb-1">
          {item.name}
        </h4>
        <p className="text-muted-foreground text-sm mb-2">{item.pieces}</p>
        
        {/* Rating Stars for User Input */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                onMouseEnter={() => !hasRated && setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={hasRated}
                className={`transition-all duration-150 ${hasRated ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
              >
                <Star 
                  className={`h-4 w-4 transition-colors ${
                    (hasRated ? userRating : hoveredRating) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({displayRatingCount} {hasRated ? '• Your rating: ' + userRating + '★' : 'ratings'})
          </span>
        </div>
        
        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">₹{item.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
          </div>

          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2 shadow-lg"
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-primary rounded-lg overflow-hidden shadow-lg">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="p-2 hover:bg-primary/80 transition-colors text-primary-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold text-primary-foreground min-w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="p-2 hover:bg-primary/80 transition-colors text-primary-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
