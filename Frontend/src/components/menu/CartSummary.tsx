import { ShoppingCart, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartSummary = () => {
  const { items, getTotalItems, getTotalPrice, updateQuantity, clearCart } = useCart();
  const whatsappNumber = "919876543210";

  const handleOrderOnWhatsApp = () => {
    if (items.length === 0) return;

    let message = "🛒 *New Order from Mr. Mutton Website*\n\n";
    message += "📋 *Order Details:*\n";
    message += "━━━━━━━━━━━━━━━━━\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   📦 Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
    });
    
    message += "━━━━━━━━━━━━━━━━━\n";
    message += `💰 *Total Amount: ₹${getTotalPrice()}*\n\n`;
    message += "Please confirm this order. 🙏";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-40 animate-slide-in-bottom">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            </div>
            <div>
              <p className="font-bold text-foreground">
                {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} in cart
              </p>
              <p className="text-lg font-bold text-primary">₹{getTotalPrice()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
            
            <Button
              onClick={handleOrderOnWhatsApp}
              className="gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Request Order on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
