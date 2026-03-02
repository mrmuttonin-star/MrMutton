import { ShoppingCart, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from "react-router-dom";

const ViewCartBar = () => {

  const { getTotalItems, getTotalPrice, items } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();


  if (totalItems === 0) return null;

  // Get first few item images for preview
  const previewImages = items.slice(0, 3).map(item => item.image).filter(Boolean);

  return (
    <div className="fixed bottom-14 left-0 right-0 z-40 px-4 pb-4 pointer-events-none">
      <button
        onClick={() => navigate("/cart")}
        className="w-full max-w-lg mx-auto bg-primary rounded-xl shadow-2xl flex items-center justify-between p-4 pointer-events-auto animate-slide-in-bottom"
      >
        <div className="flex items-center gap-3">
          {/* Item preview images */}
          <div className="flex -space-x-2">
            {previewImages.length > 0 ? (
              previewImages.map((img, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full border-2 border-primary-foreground overflow-hidden"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>
          
          <div className="text-left">
            <p className="text-primary-foreground font-bold">
              {totalItems} item{totalItems > 1 ? 's' : ''} added
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-primary-foreground font-bold text-lg">
            View cart
          </span>
          <ChevronRight className="h-5 w-5 text-primary-foreground" />
        </div>
      </button>
    </div>
  );
};

export default ViewCartBar;
