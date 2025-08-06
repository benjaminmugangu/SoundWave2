import React from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useUserData } from "../hooks/useUserData.tsx";
import { useSongData } from "../hooks/useSongData.tsx";

interface SongCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const SongCard: React.FC<SongCardProps> = ({ image, name, desc, id }) => {
  const { addToCollection, isAuth } = useUserData();
  const { setSelectedSong, setIsPlaying } = useSongData();

  const saveToCollectionHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuth) {
      addToCollection(id);
    }
  };

  const playSongHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSong(id);
    setIsPlaying(true);
  };

  return (
    <div
      className="bg-background-light p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-background hover:shadow-2xl hover:scale-105 group relative"
      onClick={playSongHandler}
    >
      <img
        src={image ? image : "/download.jpeg"}
        className="w-full h-40 object-cover rounded-lg mb-4"
        alt={name}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="bg-accent text-primary p-3 rounded-full shadow-md hover:bg-blue-700 transition-colors"
          onClick={playSongHandler}
        >
          <FaPlay size={20} />
        </button>
        {isAuth && (
          <button
            className="bg-accent text-primary p-3 rounded-full shadow-md hover:bg-blue-700 transition-colors"
            onClick={saveToCollectionHandler}
          >
            <FaBookmark size={20} />
          </button>
        )}
      </div>
      <div>
        <p className="text-primary font-bold text-lg truncate group-hover:text-accent">{name}</p>
        <p className="text-secondary text-sm truncate">{desc}</p>
      </div>
    </div>
  );
};

export default SongCard;