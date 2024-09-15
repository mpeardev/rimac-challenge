import { createContext } from "react";
import { IUser } from "../../interfaces/user";

interface UserContextProps {
  user: IUser | null;
  setUserData: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUserData: () => {},
});

export default UserContext;
