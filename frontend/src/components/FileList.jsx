import React from "react";

const FileList = ({ files, onDelete }) => (
  <div className="bg-white p-4 rounded-lg shadow space-y-2">
    <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
    {files.map((file) => (
      <div key={file._id} className="flex justify-between items-center border-b py-2">
        <a href={file.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
          {file.uploaderName || "Unnamed"} ({file.fileType})
        </a>
        <div className="flex gap-2">
          <button
            onClick={() => window.open(file.fileUrl, "_blank")}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Print
          </button>
          <button
            onClick={() => onDelete(file._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default FileList;
