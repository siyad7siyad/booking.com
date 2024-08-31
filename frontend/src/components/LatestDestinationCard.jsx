import React from "react";
import { Link } from "react-router-dom";

const LatestDestinationCard = ({ hotel }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <Link to={`/detail/${hotel._id}`} className="block h-full">
        <div className="h-60 overflow-hidden">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center transition-opacity duration-300 hover:opacity-80"
            alt={hotel.name}
          />
        </div>
        <div className="absolute bottom-0 p-4 bg-black bg-opacity-60 w-full rounded-b-lg text-center">
          <span className="text-white text-xl font-semibold tracking-tight">
            {hotel.name}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default LatestDestinationCard;
