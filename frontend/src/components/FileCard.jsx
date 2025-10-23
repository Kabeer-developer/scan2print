import React from "react";

const FileCard = ({ file, onDelete }) => (
  <div className="bg-white p-3 shadow rounded flex justify-between items-center mb-2">
    <div>
      <p className="font-medium">{file.uploaderName}</p>
      <a href={file.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View/Download</a>
    </div>
    <button onClick={() => onDelete(file._id)} className="text-red-500">Delete</button>
  </div>
);

export default FileCard;
