import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import { Providers, ThemeProvider } from "@/wrappers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Noto_Sans_Arabic } from "next/font/google";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "بلاگر",
  description: "بلاگر، وبلاگ روزانه‌ی تو",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Providers>
        <html lang="en" dir="rtl" suppressHydrationWarning>
          <body className={notoSansArabic.className}>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
            </ThemeProvider>
          </body>
        </html>
      </Providers>
    </SessionProvider>
  );
}
