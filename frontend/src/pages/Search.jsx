import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api_client";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilityFilter from "../components/HotelFacilityFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotelTypes, setSelectedTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [sortOption, setSortOption] = useState("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const {
    data: hotelData,
    isLoading,
    isError,
  } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams),
    {
      onError: (error) => console.error(error),
    }
  );

  // Debugging: Log the API response
  console.log(hotelData);

  const handleStarsChange = (event) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleTypeChange = (event) => {
    const hotelType = event.target.value;
    setSelectedTypes((prevType) =>
      event.target.checked
        ? [...prevType, hotelType]
        : prevType.filter((type) => type !== hotelType)
    );
  };

  const handleFacilityChange = (event) => {
    const facility = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading hotels</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 bg-white shadow-md overflow-hidden">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleTypeChange}
          />
          <HotelFacilityFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <span className="text-xl font-bold">
            {hotelData?.pagination?.total !== undefined
              ? `${hotelData.pagination.total} Hotels Found`
              : "No hotels found"}
            {search.destination ? ` in ${search.destination}` : ""}
          </span>

          <div className="flex justify-end">
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort By:</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (Low To High)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (High To Low)
              </option>
            </select>
          </div>

          {hotelData?.data?.map((hotel, index) => (
            <SearchResultsCard key={index} hotel={hotel} />
          ))}
          <div>
            <Pagination
              page={hotelData?.pagination?.page || 1}
              pages={hotelData?.pagination?.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
