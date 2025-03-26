import express from "express";


import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} from "../controllers/habitController";
import { authenticateUser } from "../middlewares/auth";

const router = express.Router();

router.post("/", authenticateUser, createHabit);
router.get("/", authenticateUser, getHabits);
router.put("/:id", authenticateUser, updateHabit);
router.delete("/:id", authenticateUser, deleteHabit);

export default router;
