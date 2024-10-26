import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getServerTranslations } from "@/i18n/server";
import { renderPrivateRoutes, renderPublicRoutes } from "@/lib/constants";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = await getServerTranslations("common");

  const session = await auth();

  const localizedRoutes = t("nav", {
    returnObjects: true,
  }) as { [key: string]: string };

  return (
    <main className="bg-background flex min-h-screen flex-col items-center">
      <Navbar
        routes={[
          ...renderPublicRoutes(localizedRoutes),
          ...(session ? renderPrivateRoutes(localizedRoutes) : []),
        ]}
        activeRoute="/"
      />
      {children}
      <Footer
        routes={[
          ...renderPublicRoutes(localizedRoutes),
          ...(session ? renderPrivateRoutes(localizedRoutes) : []),
        ]}
      />
    </main>
  );
}
