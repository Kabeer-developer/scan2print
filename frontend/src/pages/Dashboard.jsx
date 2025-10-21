import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById, fetchStoreFiles, deleteStoreFile } from "../redux/slices/storeSlice";
import FileCard from "../components/FileCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { store, files, loading } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchStoreById(user._id));
      dispatch(fetchStoreFiles(user._id));
    }
  }, [dispatch, user]);

  const handleDelete = (fileId) => {
    if (window.confirm("Delete this file?")) {
      dispatch(deleteStoreFile({ storeId: user._id, fileId }));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Store Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-gray-600 mb-4">Store Name: {store?.storeName || "N/A"}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.length > 0 ? (
              files.map((file) => (
                <FileCard key={file._id} file={file} onDelete={handleDelete} isOwner />
              ))
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
