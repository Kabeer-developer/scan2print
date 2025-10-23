import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreUploads, uploadFile, deleteUploadFile } from "../redux/slices/uploadSlice";
import FileCard from "../components/FileCard";

const StoreUpload = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.upload);
  const [uploaderName, setUploaderName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => { dispatch(fetchStoreUploads(id)); }, [dispatch, id]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploaderName", uploaderName);
    dispatch(uploadFile({ storeId: id, formData }));
  };

  const handleDelete = (fileId) => dispatch(deleteUploadFile(fileId));

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleUpload} className="mb-4 flex space-x-2">
        <input type="text" placeholder="Your Name" value={uploaderName} onChange={(e) => setUploaderName(e.target.value)} className="border p-2 rounded"/>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded"/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      </form>

      {files.map((file) => <FileCard key={file._id} file={file} onDelete={handleDelete} />)}
    </div>
  );
};

export default StoreUpload;
