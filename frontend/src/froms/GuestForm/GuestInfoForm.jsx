import React from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const GuestInfoForm = ({ hotelId, pricePerNight }) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data) => {
    search.saveSearchValue(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data) => {
    search.saveSearchValue(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
      <h3 className="text-2xl font-bold text-white mb-4">
        ${pricePerNight} / night
      </h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="w-full bg-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 font-semibold transition duration-300"
              wrapperClassName="w-full"
            />
          </div>
          <div>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="w-full bg-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 font-semibold transition duration-300"
              wrapperClassName="w-full"
            />
          </div>

          <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-semibold">Adults:</label>
              <input
                className="w-20 p-2 border-b-2 border-blue-400 focus:outline-none transition-colors duration-300 focus:border-blue-600 rounded-md"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-semibold">Children:</label>
              <input
                className="w-20 p-2 border-b-2 border-blue-400 focus:outline-none transition-colors duration-300 focus:border-blue-600 rounded-md"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>

          <button
            className={`w-full py-3 rounded-lg text-white font-bold text-lg transform transition-all duration-300 ${
              isLoggedIn
                ? "bg-blue-700 hover:bg-blue-600 hover:scale-105"
                : "bg-gray-700 hover:bg-gray-600 hover:scale-105"
            }`}
          >
            {isLoggedIn ? "Book Now" : "Sign in to Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
