import express from "express";
import {
  getIssues,
  getIssuesById,
  saveIssues,
  insertManyIssue,
  deleteIssue,
  updateIssue,
} from "../controllers/issues.js";
import { authCheck } from "../middlewares/authCheck.js";
const router = express.Router();

router.get("/", authCheck, getIssues);
router.get("/:id", authCheck, getIssuesById);
router.post("/", authCheck, saveIssues);
router.post("/all", authCheck, insertManyIssue);
router.delete("/:id", authCheck, deleteIssue);
router.put("/:id", authCheck, updateIssue);
export default router;
