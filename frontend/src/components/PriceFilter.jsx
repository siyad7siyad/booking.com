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
        {[10000, 20000, 30000, 40000, 50000].map((price, index) => (
          <option key={index} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
