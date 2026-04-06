import { createContext } from "react";

export type MeContextType = {
  roles: string[];
  isAdmin: boolean;
};

export const MeContext = createContext<MeContextType | null>(null);
