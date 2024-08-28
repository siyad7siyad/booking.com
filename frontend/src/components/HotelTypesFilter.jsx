import React from "react";
import { hotelTypes } from "../config/Hotel_Options_Config";

const HotelTypesFilter = ({ selectedHotelTypes, onChange }) => {
  // Group hotelTypes into chunks of 3
  const groupedHotelTypes = [];
  for (let i = 0; i < hotelTypes.length; i += 3) {
    groupedHotelTypes.push(hotelTypes.slice(i, i + 3));
  }

  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">Hotel Type</h4>
      {groupedHotelTypes.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.map((hotelType, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer transition-transform transform hover:scale-105"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  value={hotelType}
                  checked={selectedHotelTypes.includes(hotelType)}
                  onChange={onChange}
                />
                <div
                  className={`flex items-center justify-center p-2 border rounded-lg text-xs font-medium ${
                    selectedHotelTypes.includes(hotelType)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-600 border-gray-300"
                  } transition-colors duration-300 ease-in-out shadow-sm hover:shadow-md`}
                >
                  <span>{hotelType}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
