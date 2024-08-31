import React from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import * as apiClient from "../api_client";

// Import custom fonts in your main CSS file or use a CDN link
// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Poppins:wght@400;600&display=swap');

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return (
      <span className="text-xl font-medium text-gray-500">
        No Bookings found
      </span>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">My Bookings</h1>
      {hotels.map((hotel) => (
        <motion.div
          key={hotel.id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-gray-300 rounded-lg p-6 lg:p-8 gap-6 lg:gap-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:w-full lg:h-[250px] rounded-lg overflow-hidden">
            <motion.img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="w-full h-full object-cover object-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold text-gray-900">{hotel.name}</div>
            <div className="text-sm font-medium text-gray-600">
              {hotel.city}, {hotel.country}
            </div>
            <div className="space-y-4">
              {hotel.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border-t border-gray-300 pt-4 text-gray-700"
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Dates:</span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Guests:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyBookings;
