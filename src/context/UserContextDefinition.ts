import { createContext } from "react";
import type { UserContextType } from "../types/user.ts";

export const UserContext = createContext<UserContextType | undefined>(undefined);
