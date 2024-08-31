import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api_client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyHome = () => {
  const {
    data: hotels,
    error,
    isLoading,
  } = useQuery("fetchQuery", () => apiClient.fetchHotels());

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold animate-pulse">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-lg text-red-500 animate-shake">
        Error fetching hotels: {error.message}
      </p>
    );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-8 p-8 bg-gray-100">
      <header className="text-center mb-12">
        <motion.h1
          className="text-6xl font-extrabold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Discover Your Perfect Stay
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          Explore top-rated hotels and discover amazing destinations for your
          next vacation.
        </motion.p>
        <Link
          to="/search"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore Now
        </Link>
      </header>

      <section>
        <motion.h2
          className="text-4xl font-bold text-gray-800 text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Latest Destinations
        </motion.h2>
        <motion.p
          className="text-center text-lg text-gray-600 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          Check out the latest additions to our collection and find your next
          adventure.
        </motion.p>
        <div className="grid gap-8">
          <motion.div
            className="grid md:grid-cols-2 grid-cols-1 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {topRowHotels.map((hotel) => (
              <LatestDestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 grid-cols-1 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {bottomRowHotels.map((hotel) => (
              <LatestDestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MyHome;
