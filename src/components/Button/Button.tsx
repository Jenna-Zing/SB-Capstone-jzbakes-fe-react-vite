import React from "react";
import { useNavigate } from "react-router-dom";
import { Button as ShadButton } from "@/components/ui/button";

// Define types for the Button props
interface ButtonProps {
  label: string; // Button label should be a string
  onClick?: () => void; // onClick is an optional function that returns nothing
  to?: string; // 'to' is an optional string, used for navigation
  iconElement?: React.ReactNode; // Accepts full JSX element so if you need to style the React icon you can do it outside in the parent component
}

export default function Button({
  label,
  onClick,
  to,
  iconElement,
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to); // If 'to' is provided, navigate to that path.
    } else if (onClick) {
      onClick(); // If custom onClick handler is provided, use that.
    }
  };

  return (
    <ShadButton onClick={handleClick}>
      {iconElement && <>{iconElement}</>}
      {label && <span>{label}</span>}
    </ShadButton>
  );
}
