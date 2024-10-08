import React, { useState } from "react";
import { AiFillStar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const SearchResultsCard = ({ hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? hotel.imageUrls.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500); // Duration matches the CSS transition
  };

  const handleNextImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === hotel.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 500); // Duration matches the CSS transition
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-gray-300 rounded-lg p-8 gap-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <div
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${hotel.imageUrls[currentImageIndex]})` }}
        >
          <img
            src={
              hotel.imageUrls[currentImageIndex] ||
              "/path/to/fallback/image.jpg"
            }
            alt="Hotel"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          onClick={handlePrevImage}
        >
          <AiOutlineLeft size={20} />
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          onClick={handleNextImage}
        >
          <AiOutlineRight size={20} />
        </button>
      </div>
      <div className="grid grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="text-yellow-400 text-lg" />
              ))}
            </span>
            <span className="ml-2 text-sm font-medium text-gray-600">
              {hotel.type}
            </span>
          </div>
        </div>

        <Link
          to={`/detail/${hotel._id}`}
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out"
        >
          {hotel.name}
        </Link>

        <div className="text-gray-600 line-clamp-4">{hotel.description}</div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap mt-4">
          <div className="flex gap-2 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-gray-300 px-3 py-1 rounded-full font-semibold text-xs text-gray-700 whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-sm font-medium text-gray-500">{`+ ${
                hotel.facilities.length - 3
              } more`}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-lg font-bold text-gray-800">
            ${hotel.pricePerNight} per Night
          </span>
          <Link
            to={`/detail/${hotel._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
