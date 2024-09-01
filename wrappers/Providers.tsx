"use client";
import { DirectionProvider } from "@radix-ui/react-direction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DirectionProvider dir="rtl">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </DirectionProvider>
  );
};
