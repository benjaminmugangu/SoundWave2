import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useSongData } from "../hooks/useSongData.tsx";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useUserData } from "../hooks/useUserData.tsx";
import type { Song } from "../types/song.ts";

const Disque = () => {
  const {
    fetchDisqueSongs,
    disqueSongs,
    disqueData,
    setIsPlaying,
    setSelectedSong,
    loading,
  } = useSongData();

    const { isAuth, addToCollection } = useUserData();

  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      fetchDisqueSongs(params.id);
    }
    }, [params.id, fetchDisqueSongs]);
  return (
    <div>
      <Layout>
                {disqueData && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                                    {disqueData.thumbnail && (
                    <img
                                            src={disqueData.thumbnail}
                      className="w-48 rounded"
                      alt=""
                    />
                  )}

                  <div className="flex flex-col">
                                        <p>Disque</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                                                                  {disqueData.title} Disque
                    </h2>
                                        <h4>{disqueData.description}</h4>
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
                                {disqueSongs &&
                  disqueSongs.map((song: Song, index: number) => {
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
                          {isAuth && (
                            <button
                              className="text-[15px] text-center"
                              onClick={() => addToCollection(song.id)}
                            >
                              <FaBookmark />
                            </button>
                          )}
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

export default Disque;
