import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

const ManageHotelForm = ({ onSave, isLoading, hotel }) => {
  const formMethods = useForm();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson) => {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formData.append("type", formDataJson.type);

    if (Array.isArray(formDataJson.facilities)) {
      formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[]`, facility); // Change to facilities[]
      });
    }

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    if (formDataJson.imageFiles && formDataJson.imageFiles.length > 0) {
      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile);
      });
    }

    onSave(formData);
  });

  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-10">
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
          <ImagesSection />
          <span className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className={`relative bg-blue-600 text-white p-3 font-bold rounded-lg shadow-lg hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed text-xl tracking-wide ease-in-out duration-300 ${
                isLoading ? "cursor-wait" : "cursor-pointer"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm16-2a8 8 0 00-8-8v2a6 6 0 016 6h2zm-8 8a8 8 0 008-8h-2a6 6 0 01-6 6v2zm-8-8a8 8 0 008 8v-2a6 6 0 01-6-6H4z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 rounded-lg"></span>
            </button>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};

export default ManageHotelForm;
