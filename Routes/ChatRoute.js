import express from "express";
import {
  createChat,
  userChats,
  findChats,
} from "../Controllers/ChatController.js";
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChats);

export default router;
