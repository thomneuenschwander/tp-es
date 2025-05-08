// src/contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';

export interface PizzaItem {
  id: string;
  type: 'pizza';
  flavor: string;
  size: string;
  extras: { idAdicional: string; nome: string }[];
  price: number;
  image: string;
  quantity: number;
  idBack: string;
}

export interface DrinkItem {
  id: string;
  type: 'drink';
  name: string;
  price: number;
  image: string;
  quantity: number;
  idBack: string;
}

export type CartItem = PizzaItem | DrinkItem;

export interface NewPizzaItem {
  type: 'pizza';
  flavor: string;
  size: string;
  extras: { idAdicional: string; nome: string }[];
  price: number;
  image: string;
  quantity: number;
  idBack: string;
}

export interface NewDrinkItem {
  type: 'drink';
  name: string;
  price: number;
  image: string;
  quantity: number;
  idBack: string;
}

type CartContextType = {
  items: CartItem[];
  addItem: (item: NewPizzaItem | NewDrinkItem) => string;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: NewPizzaItem | NewDrinkItem) => {
    const id = uuid();
    setItems((prev) => [...prev, { ...item, id }]);
    return id;
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};