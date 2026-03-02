import { useState } from 'react';
import { UtensilsCrossed, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { categories, menuItems } from '@/data/MenuData';

interface FloatingMenuButtonProps {
  hidden?: boolean;
}

const FloatingMenuButton = ({ hidden = false }: FloatingMenuButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const getItemCount = (catId: string) => {
    return menuItems.filter(item => item.category === catId).length;
  };

  const handleCategoryClick = (catId: string) => {
    setIsOpen(false);
    navigate(`/menu/${catId}`);
  };

  if (hidden) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Popup - Responsive positioning with smooth animation */}
      <div 
        className={`fixed z-50 transition-all duration-300 ease-out
          ${isOpen 
            ? 'opacity-100 scale-100 pointer-events-auto' 
            : 'opacity-0 scale-95 pointer-events-none'
          }
          bottom-28 left-1/2 -translate-x-1/2
          md:left-auto md:right-4 md:translate-x-0
          w-[calc(100%-2rem)] max-w-[280px] md:w-[260px]
        `}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-foreground text-lg">Menu</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="max-h-[50vh] overflow-y-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  categoryId === cat.id ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className={`font-medium text-sm ${categoryId === cat.id ? 'text-primary' : 'text-foreground'}`}>
                    {cat.name}
                  </p>
                </div>
                <span className="text-sm text-primary font-semibold">{getItemCount(cat.id)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Button - Centered on mobile, right-aligned on desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 bg-foreground text-background rounded-full px-5 py-3 shadow-2xl flex items-center gap-2 transition-all duration-300
          bottom-40 left-1/2 -translate-x-1/2
          md:left-auto md:right-4 md:translate-x-0
          hover:scale-105 active:scale-95
        `}
      >
        <UtensilsCrossed className="h-5 w-5" />
        <span className="font-bold text-sm">Menu</span>
      </button>
    </>
  );
};

export default FloatingMenuButton;
