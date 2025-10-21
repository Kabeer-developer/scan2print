import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile, fetchFiles } from "../redux/slices/uploadSlice";
import FileCard from "../components/FileCard";

const StoreUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { uploads, loading } = useSelector((state) => state.upload);
  const { user } = useSelector((state) => state.auth);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first!");
    const formData = new FormData();
    formData.append("file", file);
    dispatch(uploadFile({ storeId: user._id, formData })).then(() => {
      dispatch(fetchFiles(user._id));
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload to Store</h2>
      <form onSubmit={handleUpload} className="flex gap-4 items-center mb-6">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {uploads.length > 0 ? (
          uploads.map((f) => <FileCard key={f._id} file={f} />)
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default StoreUpload;
