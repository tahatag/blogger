"use client";
import { DirectionProvider } from "@radix-ui/react-direction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers: React.FC<{
  dir: "ltr" | "rtl";
  children: React.ReactNode;
}> = ({ dir, children }) => {
  return (
    <DirectionProvider dir={dir}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </DirectionProvider>
  );
};
