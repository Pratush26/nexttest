"use server";

import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/user";

// Register the user with email, password, name, and phone number
export async function registerUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phoneNumber = formData.get("phoneNumber");

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the phone number to the user registration
  await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  return { success: true };
}
