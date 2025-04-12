import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              )}
      <h1 className="text-2xl font-bold">Welcome {session.user.name}</h1>
      <p className="text-lg">Email: {session.user.email}</p>
    </main>
  );
}
