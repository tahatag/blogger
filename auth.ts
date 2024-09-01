import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import { prisma } from "@/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [github],
  adapter: PrismaAdapter(prisma),
});
