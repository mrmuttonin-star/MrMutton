// Dish images
import muttonHandi from '@/assets/dishes/mutton-handi.jpeg';
import mutton from '@/assets/dishes/mutton.jpeg';
import chicken from '@/assets/dishes/chicken.jpeg';
import muttonThali from '@/assets/dishes/mutton-thali.jpeg';
import tawaRoti from '@/assets/dishes/tawa-roti.jpeg';
import rice from '@/assets/dishes/rice.jpeg';
import combo from '@/assets/dishes/combo.jpg';
import fishCurry from '@/assets/categories/fish-curry.jpeg';
import prawnCurry from '@/assets/dishes/prawn-curry.jpeg';
import chickenThali from '@/assets/dishes/chicken-thali.jpeg';
import kadhaiPaneer from '@/assets/dishes/kadhai-paneer.jpeg';
import masalaRaita from '@/assets/dishes/masala-raita.jpeg';
import boondiRaita from '@/assets/dishes/boondi-raita.jpeg';
import onionRaita from '@/assets/dishes/onion-raita.jpeg';
import dhaniyaChutney from '@/assets/dishes/dhaniya-chutney.jpeg';
import gulabjamun1 from '@/assets/dishes/gulab-jamun1.jpeg';
import gulabjamun4 from '@/assets/dishes/gulab-jamun4.jpeg';

// Category images
import muttonCategory from '@/assets/categories/mutton.jpg';
import chickenCategory from '@/assets/categories/chicken.jpg';
import comboCategory from '@/assets/categories/combo.jpg';
import rotiCategory from '@/assets/categories/roti.jpeg';
// import riceCategory from '@/assets/categories/rice.jpeg';
import seafoodCategory from '@/assets/categories/fish-curry.jpeg';

export interface MenuItem {
  id: string;
  name: string;
  pieces: string;
  price: number;
  originalPrice: number;
  category: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  image: string;
  rating: number;
  ratingCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  isVeg: boolean;
}

export const categories: Category[] = [
  { id: 'mutton', name: 'Mutton', icon: '🍖', image: muttonCategory, description: 'Ahuna Style Mutton', isVeg: false },
  { id: 'chicken', name: 'Chicken', icon: '🍗', image: chickenCategory, description: 'Ahuna Style Chicken', isVeg: false },
  { id: 'seafood', name: 'Seafood', icon: '🐟', image: seafoodCategory, description: 'Fresh Fish & Prawns', isVeg: false },
  { id: 'combo', name: 'Combo Deals', icon: '🍽️', image: comboCategory, description: 'Special Combos', isVeg: false },
  { id: 'thali', name: 'Thali', icon: '🍚', image: chickenThali, description: 'Special Thali', isVeg: false },
  { id: 'veg', name: 'Veg', icon: '🍚', image: kadhaiPaneer, description: 'Veg Items', isVeg: true },
  { id: 'addons', name: 'Add-Ons', icon: '🫓', image: rotiCategory, description: 'Fresh Tawa Roti', isVeg: true },
  // { id: 'rice', name: 'Rice', icon: '🍚', image: riceCategory, description: 'Basmati Rice', isVeg: true },
];

