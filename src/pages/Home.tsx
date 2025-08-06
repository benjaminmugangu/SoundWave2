import DisqueCard from "../components/DisqueCard";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import SongCard from "../components/SongCard";
import { useSongData } from "../hooks/useSongData.tsx";
import type { Disque, Song } from "../types/song.ts";

const Home = () => {
  const { disques, songs, loading } = useSongData();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Palmarès à la une</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {disques?.map((disque: Disque) => (
                <DisqueCard
                  key={disque.id}
                  name={disque.title}
                  image={disque.thumbnail}
                  desc={disque.description}
                  id={disque.id}
                />
              ))}
            </div>

            <h1 className="text-3xl font-bold text-primary mt-10 mb-6">Les plus gros succès du jour</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {songs?.map((song: Song) => (
                <SongCard
                  key={song.id}
                  name={song.title}
                  image={song.thumbnail}
                  desc={song.description}
                  id={song.id}
                />
              ))}
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Home;