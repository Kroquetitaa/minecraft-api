const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dev',
    allowedFormats: ["jpg", "png", 'jpeg', 'gif'],
    public_id: (req, file) => file.originalname,
  }
})

const upload = multer({ storage });

module.exports = upload;