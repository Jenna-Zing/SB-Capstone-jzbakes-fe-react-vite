import { createContext } from "react";

// Define the shape of the cart state
export interface CartItem {
  id: number;
  name: string;
  cost: number;
  quantity: number;
  imgURL: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Initial empty cart
const initialState: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

export const CartContext = createContext<CartContextType>(initialState);
