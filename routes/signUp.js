import express from "express";

import {
  getsignUpUsers,
  getsignUpUsersById,
  savesignUpUsers,
  insertManysignUpUsers,
  deletesignUpUsers,
  updatesignUpUsers,
  loginRequest,
} from "../controllers/signUp.js";
const router = express.Router();

router.get("/signup", getsignUpUsers);
router.get("/signup/:id", getsignUpUsersById);
router.post("/signup", savesignUpUsers);
router.post("/login", loginRequest);
router.post("/signup/all", insertManysignUpUsers);
router.delete("/signup/:id", deletesignUpUsers);
router.put("/signup/:id", updatesignUpUsers);

export default router;
