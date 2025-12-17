import { type ReactNode, useState, useEffect } from "react";
import { type CartItem, CartContext } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart by product id
  const addToCart = (item: CartItem) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // remove item from cart by product id
  const removeFromCart = (id: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity of a product in the cart (either increment or decrement)
  const updateQuantity = (id: number, delta: number) => {
    // takes the product id of which item in the cart to update, and change (either +1 for increment or -1 for decrement)
    // if `change` results in quantity of 0 or lower, we mark item for removal by setting it to null and filtering it out
    setCartItems((prevCart) => {
      const updatedCart = prevCart.flatMap((cartItem) => {
        if (cartItem.id === id) {
          const newQuantity = cartItem.quantity + delta;

          // if the quantity is 0 or less, remove the item from the cart
          if (newQuantity <= 0) {
            return []; // flatMap will flatten this into nothing
          }
          return [{ ...cartItem, quantity: newQuantity }];
        }
        return [cartItem];
      });

      return updatedCart;
    });
  };

  // clears the cart of all products that were selected
  const clearCart = () => {
    setCartItems([]);
  };

  const setCart = (items: CartItem[]) => {
    setCartItems(items);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
