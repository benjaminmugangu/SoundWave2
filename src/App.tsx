import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useUserData } from "./hooks/useUserData.tsx";
import Loading from "./components/Loading";
import Register from "./pages/Register";
import Disque from "./pages/Disque";
import Collection from "./pages/Collection";
import Admin from "./pages/Admin";

const App = () => {
  const { isAuth, loading } = useUserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
                        <Route path="/disque/:id" element={<Disque />} />
                        <Route
              path="/collection"
              element={isAuth ? <Collection /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <Admin /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;