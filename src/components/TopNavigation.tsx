import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

function TopNavigation() {
  const { isLoggedIn, setUser } = useUser();
  const navigate = useNavigate();

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
          accessToken: null,
          setUser, // pass down setUser function to the user state, so it still works within the user context
          isLoggedIn: false, // Explicitly set isLoggedIn to false
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
            onClick={() => (window.location.href = "/")}
            iconElement={<FontAwesomeIcon icon={faHouse} />}
          />
        </div>

        {/* Center: Order History Button */}
        {isLoggedIn ? (
          <>
            <div className="flex justify-center flex-1">
              <Button
                label="Order History"
                onClick={() => (window.location.href = "/order-history")}
              />
            </div>
          </>
        ) : null}

        {/* Right: Auth Buttons */}
        <div className="flex gap-4 items-center justify-end flex-1">
          {!isLoggedIn ? (
            <>
              <Button
                label="Sign Up"
                onClick={() => (window.location.href = "/sign-up")}
              />
              <Button
                label="Login"
                onClick={() => (window.location.href = "/login")}
              />
            </>
          ) : (
            <Button label="Logout" onClick={handleLogout} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNavigation;
