import { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { 
    items, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems,
    getTotalSavings
  } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSavings = getTotalSavings();

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-3xl max-h-[70vh] flex flex-col animate-slide-in-bottom shadow-2xl border-t border-gray-200"
        style={{ backgroundColor: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200 flex-shrink-0" style={{ backgroundColor: '#FFFFFF' }}>
          <div>
            <h2 className="text-lg font-bold text-foreground">Your Cart</h2>
            <p className="text-xs text-muted-foreground">{getTotalItems()} item(s)</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 px-4 py-3" style={{ backgroundColor: '#FFFFFF' }}>
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-3">Your cart is empty</p>
              <Button onClick={onClose} variant="outline" size="sm">
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      {item.isVeg ? (
                        <div className="w-2.5 h-2.5 border-2 border-green-600 rounded-sm flex items-center justify-center flex-shrink-0">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-2.5 h-2.5 border-2 border-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                          <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                        </div>
                      )}
                      <h4 className="font-medium text-foreground text-xs truncate">{item.name}</h4>
                    </div>
                    <span className="font-bold text-foreground text-xs">₹{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-foreground rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-background hover:bg-foreground/80 rounded-l-md transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-bold text-background min-w-4 text-center text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-background hover:bg-foreground/80 rounded-r-md transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-bold text-foreground text-xs min-w-[40px] text-right">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total */}
        {items.length > 0 && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-200 flex-shrink-0" style={{ backgroundColor: '#FFFFFF' }}>
            {totalSavings > 0 && (
              <div className="flex items-center justify-between mb-2 p-2 bg-success/10 rounded-lg border border-success/20">
                <span className="text-success font-medium text-xs">You save</span>
                <span className="text-success font-bold text-sm">₹{totalSavings}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Total</span>
              <span className="text-lg font-bold text-foreground">₹{getTotalPrice()}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
