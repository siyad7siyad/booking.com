import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/Hotel_Options_Config";

import React from "react";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Facilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex items-center space-x-3 text-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50 rounded-lg p-2 cursor-pointer"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              className="w-5 h-5 text-blue-600 bg-gray-200 border-gray-300 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-110"
            />
            <span className="text-lg font-medium">{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <div className="mt-4">
          <span className="text-red-600 text-sm font-semibold">
            {errors.facilities.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default FacilitiesSection;
