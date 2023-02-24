import express from "express";

import {
  getsignUpUsers,
  getsignUpUsersById,
  savesignUpUsers,
  insertManysignUpUsers,
  deletesignUpUsers,
  updatesignUpUsers,
} from "../controllers/signUp.js";
const router = express.Router();

router.get("", getsignUpUsers);
router.get("/:id", getsignUpUsersById);
router.post("", savesignUpUsers);
router.post("/all", insertManysignUpUsers);
router.delete("/:id", deletesignUpUsers);
router.put("/:id", updatesignUpUsers);

export default router;
