import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRatingFilter = ({ selectedStars, onChange }) => {
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const starRating = index + 1;
      if (selectedStars.includes(rating.toString()) && starRating <= rating) {
        return <FaStar key={index} className="text-yellow-500" />;
      }
      return <FaRegStar key={index} className="text-gray-400" />;
    });
  };

  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">
        Property Rating
      </h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label
          key={star}
          className="flex items-center space-x-2 mb-2 cursor-pointer transition-transform transform hover:scale-105"
        >
          <input
            type="checkbox"
            className="hidden"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <div className="flex items-center">
            {renderStars(star)}
            <span
              className={`ml-2 ${
                selectedStars.includes(star)
                  ? "text-blue-500 font-bold"
                  : "text-gray-600"
              } transition-colors duration-300 ease-in-out`}
            >
              {star} {star > 1 ? "Stars" : "Star"}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
