import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import storeService from "../api/storeService";
import uploadService from "../api/uploadService";

const StoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploaderName, setUploaderName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await storeService.getStoreById(id);
        setStore(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load store details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }
    
    if (!allowedTypes.includes(file.type)) {
      return "Only PDF and image files (JPEG, PNG) are allowed";
    }
    
    return null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setStatus({ type: "error", msg: validationError });
        setFile(null);
        e.target.value = null;
      } else {
        setFile(selectedFile);
        setStatus(null);
      }
    }
  };

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
      setIsUploading(true);
      setStatus({ type: "loading", msg: "Uploading..." });
      await uploadService.uploadFile(id, formData);
      setStatus({ type: "success", msg: "Uploaded successfully!" });
      
      // Reset form
      setUploaderName("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: "error", 
        msg: err.response?.data?.message || "Upload failed. Please try again." 
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!store) return <p>Store not found</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex gap-4 items-center">
        <img
          src={store.logoUrl || "https://via.placeholder.com/100"}
          alt={store.name}
          className="w-24 h-24 object-cover rounded"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/100";
          }}
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
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
            disabled={isUploading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            File <span className="text-gray-500 text-xs">(PDF, JPEG, PNG - Max 10MB)</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="w-full"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            disabled={isUploading}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isUploading || !file}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              isUploading || !file
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {status && (
          <div
            className={`mt-2 p-3 rounded ${
              status.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {status.msg}
          </div>
        )}
      </form>
    </div>
  );
};

export default StoreDetail;