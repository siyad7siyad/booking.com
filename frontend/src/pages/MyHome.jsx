import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api_client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import { Link } from "react-router-dom";

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
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4 animate-fade-in">
          Discover Your Perfect Stay
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore top-rated hotels and discover amazing destinations for your
          next vacation.
        </p>
        <Link
          to="/search"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore Now
        </Link>
      </header>

      <section>
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 animate-fade-in">
          Latest Destinations
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          Check out the latest additions to our collection and find your next
          adventure.
        </p>
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            {topRowHotels.map((hotel) => (
              <LatestDestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {bottomRowHotels.map((hotel) => (
              <LatestDestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyHome;
