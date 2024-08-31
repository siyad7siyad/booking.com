import React from "react";

const PriceFilter = ({ selectedPrice, onChange }) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select 
        value={selectedPrice || ""}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
        className="rounded border border-slate-300 p-2"
      >
        <option value="">Select Max Price</option>
        {[1000, 2000, 3000, 4000, 5000,6000,7000,8000,9000,10000,20000 ].map((price, index) => (
          <option key={index} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
