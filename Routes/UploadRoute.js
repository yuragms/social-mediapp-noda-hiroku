import express from "express";
import multer from "multer";
import { uploadFileS3 } from "../s3.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    const fileBuffer = req.file.buffer;
    // const bucketFolder = "posts/" + req.body.name;
    const bucketFolder = req.body.name;
    const mimetype = req.file.mimetype;

    await uploadFileS3(fileBuffer, bucketFolder, mimetype);

    return res.status(200).json("File Uploaded Successfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;
