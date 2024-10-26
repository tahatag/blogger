import type { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { toSnakeCase } from "./lib/utils";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        slug: session.user.name ? toSnakeCase(session.user.name) : null,
      },
    }),
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const routeIsProtected = PROTECTED_ROUTES.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      if (routeIsProtected) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }
      return true;
    },
  },
  providers: [github],
} satisfies NextAuthConfig;
