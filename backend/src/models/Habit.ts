import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    streak: { type: Number, default: 0 },
    progress: [{ date: String, completed: Boolean }],
  },
  { timestamps: true }
);

export default mongoose.model("Habit", HabitSchema);
