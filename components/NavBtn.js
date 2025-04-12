"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import "@/app/styles/style.css";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return (<div>
    <div className="snippet" data-title="dot-pulse">
      <div className="stage">
        <div className="dot-pulse"></div>
      </div>
    </div>
  </div>)

  if (session) {
    return (
      <div className="flex items-center space-x-3">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <Link href="/dashboard" className="hover:underline capitalize">
            dashboard
          </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Link href="/login" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
        Login
      </Link>
      <Link href="/register" className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
        Register
      </Link>
    </div>
  );
}
