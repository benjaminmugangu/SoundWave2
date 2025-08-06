import React, { useEffect, useRef, useState } from "react";
import { useSongData } from "../hooks/useSongData.tsx";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    prevSong,
    nextSong,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (selectedSong) {
      fetchSingleSong();
    }
  }, [selectedSong, fetchSingleSong]);

  if (!song) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[10%] bg-background-light shadow-lg flex justify-between items-center text-primary px-4 z-50 font-poppins">
      <div className="flex items-center gap-4 w-1/4">
        <img
          src={song.thumbnail ? song.thumbnail : "/download.jpeg"}
          className="w-14 h-14 object-cover rounded-md"
          alt={song.title}
        />
        <div className="hidden md:block">
          <p className="font-bold truncate">{song.title}</p>
          <p className="text-secondary text-sm truncate">
            {song.description?.slice(0, 30)}...
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 w-1/2">
        {song.audio && <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} onEnded={nextSong} />}
        <div className="flex items-center gap-4">
          <GrChapterPrevious
            className="cursor-pointer text-secondary hover:text-primary transition-colors"
            size={20}
            onClick={prevSong}
          />
          <button
            className="bg-accent text-primary rounded-full p-3 shadow-md hover:bg-blue-700 transition-colors"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <GrChapterNext
            className="cursor-pointer text-secondary hover:text-primary transition-colors"
            size={20}
            onClick={nextSong}
          />
        </div>
        <div className="w-full flex items-center gap-2 text-xs text-secondary">
            <span>{formatTime(progress)}</span>
            <input
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={durationChange}
                className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-1/4 justify-end">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={volumeChange}
          className="w-24 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
        />
      </div>
    </div>
  );
};

export default Player;