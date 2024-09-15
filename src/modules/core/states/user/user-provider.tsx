import { useState } from "react";
import UserContext from "./user-context";
import { IUser, userProviderProps } from "../../interfaces/user";

export const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const setUserData = (user: IUser | null) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
