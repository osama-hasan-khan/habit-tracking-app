import jwt from "jsonwebtoken";
import { Response } from "express";


const generateToken = (res: Response, userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Secure in production
    sameSite: "none", // For cross-site requests
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  return token;
};

export default generateToken;
