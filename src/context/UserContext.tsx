import { createContext } from "react";

// 1. Define the shape of the user data
export interface UserContextType {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  setUser: (user: UserContextType) => void; // add a setter for updates
  isLoggedIn: boolean; // indicates login status of a user (true if all user fields are non-null and non-empty)
}

// initial context state
const initialState: UserContextType = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  setUser: () => {}, // dummy function, will be replaced by real function in UserProvider
  isLoggedIn: false, // default to false (not logged in)
};

// 2. Create the context with a default value of null - it creates a place to store and share data globally
export const UserContext = createContext<UserContextType | null>(initialState);
