"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { ALL_PRODUCTS } from "./products";

export interface CartItem {
  id: string; // unique key: `${productId}-${size}`
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  quantity: number;
  slug: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    item: {
      productId: string;
      name: string;
      price: number;
      originalPrice?: number;
      image: string;
      size: string;
      quantity?: number;
      slug: string;
    },
    openDrawer?: boolean
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1500;

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "p1-38",
    productId: "p1",
    name: "Kruvaze Keten Blazer Ceket",
    price: 1650,
    originalPrice: 1950,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=180&auto=format&fit=crop&q=80",
    size: "38",
    quantity: 1,
    slug: "kruvaze-keten-blazer-ceket",
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("atelier_silk_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("atelier_silk_cart", JSON.stringify(items));
    } catch {
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart: CartContextType["addToCart"] = (item, openDrawer = true) => {
    const qtyToAdd = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const itemKey = `${item.productId}-${item.size}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: item.productId,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            size: item.size,
            quantity: qtyToAdd,
            slug: item.slug,
          },
        ];
      }
    });

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
