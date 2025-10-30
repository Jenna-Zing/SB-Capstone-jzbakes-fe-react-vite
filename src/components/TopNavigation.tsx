import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "@/context/CartContext";
import useCart from "@/hooks/useCart";

type TopNavigationProps = {
  onCartToggle: () => void;
};

function TopNavigation({ onCartToggle }: TopNavigationProps) {
  const { user, isLoggedIn, setUser } = useUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST", // Use POST or GET, depending on your backend
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (response.ok) {
        // Clear the user state after successful logout
        setUser({
          username: null,
          firstName: null,
          lastName: null,
          email: null,
          isLoggedIn: false,
        });

        // Optionally show a message to the user (could use a toast notification)
        alert("You have been logged out!");

        // Redirect to the login page or home page
        navigate("/login"); // Redirect to the login page (or home page)
      } else {
        const error = await response.json();
        alert(`Logout failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-md h-16 w-full">
      <div className="flex items-center justify-between px-4 h-full max-w-screen-xl mx-auto">
        {/* Left: React Logo */}
        <div className="flex items-center flex-1">
          <Button
            label=""
            onClick={() => navigate("/")}
            iconElement={<FontAwesomeIcon icon={faHouse} />}
          />
        </div>

        {/* Center: Order History Button */}
        {/* check with !!user (by object) or by username existence  */}
        {!!user ? (
          <>
            <div className="flex justify-center flex-1">
              <Button
                label="Order History"
                onClick={() => navigate("/order-history")}
              />
            </div>
          </>
        ) : null}

        {/* Right: Auth Buttons */}
        <div className="flex gap-4 items-center justify-end flex-1">
          {!isLoggedIn ? (
            <>
              <Button label="Sign Up" onClick={() => navigate("/sign-up")} />
              <Button label="Login" onClick={() => navigate("/login")} />
            </>
          ) : (
            <>
              {/* Cart icon with badge */}
              <button
                onClick={onCartToggle}
                className="relative p-2 rounded hover:bg-gray-100"
                aria-label="Toggle cart"
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                    {totalQuantity}
                  </span>
                )}
              </button>
              <Button label="Logout" onClick={handleLogout} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNavigation;
