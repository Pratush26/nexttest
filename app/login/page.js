import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginBtn from "@/components/LoginBtn";
import LoginForm from "@/components/LoginForm";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <LoginForm />
      <p className="text-gray-500">or</p>
      <LoginBtn />
    </div>
  );
}
