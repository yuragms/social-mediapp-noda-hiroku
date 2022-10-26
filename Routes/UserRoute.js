import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  UnfollowUser,
  getAllUsers,
} from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   res.send("user route");
// });
router.get("/", authMiddleWare, getAllUsers);
router.get("/:id", getUser);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, UnfollowUser);

export default router;
