import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../api_client";
import { useAppContext } from "../contexts/AppContext";

const BookingForm = ({ currentUser, paymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking confirmed!", type: "SUCCESS" }); // Toast message for booking confirmation
      },
      onError: (error) => {
        let errorMessage = "An error occurred. Please try again.";
        if (error.response?.data) {
          try {
            const errorData = JSON.parse(error.response.data);
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            console.error("Error parsing error response JSON:", parseError);
          }
        }
        showToast({ message: errorMessage, type: "ERROR" });
      },
    }
  );

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      adultCount: search?.adultCount || 1,
      childCount: search?.childCount || 0,
      checkIn: search?.checkIn?.toISOString() || "",
      checkOut: search?.checkOut?.toISOString() || "",
      hotelId: hotelId,
      totalCost: paymentIntent?.totalCost || 0,
      paymentIntentId: paymentIntent?.paymentIntentId || "",
    },
  });
  const onSubmit = async (formData) => {
    if (!stripe || !elements) {
      showToast({
        message: "Stripe has not loaded yet. Please try again.",
        type: "ERROR",
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      showToast({ message: "Please enter your card details.", type: "ERROR" });
      return;
    }

    // Minimum charge amount in cents (e.g., 100 cents = $1.00)
    const MINIMUM_AMOUNT_CENTS = 100; // Adjust based on the minimum amount for your currency

    if (paymentIntent.totalCost < MINIMUM_AMOUNT_CENTS) {
      showToast({
        message: `The minimum amount required is ${
          MINIMUM_AMOUNT_CENTS / 100
        }. Please increase your payment amount.`,
        type: "ERROR",
      });
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
            },
          },
        }
      );

      if (result.error) {
        showToast({ message: result.error.message, type: "ERROR" });
      } else if (result.paymentIntent?.status === "succeeded") {
        bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
      } else {
        showToast({
          message: "Payment failed. Please try again.",
          type: "ERROR",
        });
      }
    } catch (error) {
      console.error("Unexpected error during payment:", error);
      showToast({
        message: "An unexpected error occurred. Please try again.",
        type: "ERROR",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        className="grid grid-cols-1 gap-6 rounded-lg border border-gray-300 p-6 bg-white shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="text-2xl font-extrabold text-gray-800 mb-4">
          Confirm Your Details
        </span>
        <div className="grid grid-cols-2 gap-6">
          <label className="text-gray-700 text-sm font-semibold flex-1">
            First Name
            <input
              className="mt-2 border rounded-lg w-full py-2 px-4 text-gray-800 bg-gray-100 font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              type="text"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-semibold flex-1">
            Last Name
            <input
              className="mt-2 border rounded-lg w-full py-2 px-4 text-gray-800 bg-gray-100 font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              type="text"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-semibold flex-1">
            Email
            <input
              className="mt-2 border rounded-lg w-full py-2 px-4 text-gray-800 bg-gray-100 font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              type="text"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Price Summary</h2>
          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">
              Total Cost: ${(paymentIntent.totalCost / 100).toFixed(2)}
            </div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Payment Details</h3>
          <CardElement
            id="payment-element"
            className="border rounded-md p-2 text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
