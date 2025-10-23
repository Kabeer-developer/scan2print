import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStore } from "../redux/slices/storeSlice";

const RegisterStore = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    if (image) formData.append("image", image);
    dispatch(createStore(formData));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register Your Store</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Store Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full rounded"/>
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full rounded"/>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterStore;
