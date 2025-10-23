import React from "react";

const StoreCard = ({ store }) => (
  <div className="bg-white p-4 shadow rounded">
    {store.imageUrl && <img src={store.imageUrl} className="h-32 w-full object-cover rounded mb-2" />}
    <h2 className="font-bold text-lg">{store.name}</h2>
    <p className="text-gray-600">{store.location}</p>
    <a href={`/store/${store._id}`} className="text-blue-500 hover:underline mt-2 inline-block">Visit Store</a>
  </div>
);

export default StoreCard;
