import React, { useEffect, useState } from "react";
import storeService from "../api/storeService";
import StoreCard from "../components/StoreCard";
import { Store, Loader2, AlertCircle } from "lucide-react";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await storeService.getAllStores();
        setStores(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load stores. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">All Stores</h1>
          </div>
          <p className="text-slate-600 text-lg ml-14">
            Discover and explore our featured stores
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-600 text-lg font-medium">Loading stores...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-900 font-semibold mb-1">Error Loading Stores</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Stores Grid */}
        {!loading && !error && (
          <>
            {stores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((s) => (
                  <StoreCard key={s._id} store={s} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  <Store className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Stores Found
                </h3>
                <p className="text-slate-600">
                  There are currently no stores available. Check back later!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;