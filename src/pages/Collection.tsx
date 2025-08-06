import { useEffect, useState } from "react";
import Layout from "../components/Layout.tsx";
import { useSongData } from "../hooks/useSongData.tsx";
import type { Song } from "../types/song.ts";
import { useUserData } from "../hooks/useUserData.tsx";
import { FaBookmark, FaPlay } from "react-icons/fa";
import Loading from "../components/Loading.tsx";

const Collection = () => {
  const { songs, setIsPlaying, setSelectedSong, loading } = useSongData();

    const { user, addToCollection } = useUserData();

  const [myCollection, setMyCollection] = useState<Song[]>([]);

  useEffect(() => {
        if (songs && user?.collection) {
            const filteredSongs = songs.filter((song: Song) =>
                user.collection.includes(song.id.toString())
      );
      setMyCollection(filteredSongs);
    }
  }, [songs, user]);
  return (
    <div>
      <Layout>
        {myCollection && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                  <img src={"/download.jpeg"} className="w-48 rounded" alt="" />

                  <div className="flex flex-col">
                    <p>Collection</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                      {user?.name} Collection
                    </h2>
                    <h4>Your Favourate songs</h4>
                    <p className="mt-1">
                      <img
                        src="/logo.png"
                        className="inline-block w-6"
                        alt=""
                      />
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                  <p>
                    <b className="mr-4">#</b>
                  </p>
                  <p className="hidden sm:block">Description</p>
                  <p className="text-center">Actions</p>
                </div>

                <hr />
                {myCollection &&
                  myCollection.map((song, index) => {
                    return (
                      <div
                        className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                        key={index}
                      >
                        <p className="text-white">
                          <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                          <img
                            src={
                              song.thumbnail ? song.thumbnail : "/download.jpeg"
                            }
                            className="inline w-10 mr-5"
                            alt=""
                          />{" "}
                          {song.title}
                        </p>
                        <p className="text-[15px] hidden sm:block">
                          {song.description.slice(0, 30)}...
                        </p>
                        <p className="flex justify-center items-center gap-5">
                          <button
                            className="text-[15px] text-center"
                                                        onClick={() => addToCollection(song.id)}
                          >
                            <FaBookmark />
                          </button>

                          <button
                            className="text-[15px] text-center"
                            onClick={() => {
                              setSelectedSong(song.id);
                              setIsPlaying(true);
                            }}
                          >
                            <FaPlay />
                          </button>
                        </p>
                      </div>
                    );
                  })}
              </>
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default Collection;