import { createContext } from "react";
import { type UserContext as UserContextType } from "../types/types";

// initial context state
const initialState: UserContextType = {
  user: null,
  setUser: () => {},
};

// 2. Create the context with a default value of null - it creates a place to store and share data globally
export const UserContext = createContext<UserContextType | null>(initialState);
