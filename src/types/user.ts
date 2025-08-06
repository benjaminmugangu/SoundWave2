import type { ReactNode } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  collection: string[];
  isAdmin?: boolean;
}

export interface UserContextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  btnLoading: boolean;
  loginUser: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  addToCollection: (id: string) => void;
  logoutUser: () => Promise<void>;
}

export interface UserProviderProps {
  children: ReactNode;
}
