"use client";
import React from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { toast } from "sonner";

const queryClient = new QueryClient();

queryClient.getDefaultOptions().queries = {
  retry: false,
  refetchOnWindowFocus: false,
};

const handleGlobalError = (error: unknown) => {
  if (isAxiosError(error)) {
    for (const [, errorMessage] of Object.entries(
      error?.response?.data?.errors ?? {}
    )) {
      toast.error(
        Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ?? ""
      );
    }
  } else {
    toast.error("An unexpected error occurred.");
  }
};

queryClient.getQueryCache().subscribe(({ query }) => {
  if (query.state.status === "error") {
    const error = query.state.error;
    handleGlobalError(error);
  }
});

queryClient.getMutationCache().subscribe(({ mutation }) => {
  if (mutation?.state.status === "error") {
    const error = mutation.state.error;
    handleGlobalError(error);
  }
});

export const Providers: React.FC<{
  session: Session | null | undefined;
  dir: "ltr" | "rtl";
  children: React.ReactNode;
}> = ({ session, dir, children }) => {
  return (
    <SessionProvider session={session}>
      <DirectionProvider dir={dir}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </DirectionProvider>
    </SessionProvider>
  );
};
