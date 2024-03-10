import express from "express";
import {
  login,
  logout,
  signup,
  deleteAccount,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.delete("/deleteMyAccount/:id", deleteAccount);

export default router;
