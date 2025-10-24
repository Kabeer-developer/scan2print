import React, { useEffect, useState } from "react";
import storeService from "../api/storeService";
import StoreCard from "../components/StoreCard";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await storeService.getAllStores();
        setStores(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Stores</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {stores.map((s) => (
            <StoreCard key={s._id} store={s} />
          ))}
          {stores.length === 0 && <p>No stores found.</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
