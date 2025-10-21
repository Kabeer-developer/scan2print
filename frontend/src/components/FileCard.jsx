import React from "react";
import { formatDate } from "../utils/formatDate";

const FileCard = ({ file, onDelete, isOwner }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
      <p className="font-medium text-gray-800 truncate">{file.originalName}</p>
      <p className="text-sm text-gray-500">{formatDate(file.createdAt)}</p>
      <div className="flex justify-between mt-2">
        <a href={file.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
          Download
        </a>
        {isOwner && (
          <button onClick={() => onDelete(file._id)} className="text-red-500 hover:text-red-700 text-sm">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FileCard;
