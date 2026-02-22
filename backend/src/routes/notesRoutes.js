import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesController.js";
import { protectRoute } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllNotes);
router.get("/:id", protectRoute, getNoteById);
router.post("/", protectRoute, createNote);
router.put("/:id", protectRoute, updateNote);
router.delete("/:id", protectRoute, deleteNote);

export default router;