export const menuItems: MenuItem[] = [
  // Mutton Items
 // Mutton Items - 799 mutton is bestseller
  { id: 'mutton-handi-250', name: 'Ahuna Mutton Handi (250g)', pieces: '3 Pieces in Handi', price: 499, originalPrice: 549, category: 'mutton', isVeg: false, image: muttonHandi, rating: 4.5, ratingCount: 55 },
  { id: 'mutton-handi-500', name: 'Ahuna Mutton Handi (500g)', pieces: '6 Pieces in Handi', price: 849, originalPrice: 899, category: 'mutton', isVeg: false, image: muttonHandi, rating: 4.6, ratingCount: 51 },
  { id: 'mutton-handi-1kg', name: 'Ahuna Mutton Handi (1000g)', pieces: '12 Pieces in Handi', price: 1599, originalPrice: 1699, category: 'mutton', isVeg: false, image: muttonHandi, rating: 4.8, ratingCount: 50 },
  { id: 'mutton-250', name: 'Ahuna Mutton (250g)', pieces: '3 Pieces Mutton', price: 499, originalPrice: 599, category: 'mutton', isVeg: false, image: mutton, rating: 4.3, ratingCount: 47 },
  { id: 'mutton-500', name: 'Ahuna Mutton (500g)', pieces: '6 Pieces Mutton', price: 799, originalPrice: 899, category: 'mutton', isVeg: false, isBestseller: true, image: mutton, rating: 4.4, ratingCount: 47 },
  { id: 'mutton-1kg', name: 'Ahuna Mutton (1000g)', pieces: '12 Pieces Mutton', price: 1499, originalPrice: 1599, category: 'mutton', isVeg: false, image: mutton, rating: 4.7, ratingCount: 50 },
  
   // Chicken Items - 499 chicken is bestseller
  { id: 'chicken-500', name: 'Ahuna Chicken (500g)', pieces: '6 Pieces Chicken', price: 499, originalPrice: 599, category: 'chicken', isVeg: false, isBestseller: true, image: chicken, rating: 4.5, ratingCount: 50 },
  { id: 'chicken-1kg', name: 'Ahuna Chicken (1000g)', pieces: '12 Pieces Chicken', price: 799, originalPrice: 899, category: 'chicken', isVeg: false, image: chicken, rating: 4.6, ratingCount: 46 },
  
  
  // Seafood Items
  { id: 'fish-curry-katla', name: 'Fish Curry (Katla)', pieces: '4 Grilled Pieces and Cooked in Mustard Masala', price: 499, originalPrice: 599, category: 'seafood', isVeg: false, image: fishCurry, rating: 4.5, ratingCount: 45 },
   // Prawns - 799 is bestseller (new item)
  { id: 'prawns-500', name: 'Prawns Curry ', pieces: '15 Pieces Prawns Grilled and Cooked in Sabut Garam Masala', price: 799, originalPrice: 999, category: 'seafood', isVeg: false, isBestseller: true, image: prawnCurry, rating: 4.7, ratingCount: 45 },
  
  
  // Combo Items
  { id: 'combo-mutton-chicken', name: 'Ahuna Mutton & Chicken', pieces: 'Mutton 4 Pcs + Chicken 4 Pcs', price: 1099, originalPrice: 1199, category: 'combo', isVeg: false, image: combo, rating: 4.7, ratingCount: 46 },
  { id: 'combo-chicken-mutton', name: 'Ahuna Chicken & Mutton', pieces: 'Chicken 6 Pcs + Mutton 6 Pcs', price: 1399, originalPrice: 1499, category: 'combo', isVeg: false, image: combo, rating: 4.6, ratingCount: 47 },
  
  // Add-Ons
  { id: 'tawa-roti', name: 'Tawa Roti', pieces: '1 Piece', price: 20, originalPrice: 30, category: 'addons', isVeg: true, image: tawaRoti, rating: 4.2, ratingCount: 45 },
  { id: 'rice-full', name: 'Rice - Full Plate', pieces: 'Basmati Steam Rice', price: 150, originalPrice: 200, category: 'addons', isVeg: true, image: rice, rating: 4.4, ratingCount: 50 },
  { id: 'masala-raita', name: 'Masala Raita', pieces: 'Smooth, Spiced, Refreshing curd side.Serve 1 Person ', price: 69, originalPrice: 89, category: 'addons', isVeg: true, image: masalaRaita, rating: 4.4, ratingCount: 50 },
  { id: 'boondi-raita', name: 'Boondi Raita', pieces: 'Curd with Crispy Haldiram Pearls.Serve 1 Person', price: 69, originalPrice: 89, category: 'addons', isVeg: true, image: boondiRaita, rating: 4.4, ratingCount: 50 },
  { id: 'onion-raita', name: 'Onion Raita', pieces: 'Curd with Crunchy Chopped onions', price: 69, originalPrice: 89, category: 'addons', isVeg: true, image: onionRaita, rating: 4.4, ratingCount: 50 },
  { id: 'dhaniya-chutney', name: 'Dhaniya Chutney', pieces: 'Dhaniya Base, Garlic, Green Chilly, Ginger, Tomato & Salt', price: 69, originalPrice: 89, category: 'addons', isVeg: true, image: dhaniyaChutney, rating: 4.4, ratingCount: 50 },
  { id: 'gulab-jamun1', name: 'Gulab Jamun(1 Piece)', pieces: 'Gulab Jamun(1 Piece)', price: 69, originalPrice: 89, category: 'addons', isVeg: true, image: gulabjamun1, rating: 4.4, ratingCount: 50 },
  { id: 'gulab-jamun4', name: 'Gulab Jamun(4 Piece)', pieces: 'Gulab Jamun(4 Piece) Family Pack', price: 199, originalPrice: 249, category: 'addons', isVeg: true, image: gulabjamun4, rating: 4.4, ratingCount: 50 },


  // thali
  { id: 'mutton-thali', name: 'Mutton Thali', pieces: 'Ahuna Mutton (3 Pcs) + Rice + Lachha Pyaj + Lemon slice', price: 549, originalPrice: 649, category: 'thali', isVeg: false, isBestseller: false, image: muttonThali, rating: 4.8, ratingCount: 45 },
  { id: 'chicken-thali', name: 'Chicken Thali', pieces: 'Ahuna Chicken (4 Pcs) + Rice + Lachha Pyaj + Lemon slice', price: 499, originalPrice: 599, category: 'thali', isVeg: false, image: chickenThali, rating: 4.6, ratingCount: 46 },
  { id: 'fish-thali', name: 'Fish Thali', pieces: '3 Grilled Katla Pieces + Rice + Lachha Pyaj + Lemon slice', price: 499, originalPrice: 599, category: 'thali', isVeg: false, image: fishCurry, rating: 4.5, ratingCount: 45 },

  // Kadhai Paneer
  { id: 'kadhai-paneer', name: 'Kadhai Paneer(Half)', pieces: 'Serves 1-2 People', price: 499, originalPrice: 599, category: 'veg', isVeg: true, image: kadhaiPaneer, rating: 4.5, ratingCount: 45 },
  { id: 'kadhai-paneer', name: 'Kadhai Paneer(Full)', pieces: 'Serves 3-4 People', price: 799, originalPrice: 899, category: 'veg', isVeg: true, image: kadhaiPaneer, rating: 4.5, ratingCount: 46 },

];

export const priceRanges = [
  { id: 'under-300', label: 'Under ₹300', min: 0, max: 300 },
  { id: '300-500', label: '₹300 - ₹500', min: 300, max: 500 },
  { id: '500-1000', label: '₹500 - ₹1000', min: 500, max: 1000 },
  { id: 'above-1000', label: 'Above ₹1000', min: 1000, max: Infinity },
];
