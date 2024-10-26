import { Github, Plus, Repeat } from "lucide-react";

import { renderPrivateRoutes, renderPublicRoutes } from "@/lib/constants";
import Image from "next/image";
import { auth, signIn } from "@/auth";
import Link from "next/link";
import { getServerTranslations } from "@/i18n/server";
import { cn } from "@/lib/utils";
import { dir } from "i18next";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { PostsColumn } from "@/components/post/posts-column";

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
          ...renderPublicRoutes(localizedRoutes),
          ...(session ? renderPrivateRoutes(localizedRoutes) : []),
        ]}
        activeRoute="/"
      />
      <section
        className={cn(
          "container mt-4 flex items-center justify-center flex-col-reverse gap-4 md:gap-8 md:mt-8 md:flex-row-reverse",
          dir(i18n.resolvedLanguage) === "rtl" && "md:flex-row"
        )}
      >
        <div className="flex flex-col items-center justify-center gap">
          <h1 className="font-black text-7xl text-primary">{t("title")}</h1>
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
          alt="Blogger"
          className="md:w-96 w-48"
        />
      </section>
      <section className="container mt-12 grid grid-cols-3">
        <div
          className={cn(
            "md:mt-4 col-span-3 md:col-span-2 order-2 md:order-1",
            dir(i18n.resolvedLanguage) === "ltr" ? "md:pr-6" : "md:pl-6"
          )}
        >
          <h2 className="text-lg font-black mb-8">{t("recent-posts")}</h2>
          <PostsColumn queryKey="recent-posts" variant="normal" />
        </div>
        <div
          className={cn(
            "mb-8 md:mb-0 md:mt-4 col-span-3 md:col-span-1 py-8 md:py-0 order-1 md:order-2 border-b md:border-0",
            dir(i18n.resolvedLanguage) === "ltr"
              ? "md:pl-6 md:border-l"
              : "md:pr-6 md:border-r"
          )}
        >
          <h2 className="text-lg font-black mb-8">{t("top-posts")}</h2>
          <PostsColumn
            queryKey="top-posts"
            order="likes"
            variant="mini"
            count={3}
          />
        </div>
      </section>
      <Footer
        routes={[
          ...renderPublicRoutes(localizedRoutes),
          ...(session ? renderPrivateRoutes(localizedRoutes) : []),
        ]}
      />
    </main>
  );
}
