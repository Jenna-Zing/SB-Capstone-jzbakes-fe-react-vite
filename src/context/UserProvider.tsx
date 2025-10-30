import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { type UserContextType } from "./UserContext";
import { restoreUserSession } from "@/api/auth";

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
    isLoggedIn: false, // default to false (not logged in)
  });

  const isUserComplete = (user: UserContextType): boolean => {
    // checks that all fields in the UserContextType (except isLoggedIn) are valid (not null, not undefined, not empty string)

    // Exclude 'isLoggedIn' from the check
    return Object.entries(user)
      .filter(([key]) => key !== "isLoggedIn") // Exclude the isLoggedIn key
      .every(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      );
  };

  // // fetch user info on first load (from httpOnly cookie if it exists)
  // useEffect(() => {
  //   const restore = async () => {
  //     try {
  //       const restoredUser = await restoreUserSession();
  //       if (restoredUser) {
  //         setUser({ ...restoredUser, isLoggedIn: true }); // update user state with the restored user data
  //         console.log("User session restored!", restoredUser);
  //       } else {
  //         console.log("No user session found"); // stay in default mode (default are null values, as seen above)
  //         setUser({ ...user, isLoggedIn: false });
  //       }
  //     } catch (error) {
  //       console.error("Unexpected error - unable to restore session", error); // logs error, but state remains unchanged (null values)
  //       setUser({ ...user, isLoggedIn: false });
  //     }
  //   };

  //   restore();
  // }, []);

  // fetch user info FROM LOCAL STORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: UserContextType = JSON.parse(storedUser);
      setUser({
        ...parsedUser,
        isLoggedIn: isUserComplete(parsedUser), // dynamically set isLoggedIn based on whether user info is complete
      });
      console.log("User loaded from local storage:", parsedUser);
    }
  }, []);

  // 2. Assign the real setUser inside the value object
  const userValue = {
    ...user, // includes username, firstName, etc. AND the old dummy setUser
    isLoggedIn: isUserComplete(user), // dynamically set isLoggedIn based on whether user info is complete
  };

  // 3. Return the context provider with the user value and render any children props inside
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
