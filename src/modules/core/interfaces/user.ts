import { IPlanData } from "./plans";

export interface userProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  name: string;
  lastName: string;
  birthDay: string;
  docType: string;
  docNumber: string;
  phoneNumber: string;
  plan: IPlanData | null;
}
