"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (result?.error) {
      setError(result.error); // Display error message
    } else {
      // Redirect to the dashboard on successful login
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}