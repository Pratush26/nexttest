import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavBtn from "./NavBtn";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
      <NavBtn />
    </nav>
  );
}
