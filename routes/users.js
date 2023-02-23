import express from "express";

import {
  getUsers,
  getUserById,
  saveUser,
  insertManyUser,
  deleteUser,
  updateUser,
} from "../controllers/users.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", saveUser);
router.post("/all", insertManyUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
