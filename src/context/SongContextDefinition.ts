import { createContext } from "react";
import type { SongContextType } from "../types/song.ts";

export const SongContext = createContext<SongContextType | undefined>(
  undefined
);
