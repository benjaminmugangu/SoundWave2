import { useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData.tsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, logoutUser } = useUserData();

  const logoutUserHandler = () => {
    logoutUser();
  };

  return (
    <div className="w-full flex flex-col font-poppins text-primary">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <IoIosArrowBack
            size={28}
            className="bg-background p-1 rounded-full cursor-pointer hover:bg-background-light transition-colors"
            onClick={() => navigate(-1)}
          />
          <IoIosArrowForward
            size={28}
            className="bg-background p-1 rounded-full cursor-pointer hover:bg-background-light transition-colors"
            onClick={() => navigate(1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="px-4 py-2 cursor-pointer bg-accent text-primary text-sm rounded-full hidden md:block hover:bg-blue-700 transition-colors">
            Découvrir le Premium
          </p>
          <p className="px-4 py-2 cursor-pointer bg-background-light text-primary text-sm rounded-full hidden md:block hover:bg-background transition-colors">
            Installer l'application
          </p>
          {isAuth ? (
            <p
              onClick={logoutUserHandler}
              className="px-4 py-2 cursor-pointer bg-accent text-primary text-sm rounded-full hover:bg-blue-700 transition-colors"
            >
              Se déconnecter
            </p>
          ) : (
            <p
              onClick={() => navigate("/login")}
              className="px-4 py-2 cursor-pointer bg-accent text-primary text-sm rounded-full hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="bg-accent text-primary px-4 py-2 rounded-full cursor-pointer text-sm hover:bg-blue-700 transition-colors">
          Tout
        </p>
        <p className="bg-background-light text-primary px-4 py-2 rounded-full cursor-pointer text-sm hidden md:block hover:bg-background transition-colors">
          Musique
        </p>
        <p className="bg-background-light text-primary px-4 py-2 rounded-full cursor-pointer text-sm hidden md:block hover:bg-background transition-colors">
          Podcasts
        </p>
        <p
          className="bg-background-light text-primary px-4 py-2 rounded-full cursor-pointer text-sm md:hidden hover:bg-background transition-colors"
          onClick={() => navigate("/collection")}
        >
          Collection
        </p>
      </div>
    </div>
  );
};

export default Navbar;