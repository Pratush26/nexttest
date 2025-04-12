"use client";

import { signIn } from "next-auth/react";
import { registerUser } from "@/actions/register";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  async function handleSubmit(formData) {
    const result = await registerUser(null, formData);

    if (result?.error) {
      throw new Error(result.error);
    }
    redirect("/login"); // Redirect to the dashboard after successful registration
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <form action={handleSubmit} className="flex flex-col space-y-4">
      <input name="name" placeholder="Name" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <input name="phoneNumber" type="text" placeholder="Phone Number" />
      <button type="submit" className="bg-amber-500 m-2 rounded-lg">Register</button>
    </form>
    <div className="flex items-center space-x-3">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Continue with GitHub
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="bg-amber-400 text-white px-4 py-2 rounded"
          >
            Continue with Google
          </button>
        </div>
    </div>
  );
}