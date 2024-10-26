import { Github, Plus, Repeat } from "lucide-react";

import { renderPublicRoutes, renderPrivateRoutes } from "@/lib/constants";
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
      <section className="py-16 container flex-1 flex flex-col justify-center items-center">
        <Link href="/" prefetch={false}>
          <Image width={472} height={128} alt="Blogger" src="/blogger.svg" />
        </Link>
        <p className="mt-4 text-center text-base">{t("footer.about")}</p>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Developed By Taha Taghaddos
        </p>
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
