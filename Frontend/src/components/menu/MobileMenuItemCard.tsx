import React,{ useState } from 'react';
import { Plus, Minus, Star, Flame, Bookmark, Share2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/MenuData';

interface MobileMenuItemCardProps {
  item: MenuItem;
}

const MobileMenuItemCard: React.FC<MobileMenuItemCardProps> = ({ item }) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const discountPercent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      pieces: item.pieces,
      price: item.price,
      originalPrice: item.originalPrice,
      category: item.category,
      isVeg: item.isVeg,
      image: item.image,
    });
  };

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          {/* Veg/Non-veg indicator */}
          <div className="flex items-center gap-2 mb-2">
            {item.isVeg ? (
              <div className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
            ) : (
              <div className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
            )}
            {item.isBestseller && (
              <span className="flex items-center gap-1 text-xs font-semibold text-orange-600">
                <Flame className="h-3 w-3" /> Bestseller
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-bold text-foreground text-lg leading-tight mb-1">
            {item.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
              <span>{item.rating.toFixed(1)}</span>
              <Star className="h-3 w-3 fill-white" />
            </div>
            <span className="text-xs text-muted-foreground">
              ({item.ratingCount}+ ratings)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-foreground">₹{item.price}</span>
            {discountPercent > 0 && (
              <>
                <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
            {item.pieces}. Traditional Ahuna style preparation with aromatic spices and slow-cooked to perfection.
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary font-medium mt-1"
          >
            {isExpanded ? 'less' : '...more'}
          </button>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-3">
            <button className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors">
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors">
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Right - Image and Add Button */}
        <div className="relative flex-shrink-0 w-32 sm:w-40">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-28 sm:h-32 object-cover rounded-lg"
          />
          
          {/* Add Button overlapping image */}
          <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-[90%]">
            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="w-full py-2 bg-card border-2 border-primary text-primary font-bold text-sm rounded-lg shadow-md hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1"
              >
                ADD
                <Plus className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex items-center justify-between bg-primary rounded-lg overflow-hidden shadow-md">
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
    </div>
  );
};

export default MobileMenuItemCard;
