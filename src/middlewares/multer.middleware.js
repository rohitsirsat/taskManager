import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // this storage needs public/images folder in the root directory
    // Else it will throw an error saying cannot find path public/images
    cb(null, `./public/images`);
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    // fileSize in bytes (1MB = 1 * 1000 * 1000)
    fileSize: 1 * 1000 * 1000,
  },
});
