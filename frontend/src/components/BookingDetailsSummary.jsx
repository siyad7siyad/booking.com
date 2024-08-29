import React from "react";

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}) => {
  return (
    <div className="grid gap-6 rounded-lg border border-slate-300 p-6 bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
      <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide">
        Your Booking Details
      </h2>
      {hotel && (
        <div className="border-b pb-4">
          <span className="text-gray-600 text-sm">Location:</span>
          <div className="font-bold text-lg text-blue-600 mt-1">
            {`${hotel.name}, ${hotel.city}, ${hotel.country}`}
          </div>
        </div>
      )}
      <div className="flex justify-between text-gray-700">
        <div>
          <span className="text-sm">Check-in:</span>
          <div className="font-semibold text-md mt-1">
            {checkIn ? checkIn.toDateString() : "N/A"}
          </div>
        </div>
        <div>
          <span className="text-sm">Check-out:</span>
          <div className="font-semibold text-md mt-1">
            {checkOut ? checkOut.toDateString() : "N/A"}
          </div>
        </div>
      </div>
      <div className="border-t border-b py-4">
        <span className="text-gray-600 text-sm">Total Length of stay:</span>
        <div className="font-bold text-lg text-indigo-600 mt-1">
          {numberOfNights || 0} nights
        </div>
      </div>
      <div>
        <span className="text-gray-600 text-sm">Guests:</span>
        <div className="font-bold text-lg text-purple-600 mt-1">
          {adultCount || 0} adults & {childCount || 0} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
