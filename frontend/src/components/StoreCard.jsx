import React from "react";
import { Link } from "react-router-dom";

const StoreCard = ({ store }) => {
  return (
    <Link to={`/store/${store._id}`} className="block">
      <div className="bg-white rounded shadow p-4 flex items-center gap-4 hover:shadow-lg transition">
        <img
          src={store.logoUrl || "https://via.placeholder.com/72"}
          alt={store.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{store.name}</h3>
          <p className="text-sm text-gray-600">{store.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
