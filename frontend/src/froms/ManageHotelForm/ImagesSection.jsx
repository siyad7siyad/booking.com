import React from "react";
import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const existingImageUrls = watch("imageUrls");
  const handleDelete = (event, imageUrl) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Images</h2>
      <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
        {existingImageUrls && (
          <div className="grid grid-cols-1 gap-4">
            {existingImageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Hotel image ${index}`}
                  className="min-h-full object-cover rounded-md"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full py-3 px-4 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ease-in-out"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-600 text-sm font-semibold mt-3">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
