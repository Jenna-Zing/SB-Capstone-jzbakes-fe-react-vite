import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// a hook that lets components consume (read*) the data from the context
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default useUser;
