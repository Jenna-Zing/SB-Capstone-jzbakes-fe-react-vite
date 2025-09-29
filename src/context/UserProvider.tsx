import { useState } from "react";
import { UserContext } from "./UserContext";
import { type UserContextType } from "./UserContext";

interface Props {
  children: React.ReactNode; // special prop in React that represents whatever you wrap inside this component
}

// a component that provides the data to the rest of the app - wraps around your app and holds the *real user state*
export const UserProvider = ({ children }: Props) => {
  // 1. Initialize the user state
  const [user, setUser] = useState<UserContextType>({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    accessToken: null,
    setUser: () => {}, // not manually defined by default, but is defined by useState
    isLoggedIn: false, // default to false (not logged in)
  });

  // 2. Assign the real setUser inside the value object
  const userValue = {
    ...user, // includes username, firstName, etc. AND the old dummy setUser
    setUser, // this overwrites the old dummy setUser with the real setUser function from useState,
    isLoggedIn: !!user.username && !!user.accessToken, // update isLoggedIn based on presence of `username` and `accessToken`
  };

  // 3. Return the context provider with the user value and render any children props inside
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
