import React from "react";
import { useFormContext } from "react-hook-form";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Guests</h2>
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block text-gray-800 text-lg font-medium mb-2">
            Adult Count
            <input
              type="number"
              min={1}
              className="border border-gray-300 rounded-lg w-full py-3 px-4 mt-1 text-gray-800 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105"
              {...register("adultCount", {
                required: "This field is required",
                min: { value: 1, message: "At least 1 adult is required" },
              })}
            />
            {errors.adultCount && (
              <span className="text-red-600 text-sm font-semibold mt-1">
                {errors.adultCount.message}
              </span>
            )}
          </label>
        </div>
        <div className="flex-1">
          <label className="block text-gray-800 text-lg font-medium mb-2">
            Child Count
            <input
              type="number"
              min={0}
              className="border border-gray-300 rounded-lg w-full py-3 px-4 mt-1 text-gray-800 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105"
              {...register("childCount", {
                required: "This field is required",
                min: { value: 0, message: "Child count cannot be negative" },
              })}
            />
            {errors.childCount && (
              <span className="text-red-600 text-sm font-semibold mt-1">
                {errors.childCount.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default GuestSection;
