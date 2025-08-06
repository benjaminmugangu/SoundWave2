import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData.tsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loginUser, btnLoading } = useUserData();

    async function submitHandler(e: FormEvent) {
    e.preventDefault();

    loginUser(email, password, navigate);
  }

  return (
    <div className="h-screen bg-background flex justify-center items-center font-poppins">
      <div className="bg-background-light p-10 rounded-lg shadow-lg w-full max-w-sm font-poppins">
        <h2 className="text-2xl font-bold text-primary text-center mb-6">
          Login To SoundWave
        </h2>
        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
              Email or username
            </label>
            <input
              type="email"
              placeholder="Email or username"
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-md bg-background border border-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={btnLoading}
            className="w-full p-3 mt-4 rounded-md bg-accent text-primary font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-secondary mt-4 text-center">
            Don't have an account?{" "}
            <span
              className="text-accent cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;