import React from "react";
import ShoppingCartIcon from "../assets/shopping-cart-icon.png"; // Adjust the path as necessary

function CartSideNav() {
  return (
    <div className="cart-side-nav">
      <img
        src={ShoppingCartIcon}
        alt="Shopping Cart Icon"
        style={{ height: "40px" }}
      />
      <h2>Cart</h2>
      <p>Your cart is empty.</p>
      {/* Additional cart functionality can be added here */}
    </div>
  );
}

export default CartSideNav;
