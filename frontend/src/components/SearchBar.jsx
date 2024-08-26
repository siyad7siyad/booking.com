import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adultCount, setAdultCount] = useState(search.adultCount);
  const [childCount, setChildCount] = useState(search.childCount);

  const handleSubmit = (event) => {
    event.preventDefault();
    search.saveSearchValue(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-md flex items-center gap-4 transition-all duration-300 transform -translate-y-6"
    >
      <div className="flex flex-row items-center bg-white p-2 rounded-lg shadow-sm flex-1">
        <MdTravelExplore size={25} className="mr-3 text-blue-600" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none text-gray-700 font-semibold placeholder-gray-400"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-4 py-2 gap-4 rounded-lg shadow-sm">
        <label className="flex items-center text-gray-700 font-semibold">
          Adults:
          <input
            className="w-full p-2 ml-2 focus:outline-none border-b-2 border-blue-400 transition-colors duration-300"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(event.target.value)}
          />
        </label>
        <label className="flex items-center text-gray-700 font-semibold">
          Children:
          <input
            className="w-full p-2 ml-2 focus:outline-none border-b-2 border-blue-400 transition-colors duration-300"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(event.target.value)}
          />
        </label>
      </div>

      <div className="relative">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full bg-white p-3 rounded-lg shadow-sm focus:outline-none text-gray-700 font-semibold"
          wrapperClassName="w-full"
        />
      </div>
      <div className="relative">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full bg-white p-3 rounded-lg shadow-sm focus:outline-none text-gray-700 font-semibold"
          wrapperClassName="w-full"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition-colors duration-300"
        >
          Search
        </button>
        <button
          type="reset"
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-bold text-lg hover:bg-red-500 transition-colors duration-300"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
