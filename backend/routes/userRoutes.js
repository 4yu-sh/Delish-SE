import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

import { protect, admin, superAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, superAdmin, getUsers);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, superAdmin, getUsersById)
  .delete(protect, superAdmin, deleteUser)
  .put(protect, superAdmin, updateUser);

export default router;
