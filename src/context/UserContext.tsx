import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import type {
  User,
  UserProviderProps,
} from "../types/user.ts";

const server = "https://user-service-soundwave.onrender.com";

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

import { UserContext } from "./UserContextDefinition.ts";

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function registerUser(
    name: string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    setBtnLoading(true);
    try {
      const { data }: { data: { user: User; token: string; message: string } } = await axios.post(`${server}/api/v1/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occured");
      } else {
        toast.error("An unexpected error occurred");
      }
      setBtnLoading(false);
    }
  }

  async function loginUser(
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    setBtnLoading(true);
    try {
      const { data }: { data: { user: User; token: string; message: string } } = await axios.post(`${server}/api/v1/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occured");
      } else {
        toast.error("An unexpected error occurred");
      }
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data }: { data: { user: User } } = await axios.get(`${server}/api/v1/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function logoutUser() {
    localStorage.clear();
    setUser(null);
    setIsAuth(false);

    toast.success("User Logged Out");
  }

  async function addToCollection(id: string) {
    try {
      const { data }: { data: { message: string } } = await axios.post(
        `${server}/api/v1/song/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An Error Occured");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuth,
        btnLoading,
        loginUser,
        registerUser,
        logoutUser,
        addToCollection,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};
