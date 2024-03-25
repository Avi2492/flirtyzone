import express from "express";
import {
  signup,
  login,
  logout,
  deleteMyAccount,
  updateAccount,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.delete("/deleteMyAccount/:id", deleteMyAccount);

router.put("/updateAccount/:id", updateAccount);

export default router;
