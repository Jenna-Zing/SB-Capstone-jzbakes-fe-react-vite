import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { type User } from "../../types/types";

interface Props {
  children: React.ReactNode; // special prop in React that represents whatever you wrap inside this component
}

// a component that provides the data to the rest of the app - wraps around your app and holds the *real user state*
export const UserProvider = ({ children }: Props) => {
  // 1. Initialize the user state
  const [user, setUser] = useState<User | null>({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
  });

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  // 3. Return the context provider with the user value and render any children props inside
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
