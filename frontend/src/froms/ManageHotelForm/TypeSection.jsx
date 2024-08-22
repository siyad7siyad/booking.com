import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/Hotel_Options_Config";
import React from "react";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const typeWatch = watch("type");

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-700 mb-4">
        Select Type
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 
            ${
              typeWatch === type
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            } 
            text-lg font-medium rounded-full px-6 py-3 flex items-center justify-center`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="block text-red-600 text-sm font-semibold mt-2">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
