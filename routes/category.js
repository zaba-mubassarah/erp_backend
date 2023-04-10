import express from "express";
import {
  getCategories,
  getCategoryById,
  saveCategories,
  insertManyCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";
import { authCheck } from "../middlewares/authCheck.js";
const router = express.Router();

router.get("/", authCheck, getCategories);
router.get("/:id", authCheck, getCategoryById);
router.post("/", authCheck, saveCategories);
router.post("/all", authCheck, insertManyCategory);
router.delete("/:id", authCheck, deleteCategory);
router.put("/:id", authCheck, updateCategory);
export default router;
