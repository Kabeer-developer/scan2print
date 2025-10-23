const QRCode = require("qrcode");

const generateQRCode = async (url) => {
  try {
    const qr = await QRCode.toDataURL(url);
    return qr;
  } catch (err) {
    throw new Error("QR code generation failed");
  }
};

module.exports = generateQRCode;
