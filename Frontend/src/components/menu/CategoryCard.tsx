import { Category } from '@/data/MenuData';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  itemCount: number;
}

const CategoryCard = ({ category, onClick, itemCount }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-card group-hover:border-primary/30 group-hover:scale-105 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        {category.isVeg && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-card">
            <span className="text-white text-xs">🌱</span>
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 min-w-6 h-6 px-1.5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
          {itemCount}
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground">{category.description}</p>
      </div>
    </button>
  );
};

export default CategoryCard;
