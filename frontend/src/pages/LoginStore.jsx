import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStore } from "../redux/slices/storeSlice";
import { useNavigate } from "react-router-dom";

const LoginStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, store } = useSelector((state) => state.storeAuth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginStore(form));
    if (result.type === "store/login/fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Store Login</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <button
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        {error && (
          <div className="text-red-600">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}
      </form>
      {store && (
        <div className="mt-3 text-sm text-green-700">
          Logged in as {store.name}
        </div>
      )}
    </div>
  );
};

export default LoginStore;
