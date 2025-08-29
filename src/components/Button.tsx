import React from "react";
import { useNavigate } from "react-router-dom";

// Define types for the Button props
interface ButtonProps {
  label: string; // Button label should be a string
  onClick?: () => void; // onClick is an optional function that returns nothing
  to?: string; // 'to' is an optional string, used for navigation
  iconPath?: string; // Optional path for image icon,
  imgStyle?: React.CSSProperties; // Optional image styles (e.g., width, height)
}

export default function Button({
  label,
  onClick,
  to,
  iconPath,
  imgStyle,
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to); // If 'to' is provided, navigate to that path.
    } else if (onClick) {
      onClick(); // If custom onClick handler is provided, use that.
    }
  };

  // If `iconPath` is provided, render the image with optional styling.
  const renderIcon = iconPath ? (
    <img src={iconPath} alt="button icon" className="icon" style={imgStyle} />
  ) : null;

  return (
    <button onClick={handleClick} className="btn">
      {renderIcon}
      <span>{label}</span>
    </button>
  );
}
