import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
  } from "../controllers/userController";

const router = express.Router();

//events endpoints
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/login", login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as userRoutes };
