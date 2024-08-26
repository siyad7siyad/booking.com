import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api_client";
import SearchResultsCard from "../components/SearchResultsCard";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const {
    data: hotelData,
    isLoading,
    isError,
  } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams),
    {
      // Handle errors and loading states
      onError: (error) => console.error(error),
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading hotels</div>;

  return (
    <div className="grid grid-cols-5 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* Todo filters */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels Found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {hotelData?.data.map((hotel, index) => (
            <SearchResultsCard key={index} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
