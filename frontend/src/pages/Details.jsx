import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api_client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../froms/GuestForm/GuestInfoForm";
import { motion } from "framer-motion"; // For animations

const Details = () => {
  const { hotelId } = useParams();

  const {
    data: hotel,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["fetchHotelById", hotelId],
    () => apiClient.fetchHotelById(hotelId),
    {
      enabled: !!hotelId,
    }
  );

  if (isLoading) {
    return (
      <div className="text-center text-2xl font-semibold text-gray-500 animate-pulse">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-600 text-lg">Error: {error.message}</div>;
  }

  if (!hotel) {
    return (
      <div className="text-gray-700 text-lg">No hotel details available</div>
    );
  }

  return (
    <div className="space-y-10 p-6 lg:p-12 bg-gray-50">
      {/* Hotel Name and Rating */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1 text-yellow-400">
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <AiFillStar key={index} size={24} />
            ))}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {hotel.name}
          </h1>
        </div>
      </motion.div>

      {/* Hotel Images */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {hotel.imageUrls.map((image, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg h-[300px]"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image}
              alt={hotel.name}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Hotel Facilities */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {hotel.facilities.map((facility, index) => (
          <div
            key={index}
            className="border border-slate-300 rounded-sm p-3 text-center text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            {facility}
          </div>
        ))}
      </motion.div>

      {/* Hotel Description and Booking Form */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="whitespace-pre-line text-gray-800 leading-relaxed">
          {hotel.description}
        </div>
        <div className="h-fit bg-white shadow-lg rounded-lg p-6">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Details;
