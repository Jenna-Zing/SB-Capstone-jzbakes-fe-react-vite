import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/hooks/useUser";

function TopNavigation() {
  const { username, accessToken } = useUser();
  const isLoggedIn = false;

  return (
    <nav
      style={{
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        height: "64px",
        width: "100%",
      }}
    >
      <div>{JSON.stringify(username)}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "16px",
          paddingRight: "16px",
          height: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Left: React Logo */}
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Button
            label=""
            onClick={() => (window.location.href = "/")}
            iconElement={<FontAwesomeIcon icon={faHouse} />}
          />
        </div>

        {/* Center: Order History Button */}
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          <Button
            label="Order History"
            onClick={() => (window.location.href = "/order-history")}
          />
        </div>

        {/* Right: Auth Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
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
            <Button
              label="Logout"
              onClick={() => {
                /* logout logic here */
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNavigation;
