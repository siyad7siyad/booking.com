import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api_client";
import ManageHotelForm from "../froms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Updated", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "ERROR hotel Saved", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} isLoading={isLoading} onSave={handleSave} />
  );
};

export default EditHotel;
