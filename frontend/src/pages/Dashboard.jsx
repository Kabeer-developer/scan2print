import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreFiles, deleteFile } from "../redux/slices/uploadSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { store } = useSelector((state) => state.storeAuth);
  const { files, loading } = useSelector((state) => state.uploads);

  useEffect(() => {
    if (!store) {
      navigate("/register"); // if not logged in, redirect to register/login
      return;
    }
    dispatch(fetchStoreFiles(store._id));
  }, [dispatch, store, navigate]);

  const handleDelete = (fileId) => {
    if (!confirm("Delete this file?")) return;
    dispatch(deleteFile(fileId));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      {!store ? (
        <p>Please register or login first.</p>
      ) : (
        <div>
          <div className="mb-4 bg-white p-4 rounded shadow flex items-center gap-4">
            <img src={store.logoUrl || "https://via.placeholder.com/72"} className="w-16 h-16 rounded object-cover" alt={store.name} />
            <div>
              <h2 className="font-semibold">{store.name}</h2>
              <p className="text-sm text-gray-600">{store.location}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Uploaded Files</h3>
            {loading ? (
              <p>Loading...</p>
            ) : files.length === 0 ? (
              <p>No files uploaded yet.</p>
            ) : (
              <div className="space-y-3">
                {files.map((f) => (
                  <div key={f._id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{f.uploaderName || "Anonymous"}</div>
                      <div className="text-sm text-gray-600">{f.fileType}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href={f.fileUrl} target="_blank" rel="noreferrer" className="underline text-blue-600">
                        Download
                      </a>
                      <button onClick={() => handleDelete(f._id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
