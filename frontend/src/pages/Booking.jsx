import { useQuery } from "react-query";
import * as apiClient from "../api_client";
import React, { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";
import BookingForm from "../froms/BookingForm";
import { motion } from "framer-motion";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => apiClient.createPaymentIntent(hotelId, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-5 p-6">
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        />
      </motion.div>

      {currentUser && paymentIntentData && (
        <motion.div
          className="bg-white p-4 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentData.clientSecret,
            }}
          >
            <BookingForm
              currentUser={currentUser}
              paymentIntent={paymentIntentData}
            />
          </Elements>
        </motion.div>
      )}
    </div>
  );
};

export default Booking;
