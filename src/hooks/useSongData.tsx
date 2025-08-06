import { useContext } from "react";
import { SongContext } from "../context/SongContextDefinition.ts";
import type { SongContextType } from "../types/song.ts";

export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error("useSongData must be used within a SongProvider");
  }
  return context;
};
