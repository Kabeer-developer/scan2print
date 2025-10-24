import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storeService from "../api/storeService";
import uploadService from "../api/uploadService";

const StoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [uploaderName, setUploaderName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await storeService.getStoreById(id);
        setStore(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: "error", msg: "Please select a file" });
      return;
    }
    const formData = new FormData();
    formData.append("uploaderName", uploaderName);
    formData.append("file", file);

    try {
      setStatus({ type: "loading", msg: "Uploading..." });
      await uploadService.uploadFile(id, formData);
      setStatus({ type: "success", msg: "Uploaded successfully" });
      setUploaderName("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", msg: "Upload failed" });
    }
  };

  if (!store) return <p>Loading store...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex gap-4 items-center">
        <img
          src={store.logoUrl || "https://via.placeholder.com/100"}
          alt={store.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h2 className="text-xl font-bold">{store.name}</h2>
          <p className="text-gray-600">{store.location}</p>
        </div>
      </div>

      <hr className="my-4" />

      <h3 className="text-lg font-semibold mb-2">Upload Document to this Store</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Your Name</label>
          <input
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm">File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload
          </button>
        </div>
        {status && (
          <div className={`mt-2 ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {status.msg}
          </div>
        )}
      </form>
    </div>
  );
};

export default StoreDetail;
