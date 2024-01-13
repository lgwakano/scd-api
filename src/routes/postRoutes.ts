import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getUsersPosts,
} from "../controllers/postController";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/users/:id", getUsersPosts); //TODO: move this to userRoutes /users/1/posts
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export { router as postRoutes };
