import React from "react";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 md:p-12 lg:p-16 shadow-lg rounded-lg max-w-4xl w-full mx-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Add Hotel</h1>

        <div className="space-y-6">
          <label className="block text-gray-700 text-sm font-medium">
            Name
            <input
              type="text"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none transition-transform transform hover:scale-105 bg-gray-50"
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block text-gray-700 text-sm font-medium">
              City
              <input
                type="text"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none transition-transform transform hover:scale-105 bg-gray-50"
                {...register("city", { required: "This field is required" })}
              />
              {errors.city && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </span>
              )}
            </label>

            <label className="block text-gray-700 text-sm font-medium">
              Country
              <input
                type="text"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none transition-transform transform hover:scale-105 bg-gray-50"
                {...register("country", { required: "This field is required" })}
              />
              {errors.country && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </span>
              )}
            </label>
          </div>

          <label className="block text-gray-700 text-sm font-medium">
            Description
            <textarea
              rows={6}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none transition-transform transform hover:scale-105 bg-gray-50"
              {...register("description", { required: "This field is required" })}
            />
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </label>

          <div className="flex flex-col md:flex-row gap-6">
            <label className="block text-gray-700 text-sm font-medium w-full md:w-1/2">
              Price Per Night
              <input
                type="number"
                min={1}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none transition-transform transform hover:scale-105 bg-gray-50"
                {...register("pricePerNight", {
                  required: "This field is required",
                })}
              />
              {errors.pricePerNight && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.pricePerNight.message}
                </span>
              )}
            </label>

            <label className="block text-gray-700 text-sm font-medium w-full md:w-1/2">
              Star Rating
              <select
                {...register("starRating", {
                  required: "This field is required",
                })}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none transition-transform transform hover:scale-105 bg-gray-50"
              >
                <option value="" className="text-sm font-bold">
                  Select a Rating
                </option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {errors.starRating && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.starRating.message}
                </span>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
