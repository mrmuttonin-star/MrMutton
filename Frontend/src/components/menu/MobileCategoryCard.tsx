import React from "react";
import { useNavigate } from 'react-router-dom';
import { Category, menuItems } from '@/data/MenuData';

interface MobileCategoryCardProps {
  category: Category;
}

const MobileCategoryCard: React.FC<MobileCategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const itemCount = menuItems.filter(item => item.category === category.id).length;

  return (
    <button
      onClick={() => navigate(`/menu/${category.id}`)}
      className="flex flex-col items-center gap-2 min-w-[90px] group py-2"
    >
      <div className="w-24 h-24 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-[3px] border-primary/70 flex items-center justify-center group-hover:scale-115 group-hover:border-primary group-hover:shadow-xl transition-all duration-300 shadow-lg relative z-10 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">{category.name}</p>
        <p className="text-xs text-muted-foreground">{itemCount} items</p>
      </div>
    </button>
  );
};

export default MobileCategoryCard;
