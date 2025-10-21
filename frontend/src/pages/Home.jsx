import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Scan2Print</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Scan the store's QR code, upload your files or photos, and the store owner can view, download, or print them instantly.
      </p>
      <div className="space-x-4">
        <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Get Started
        </Link>
        <Link to="/login" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
          Login
        </Link>
      </div>
    </section>
  );
};

export default Home;
