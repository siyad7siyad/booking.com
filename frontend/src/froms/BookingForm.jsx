import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useForm } from "react-hook-form";

const BookingForm = ({ currentUser, paymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements()
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email:
        typeof currentUser.email === "string"
          ? currentUser.email
          : currentUser.email?.value,
    },
  });

  const onSubmit = async (formData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret,{
      payment_method:{
        card:elements.getElement(CardElement)
      }
    });
    if(result.paymentIntent?.status==="succeeded"){
      // book the room
      

    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form className="grid grid-cols-1 gap-6 rounded-lg border border-gray-300 p-6 bg-white shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105">
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

        <div className="spac-y-2">
          <h2 className="text-xl font-semibold">Your Price Summary</h2>
          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">
              Total Cost: ${paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>

        <div className="spac-y-2">
          <h3 className="text-xl font-semibold">Payment Details</h3>
          <CardElement
            id="payment-element"
            className="border rounded-md p-2 text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
