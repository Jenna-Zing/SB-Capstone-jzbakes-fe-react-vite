import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({
    username: "jenna",
    accessToken: "abc123",
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
