import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterStore from "./pages/RegisterStore";
import Dashboard from "./pages/Dashboard";
import StoreUpload from "./pages/StoreUpload";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterStore />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/store/:id" element={<StoreUpload />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
