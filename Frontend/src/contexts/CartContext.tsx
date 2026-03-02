import { useEffect } from "react";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export interface CartItem {
  id: string;
  item_id: string;
  name: string;
  pieces: string;
  price: number;
  originalPrice: number;
  category: string;
  isVeg: boolean;
  quantity: number;
  image?: string;
}

export interface DeliveryDetails {
  address: string;
  landmark: string;
  timing: string;
  deliveryDay: "today" | "tomorrow" | "";
  mealType: "lunch" | "dinner" | "";
  timeSlot: string;
  latitude?: number;
  longitude?: number;
  isInDeliveryZone?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalSavings: () => number;
  deliveryDetails: DeliveryDetails;
  setDeliveryDetails: React.Dispatch<React.SetStateAction<DeliveryDetails>>;
  placeOrder: (orderData: any) => Promise<void>;


}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    address: "",
    landmark: "",
    timing: "",
    deliveryDay: "",
    mealType: "",
    timeSlot: "",
    latitude: undefined,
    longitude: undefined,
    isInDeliveryZone: undefined,
  });

  const fetchCart = async () => {
  if (!token) return;

  try {
    const res = await fetch(`${API_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Cart error:", data.message);
      return;
    }

    if (!Array.isArray(data)) {
      console.error("Cart data is not array:", data);
      return;
    }

    setItems(data);
  } catch (error) {
    console.error("Fetch cart error:", error);
  }
};



  useEffect(() => {
  fetchCart();
}, [token]);


  const addItem = async (item: any) => {
  if (!token) return;

  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      }),
    });

    const data = await response.json();

    // Instead of fetchCart, update locally
    setItems(prev => {
      const existing = prev.find(i => i.item_id === item.id);

      if (existing) {
        return prev.map(i =>
          i.item_id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

  } catch (error) {
    console.error("Add item error:", error);
  }
};



  const removeItem = async (id: string) => {
    if (!token) return;

    try {
      await fetch(`${API_URL}/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems((prev) => prev.filter((i) => i.item_id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
  if (!token) return;

  try {
    // 🔴 If quantity becomes 0 → remove item
    if (quantity === 0) {
      await fetch(`${API_URL}/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(prev => prev.filter(item => item.item_id !== id));
      return;
    }

    // 🟢 Update quantity in backend
    await fetch(`${API_URL}/api/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    // ✅ Update locally (NO fetchCart here)
    setItems(prev =>
      prev.map(item =>
        item.item_id === id ? { ...item, quantity } : item
      )
    );

  } catch (error) {
    console.error("Update error:", error);
  }
};


const placeOrder = async (orderData: any) => {
  if (!token) return;

  try {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setItems([]);

    // Instead of alert
    window.location.href = "/orders";

  } catch (error) {
    console.error("Order error:", error);
  }
};


  const clearCart = () => setItems([]);

  const getTotalItems = () =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotalSavings = () =>
    items.reduce(
      (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
      0,
    );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getTotalSavings,
        deliveryDetails,
        setDeliveryDetails,
        placeOrder,

      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
