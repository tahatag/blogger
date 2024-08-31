import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers, ThemeProvider } from "@/wrappers";

const vazirmatn = localFont({
  src: [
    {
      path: "./fonts/Vazirmatn[wght].woff2",
      weight: "100 900",
    },
  ],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "بلاگر",
  description: "بلاگر، وبلاگ روزانه‌ی تو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" dir="rtl">
        <body className={vazirmatn.variable}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
