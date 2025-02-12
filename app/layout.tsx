import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import { Providers, ThemeProvider } from "@/wrappers";
import { auth } from "@/auth";
import { Noto_Sans_Arabic, Noto_Serif } from "next/font/google";

import { dir } from "i18next";
import { detectLanguage, getServerTranslations } from "@/i18n/server";
import { I18nProvider } from "@/i18n/i18n-context";
import { Toaster } from "sonner";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata() {
  const { t } = await getServerTranslations("common");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lng = await detectLanguage();

  const session = await auth();

  return (
    <I18nProvider language={lng}>
      <Providers session={session} dir={dir(lng)}>
        <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
          <body
            className={
              lng === "fa" ? notoSansArabic.className : notoSerif.className
            }
          >
            <Toaster
              richColors
              className={
                lng === "fa" ? notoSansArabic.className : notoSerif.className
              }
            />
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
            </ThemeProvider>
          </body>
        </html>
      </Providers>
    </I18nProvider>
  );
}
