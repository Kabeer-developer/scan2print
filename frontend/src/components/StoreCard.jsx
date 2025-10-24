import React from "react";
import { Link } from "react-router-dom";

const StoreCard = ({ store }) => (
  <Link
    to={`/store/${store._id}`}
    className="block border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white"
  >
    <img src={store.logoUrl} alt={store.name} className="h-24 w-24 object-cover rounded-full mx-auto" />
    <h2 className="text-center text-lg font-semibold mt-3">{store.name}</h2>
    <p className="text-center text-gray-600">{store.location}</p>
  </Link>
);

export default StoreCard;
