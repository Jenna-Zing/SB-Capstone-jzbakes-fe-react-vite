import React from "react";
import useCart from "@/hooks/useCart";
import { type CartItem } from "@/context/CartContext";
import Button from "@/components/Button";
import { Trash2 } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  // handle quantity change of a product (increment or decrement)
  const handleQuantityChange = (id: number, change: number) => {
    updateQuantity(id, change); // increment or decremnt based on change
  };

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
                className="flex justify-between items-center p-4 border-t"
              >
                <div className="flex-1">
                  <p>{item.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {/* Decrement Button */}
                    {item.quantity === 1 ? (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 border rounded-md text-red-500 border-red-200 hover:bg-red-50"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 border rounded-md"
                      >
                        -
                      </button>
                    )}
                    <span>{item.quantity}</span>
                    {/* Increment Button */}
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2 py-1 border rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <p>${item.cost.toFixed(2)} each</p>
                </div>
                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md "
                >
                  Remove
                </button>
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
