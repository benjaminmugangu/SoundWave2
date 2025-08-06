import { useContext } from "react";
import { UserContext } from "../context/UserContextDefinition.ts";
import type { UserContextType } from "../types/user.ts";

export const useUserData = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
