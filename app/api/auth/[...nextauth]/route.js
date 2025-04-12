import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/user";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      // Check if the user exists in the database
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // If the user does not exist, create a new user in the database
        await User.create({
          name: user.name || profile.name || "Unknown",
          email: user.email,
          image: user.image || profile.picture || null,
          password: null, // Password is null for OAuth users
        });
      }

      return true; // Allow sign-in
    },
    async jwt({ token, user }) {
      console.log("JWT Callback:", { token, user });
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || null;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", { session, token });
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image || null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };