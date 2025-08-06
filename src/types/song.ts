import type { ReactNode } from "react";

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  disque: string;
}

export interface Disque {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface SongContextType {
  songs: Song[];
  song: Song | null;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  loading: boolean;
  selectedSong: string | null;
  setSelectedSong: (id: string) => void;
  disques: Disque[];
  fetchSingleSong: () => Promise<void>;
  nextSong: () => void;
  prevSong: () => void;
  disqueSongs: Song[];
  disqueData: Disque | null;
  fetchDisqueSongs: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchDisques: () => Promise<void>;
}

export interface SongProviderProps {
  children: ReactNode;
}
