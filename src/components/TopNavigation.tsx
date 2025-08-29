import React from "react";
import reactLogo from "../assets/react.svg";
import Button from "./Button";

function TopNavigation() {
  const isLoggedIn = false;

  return !isLoggedIn ? (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        height: "64px",
      }}
    >
      {/* Left: React Logo */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        {/* Home Button */}
        <Button
          label=""
          iconPath={reactLogo}
          imgStyle={{ height: "40px" }}
          onClick={() => (window.location.href = "/")}
        />
      </div>
      {/* Center: Order History Button */}
      <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
        <Button
          label="Order History"
          onClick={() => (window.location.href = "/order-history")}
        />
      </div>
      {/* Right: Sign Up and Login Buttons */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <Button
          label="Sign Up"
          onClick={() => (window.location.href = "/sign-up")}
        />
        <Button
          label="Login"
          onClick={() => (window.location.href = "/login")}
        />
      </div>
    </nav>
  ) : (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        height: "64px",
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        {/* Home Button */}
        <Button
          label=""
          iconPath={logo}
          imgStyle={{ height: "40px" }}
          onClick={() => (window.location.href = "/")}
        />
      </div>
      {/* Center: Order History Button */}
      <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
        <Button
          label="Order History"
          onClick={() => (window.location.href = "/order-history")}
        />
      </div>
      {/* Right: Sign Up and Login Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
        <Button
          label="Logout"
          onClick={() => {
            /* Implement logout logic here */
          }}
        />
      </div>
    </nav>
  );
}

export default TopNavigation;
