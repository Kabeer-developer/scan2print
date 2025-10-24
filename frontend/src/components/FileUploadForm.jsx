import React, { useState } from "react";
import { uploadFile } from "../api/uploadService";

const FileUploadForm = ({ storeId }) => {
  const [uploaderName, setUploaderName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !uploaderName) return;

    const formData = new FormData();
    formData.append("uploaderName", uploaderName);
    formData.append("file", file);

    try {
      await uploadFile(storeId, formData);
      setMessage("Uploaded successfully ✅");
      setUploaderName("");
      setFile(null);
    } catch {
      setMessage("Upload failed ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <input
        type="text"
        placeholder="Your Name"
        value={uploaderName}
        onChange={(e) => setUploaderName(e.target.value)}
        className="border p-2 w-full rounded-lg"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 w-full rounded-lg"
      />
      <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition">
        Upload File
      </button>
      {message && <p className="text-center mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default FileUploadForm;
