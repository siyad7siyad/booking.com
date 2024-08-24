import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api_client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-500 text-xl">No Hotels found</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-800">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md hover:from-blue-400 hover:to-indigo-400 transition-transform transform hover:scale-105"
        >
          + Add Hotel
        </Link>
      </div>
      <div className="space-y-8">
        {" "}
        {/* Changed to vertical stacking with space between */}
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-700">{hotel.name}</h2>
            <p className="text-gray-600 mt-2">{hotel.description}</p>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
              {" "}
              {/* Adjusted grid for smaller screens */}
              <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
                <BsMap className="text-blue-500 mr-2" />
                <span className="text-gray-700">
                  {hotel.city}, {hotel.country}
                </span>
              </div>
              <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
                <BsBuilding className="text-green-500 mr-2" />
                <span className="text-gray-700">{hotel.type}</span>
              </div>
              <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
                <BiMoney className="text-yellow-500 mr-2" />
                <span className="text-gray-700">
                  ${hotel.pricePerNight} per night
                </span>
              </div>
              <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
                <BiHotel className="text-purple-500 mr-2" />
                <span className="text-gray-700">
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>
              <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
                <BiStar className="text-red-500 mr-2" />
                <span className="text-gray-700">
                  {hotel.starRating} Star Rating
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Link
                className="flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md hover:from-green-300 hover:to-teal-400 transition-transform transform hover:scale-105"
                to={`/edit-hotel/${hotel._id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
