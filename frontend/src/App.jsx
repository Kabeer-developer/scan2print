import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import StoreDetail from "./pages/StoreDetail";
import RegisterStore from "./pages/RegisterStore";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/slices/storeSlice";
import LoginStore from "./pages/LoginStore";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/register" element={<RegisterStore />} />
          <Route path="/login" element={<LoginStore />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
