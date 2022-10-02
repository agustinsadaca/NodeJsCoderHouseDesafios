import express from "express";
import multer from 'multer'
import {uploadImageController,getImage} from "../controllers/images.controller.js";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });

const imagesRoutes = express.Router();

imagesRoutes.post("/",upload.single('file'), uploadImageController);
imagesRoutes.get("/:fileName", getImage);

export default imagesRoutes;
