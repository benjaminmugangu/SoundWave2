import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import type {
  Disque,
  Song,
  SongProviderProps,
} from "../types/song.ts";

const server = "https://song-service-soundwave.onrender.com";

import { SongContext } from "./SongContextDefinition.ts";

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [disques, setDisques] = useState<Disque[]>([]);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Song[]>(`${server}/api/v1/song/all`);
      setSongs(data);
      if (data.length > 0) setSelectedSong(data[0].id.toString());
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [song, setSong] = useState<Song | null>(null);

  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) return;
    try {
      const { data } = await axios.get<Song>(
        `${server}/api/v1/song/${selectedSong}`
      );
      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }, [selectedSong]);

  const fetchDisques = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Disque[]>(`${server}/api/v1/album/all`);
      setDisques(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [index, setIndex] = useState<number>(0);

  const nextSong = useCallback(() => {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]?.id.toString());
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedSong(songs[index + 1]?.id.toString());
    }
  }, [index, songs]);

  const prevSong = useCallback(() => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelectedSong(songs[index - 1]?.id.toString());
    }
  }, [index, songs]);

  const [disqueSongs, setDisqueSongs] = useState<Song[]>([]);
  const [disqueData, setDisqueData] = useState<Disque | null>(null);

  const fetchDisqueSongs = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ songs: Song[]; album: Disque }>(`${server}/api/v1/album/${id}`);
      setDisqueData(data.album);
      setDisqueSongs(data.songs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

    useEffect(() => {
    fetchSongs();
    fetchDisques();
  }, [fetchSongs, fetchDisques]);
  return (
    <SongContext.Provider
      value={{
        songs,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        loading,
        disques,
        fetchSingleSong,
        song,
        nextSong,
        prevSong,
        fetchDisqueSongs,
        disqueData,
        disqueSongs,
        fetchSongs,
        fetchDisques,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
