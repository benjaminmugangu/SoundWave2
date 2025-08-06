import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData.tsx";
import { useSongData } from "../hooks/useSongData.tsx";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import type { Disque, Song } from "../types/song.ts";

const server = "http://13.235.70.183:7000";

// Custom type guard for Axios errors
interface AppAxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function isAxiosError(error: unknown): error is AppAxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  );
}

interface ApiResponse {
  message: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useUserData();

  const { songs, fetchSongs, disques, fetchDisques } = useSongData();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const addDisqueHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post<ApiResponse>(
        `${server}/api/v1/disque/new`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchDisques();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occured");
      } else {
        toast.error("An unexpected error occurred");
      }
      setBtnLoading(false);
    }
  };

  const addSongHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("disque", album);

    setBtnLoading(true);

    try {
      const { data } = await axios.post<ApiResponse>(
        `${server}/api/v1/song/new`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
      setAlbum("");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occured");
      } else {
        toast.error("An unexpected error occurred");
      }
      setBtnLoading(false);
    }
  };

  const addThumbnailHandler = async (id: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post<ApiResponse>(
        `${server}/api/v1/song/${id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setFile(null);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occured");
      } else {
        toast.error("An unexpected error occurred");
      }
      setBtnLoading(false);
    }
  };

  const deleteDisque = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this disque?")) {
      try {
        const { data } = await axios.delete<ApiResponse>(
          `${server}/api/v1/disque/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchDisques();
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || "An error occured");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }
  };

  const deleteSong = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        const { data } = await axios.delete<ApiResponse>(
          `${server}/api/v1/song/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchSongs();
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || "An error occured");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="p-8 font-poppins">
      <h1 className="text-3xl font-bold text-primary mb-8">Espace de gestion</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background-light p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Create Disque</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={addDisqueHandler}
          >
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              placeholder="Choose thumbnail"
              onChange={fileChangeHandler}
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              accept="image/*"
              required
            />
            <button
              className="w-full p-3 mt-4 rounded-md bg-accent text-primary font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Add Disque"}
            </button>
          </form>
        </div>

        <div className="bg-background-light p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Create Song</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={addSongHandler}
          >
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <select
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              required
            >
              <option value="">Choose Disque</option>
              {disques?.map((e: Disque, i: number) => {
                return (
                  <option value={e.id} key={i}>
                    {e.title}
                  </option>
                );
              })}
            </select>
            <input
              type="file"
              placeholder="Choose audio"
              onChange={fileChangeHandler}
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              accept="audio/*"
              required
            />
            <button
              className="w-full p-3 mt-4 rounded-md bg-accent text-primary font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Add Song"}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-background-light p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-primary mb-4">All Disques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {disques?.map((disque: Disque) => (
            <div key={disque.id} className="bg-background p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
              <img
                src={disque.thumbnail}
                alt={disque.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-primary">{disque.title}</h3>
              <button
                disabled={btnLoading}
                className="px-3 py-1 mt-2 bg-red-500 text-white rounded"
                onClick={() => deleteDisque(disque.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background-light p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-primary mb-4">All Songs</h2>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {songs?.map((e: Song, i: number) => {
            return (
              <div className="bg-background p-4 rounded-lg shadow-md" key={i}>
                {e.thumbnail ? (
                  <img src={e.thumbnail} className="mr-1 w-52 h-52" alt="" />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2 w-[250px]">
                    <input type="file" onChange={fileChangeHandler} />
                    <button
                      className="w-full p-3 mt-4 rounded-md bg-accent text-primary font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                      disabled={btnLoading}
                      onClick={() => addThumbnailHandler(e.id)}
                    >
                      {btnLoading ? "Please Wait..." : "Add Thumbnail"}
                    </button>
                  </div>
                )}

                <h4 className="text-lg font-bold text-primary">{e.title.slice(0, 30)}</h4>
                <h4 className="text-lg font-bold text-secondary">
                  {e.description.slice(0, 20)}..
                </h4>
                <button
                  disabled={btnLoading}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteSong(e.id)}
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;