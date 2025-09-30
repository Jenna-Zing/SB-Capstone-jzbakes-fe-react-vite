import React from "react";
import useCart from "@/hooks/useCart";
import { type CartItem } from "@/context/CartContext";
import Button from "@/components/Button";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 w-64 bg-white shadow-lg h-full transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
      style={{ zIndex: 999 }}
    >
      <div className="p-4 flex justify-between items-center">
        <Button onClick={clearCart} label="Clear Cart" />
        <Button onClick={onClose} label="X" />
      </div>

      <div className="p-4 overflow-y-auto">
        <h2 className="text-xl font-bold">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item: CartItem) => (
              <li
                key={item.id}
                className="flex justify-between items-center my-2"
              >
                <div>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.cost.toFixed(2)} each</p>
                </div>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  label="Remove"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCost.toFixed(2)}</span>
          </div>

          <Button
            label="Checkout"
            onClick={() => alert("Proceeding to checkout")}
          />
        </div>
      )}
    </div>
  );
}
