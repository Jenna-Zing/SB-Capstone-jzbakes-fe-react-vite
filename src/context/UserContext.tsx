import { createContext } from "react";

// 1. Define the shape of the user data
export interface UserContextType {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  accessToken: string | null;
  setUser: (user: UserContextType) => void; // add a setter for updates
  isLoggedIn: boolean; // added this property to indicate login status
}

// initial context state
const initialState: UserContextType = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  accessToken: null,
  setUser: () => {}, // dummy function, will be replaced by real function in UserProvider
  isLoggedIn: false, // default to false (not logged in)
};

// 2. Create the context with a default value of null - it creates a place to store and share data globally
export const UserContext = createContext<UserContextType | null>(initialState);
