import React from "react";
import { useNavigate } from "react-router-dom";

interface DisqueCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const DisqueCard: React.FC<DisqueCardProps> = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/disque/${id}`)}
      className="bg-background-light p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-background hover:shadow-2xl hover:scale-105 group"
    >
      <img src={image} className="w-full h-40 object-cover rounded-lg mb-4" alt={name} />
      <p className="text-primary font-bold text-lg truncate group-hover:text-accent">{name}</p>
      <p className="text-secondary text-sm truncate">{desc}</p>
    </div>
  );
};

export default DisqueCard;