import { createContext } from "react";

interface UserContextType {
  username: string | null;
  accessToken: string | null;
}

export const UserContext = createContext<UserContextType | null>(null);
