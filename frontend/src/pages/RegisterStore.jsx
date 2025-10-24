import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerStore } from "../redux/slices/storeSlice";
import { useNavigate } from "react-router-dom";

const RegisterStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, store } = useSelector((state) => state.storeAuth);

  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setForm((p) => ({ ...p, logo: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("location", form.location);
    fd.append("email", form.email);
    fd.append("password", form.password);
    if (form.logo) fd.append("logo", form.logo);

    const result = await dispatch(registerStore(fd));
    if (result.type === "store/register/fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register Store</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm">Name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Location / Address</label>
          <input name="location" required value={form.location} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input name="password" type="password" required value={form.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Logo</label>
          <input name="logo" type="file" accept="image/*" onChange={handleChange} className="w-full" />
        </div>
        <div>
          <button disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
        {error && <div className="text-red-600">{typeof error === "string" ? error : JSON.stringify(error)}</div>}
      </form>
      {store && <div className="mt-3 text-sm text-green-700">Registered and logged in as {store.name}</div>}
    </div>
  );
};

export default RegisterStore;
