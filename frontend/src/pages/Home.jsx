import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStores } from "../redux/slices/storeSlice";
import StoreCard from "../components/StoreCard";

const Home = () => {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.store);

  useEffect(() => { dispatch(fetchAllStores()); }, [dispatch]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {stores.map((store) => <StoreCard key={store._id} store={store} />)}
    </div>
  );
};

export default Home;
