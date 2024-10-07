import { Github, Plus } from "lucide-react";

import { privateRoutes, publicRoutes } from "./constants/routes";
import Image from "next/image";
import { auth, signIn } from "@/auth";
import Link from "next/link";
import { getServerTranslations } from "@/i18n/server";
import { cn } from "@/lib/utils";
import { dir } from "i18next";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostCard } from "@/components/post-card";
import { MiniPostCard } from "@/components/mini-post-card";

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
          alt="بلاگر"
          className="md:w-96 w-48"
        />
      </section>
      <section className="container mt-12 grid grid-cols-12">
        <div
          className={cn(
            "mt-4 col-span-4 md:col-span-8",
            dir(i18n.resolvedLanguage) === "ltr" ? "md:pr-6" : "md:pl-6"
          )}
        >
          <h2 className="text-lg font-black mb-8">{t('recent-posts')}</h2>
          <PostCard
            id="213"
            authorAvatar="https://loremflickr.com/360/360"
            authorName="Taha Taghaddos"
            authorUrl="/taha-tag"
            title="Very Cool Post MEOW"
            url="/taha-tag/very-cool-post-meow"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet."
            date="July 5th"
            likes={145}
            liked={false}
            bookmarked={false}
            cover="https://loremflickr.com/1280/720"
            className="mt-8"
          />
          <Separator className="mt-8" />
          <PostCard
            id="213"
            authorAvatar="https://loremflickr.com/360/360"
            authorName="Taha Taghaddos"
            authorUrl="/taha-tag"
            title="Very Cool Post MEOW"
            url="/taha-tag/very-cool-post-meow"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet."
            date="July 5th"
            likes={145}
            liked={false}
            bookmarked={true}
            cover="https://loremflickr.com/1280/720"
            className="mt-8"
          />
          <Separator className="mt-8" />
          <PostCard
            id="213"
            authorAvatar="https://loremflickr.com/360/360"
            authorName="Taha Taghaddos"
            authorUrl="/taha-tag"
            title="Very Cool Post MEOW"
            url="/taha-tag/very-cool-post-meow"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet."
            date="July 5th"
            likes={145}
            liked={false}
            bookmarked={true}
            cover="https://loremflickr.com/1280/720"
            className="mt-8"
          />
          <Separator className="mt-8" />
          <PostCard
            id="213"
            authorAvatar="https://loremflickr.com/360/360"
            authorName="Taha Taghaddos"
            authorUrl="/taha-tag"
            title="Very Cool Post MEOW"
            url="/taha-tag/very-cool-post-meow"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet."
            date="July 5th"
            likes={145}
            liked={false}
            bookmarked={true}
            cover="https://loremflickr.com/1280/720"
            className="mt-8"
          />
          <Separator className="mt-8" />
        </div>
        <div
          className={cn(
            "mt-4 col-span-4 md:col-span-4",
            dir(i18n.resolvedLanguage) === "ltr"
              ? "md:pl-6 border-l"
              : "md:pr-6 border-r"
          )}
        >
          <h2 className="text-l font-black mb-8">{t('top-posts')}</h2>
          <MiniPostCard
            className="mt-8"
            id="213"
            authorAvatar="https://loremflickr.com/360/360"
            authorName="Taha Taghaddos"
            authorUrl="/taha-tag"
            title="Very Cool Post MEOW"
            url="/taha-tag/very-cool-post-meow"
            likes={953}
            liked={false}
          />
          <MiniPostCard
            className="mt-8"
            id="213"
            authorAvatar="https://loremflickr.com/360/360"
            authorName="Taha Taghaddos"
            authorUrl="/taha-tag"
            title="Very Cool Post MEOW"
            url="/taha-tag/very-cool-post-meow"
            likes={458}
            liked={true}
          />
          <MiniPostCard
            className="mt-8"
            id="213"
            authorAvatar="https://loremflickr.com/360/360"
            authorName="Taha Taghaddos"
            authorUrl="/taha-tag"
            title="Very Cool Post MEOW"
            url="/taha-tag/very-cool-post-meow"
            likes={362}
            liked={false}
          />
        </div>
      </section>
    </main>
  );
}
