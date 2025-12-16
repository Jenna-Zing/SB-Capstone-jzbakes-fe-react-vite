import { type ReactNode, useState } from "react";
import { type CartItem, CartContext } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

      // const updatedCart = prevCart
      //   .map((cartItem) => {
      //     if (cartItem.id === id) {
      //       const newQuantity = cartItem.quantity + delta;

      //       // if the quantity is 0 or less, remove the item from the cart
      //       if (newQuantity <= 0) {
      //         return null; // mark for removal
      //       }
      //       return { ...cartItem, quantity: newQuantity };
      //     }
      //     return cartItem;
      //   })
      //   .filter((item) => item !== null); // **remove any null entries (items with 0 quantity)

      return updatedCart;
    });
  };

  // clears the cart of all products that were selected
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
