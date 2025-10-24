import React from "react";

const QRCodeDisplay = ({ qrCodeUrl }) => (
  <div className="text-center">
    <h3 className="text-lg font-medium mb-2">Store QR Code</h3>
    <img src={qrCodeUrl} alt="QR Code" className="w-40 mx-auto" />
  </div>
);

export default QRCodeDisplay;
