import { useNavigate } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { useUserData } from "../hooks/useUserData.tsx";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { BiLibrary } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-primary hidden lg:flex font-poppins">
      <div className="bg-background-light rounded-lg p-4 flex flex-col gap-y-6">
        <div
          className="flex items-center gap-4 cursor-pointer hover:text-white transition-colors duration-200"
          onClick={() => navigate("/")}
        >
          <IoHomeOutline size={28} />
          <p className="font-bold text-md">Accueil</p>
        </div>
        <div className="flex items-center gap-4 cursor-pointer hover:text-white transition-colors duration-200">
          <IoSearchOutline size={28} />
          <p className="font-bold text-md">Rechercher</p>
        </div>
      </div>

      <div className="bg-background-light flex-grow rounded-lg p-2">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer hover:text-white transition-colors duration-200">
            <BiLibrary size={28} />
            <p className="font-bold text-md">Votre Bibliothèque</p>
          </div>
          <div className="flex items-center gap-3 text-secondary">
            <FaArrowRight className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <FaPlus className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
        <div onClick={() => navigate("/collection")}>
          <CollectionCard />
        </div>

        <div className="p-4 mt-4 bg-background rounded-lg flex flex-col items-start gap-2">
          <h1 className="font-bold">Trouvons des podcasts à suivre</h1>
          <p className="font-light text-sm">Nous vous tiendrons au courant des nouveaux épisodes.</p>
          <button className="px-4 py-2 bg-accent text-primary text-sm rounded-full mt-2 hover:bg-blue-700 transition-colors">
            Parcourir les podcasts
          </button>
        </div>

        {user && user.role === "admin" && (
          <button
            className="w-full px-4 py-2 bg-accent text-primary text-sm rounded-full mt-4 hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/admin/dashboard")}
          >
            Espace de gestion
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;