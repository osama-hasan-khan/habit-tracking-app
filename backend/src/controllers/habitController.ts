import { Request, Response } from "express";
import Habit from "../models/Habit";

export const createHabit = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = (req as any).user.id;

    const newHabit = new Habit({
      name,
      description,
      userId,
      streak: 0,
      progress: [],
    });

    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("Error creating habit:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const habits = await Habit.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(habits);
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const markHabitCompleted = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const existingProgress = habit.progress.find(
      (entry) => entry.date === date
    );
    if (existingProgress) {
      return res
        .status(400)
        .json({ message: "Habit already marked as completed for this date" });
    }

    habit.progress.push({ date, completed: true });
    habit.streak += 1;

    await habit.save();
    return res.status(200).json(habit);
  } catch (error) {
    console.error("Error marking habit as completed:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;

    const habit = await Habit.findById(habitId);

    if (!habit) {
      res.status(404).json({ message: "Habit not found" });
      return;
    }

    await habit.deleteOne();
    res.status(200).json({ message: "Habit deleted" });
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;
    const { name, description } = req.body;

    const habit = await Habit.findById(habitId);

    if (!habit) {
      res.status(404).json({ message: "Habit not found" });
      return;
    }

    if (name) habit.name = name;
    if (description) habit.description = description;

    await habit.save();
    res.status(200).json(habit);
  } catch (error) {
    console.error("Error updating habit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
