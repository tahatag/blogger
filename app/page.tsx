import { Github, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { privateRoutes, publicRoutes } from "./constants/routes";
import Image from "next/image";
import { auth, signIn } from "@/auth";
import Link from "next/link";
import { getServerTranslations } from "@/i18n/server";
import { cn } from "@/lib/utils";

export default async function Home() {
  const { t, i18n } = await getServerTranslations("common");
  const session = await auth();

  const localizedRoutes = t("nav", {
    returnObjects: true,
  }) as { [key: string]: string };

  return (
    <main className="bg-background flex min-h-screen flex-col items-center">
      <Navbar
        routes={[
          ...publicRoutes(localizedRoutes),
          ...(session ? privateRoutes(localizedRoutes) : []),
        ]}
        activeRoute="/"
      />
      <section
        className={cn(
          "mt-4 flex items-center flex-col-reverse gap-4 md:gap-8 md:mt-8 md:flex-row-reverse",
          i18n.resolvedLanguage === "fa" && "md:flex-row"
        )}
      >
        <div className="flex flex-col items-center justify-center gap">
          <h1 className="font-bold text-7xl text-primary">{t("title")}</h1>
          <p className="text-xl mt-4">{t("description")}</p>
          {session ? (
            <Link href="/new-post">
              <Button asChild>
                <div className="mt-4 gap-2">
                  <Plus />
                  {t("new-post")}{" "}
                </div>
              </Button>
            </Link>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
            >
              <Button type="submit" className="mt-4 gap-2">
                <Github />
                {t("login")}
              </Button>
            </form>
          )}
        </div>
        <Image
          src="/hero.svg"
          width={420}
          height={308}
          alt="بلاگر"
          className="md:w-96 w-48"
        />
      </section>
    </main>
  );
}
