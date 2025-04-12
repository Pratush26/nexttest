"use client";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login with GitHub
      </button>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-amber-400 text-white px-4 py-2 rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
