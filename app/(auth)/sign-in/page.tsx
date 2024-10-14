import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { detectLanguage, getServerTranslations } from "@/i18n/server";
import { cn } from "@/lib/utils";
import { dir } from "i18next";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const { t } = await getServerTranslations("common");
  const lng = await detectLanguage();

  const { callbackUrl } = searchParams;
  const redirectUrlString = Array.isArray(callbackUrl)
    ? callbackUrl[0]
    : callbackUrl ?? null;

  const redirectTo = redirectUrlString
    ? new URL(redirectUrlString).pathname
    : "/";

  if (session) {
    redirect(redirectTo);
  }

  return (
    <main className="bg-background flex min-h-screen flex-col items-center">
      <Link
        href="/"
        className={cn(
          "absolute top-6",
          dir(lng) === "rtl" ? "right-6" : "left-6"
        )}
      >
        <Button asChild variant="ghost">
          <div>
            {dir(lng) === "rtl" ? <ArrowRight /> : <ArrowLeft />}
            {t("back")}
          </div>
        </Button>
      </Link>
      <div className="flex-1 flex flex-col items-center justify-center gap">
        <p className="mb-4 text-4xl font-light">
          {t("log-in-to")}{" "}
          <span className="text-primary font-bold">{t("title")}</span>
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo });
          }}
        >
          <Button type="submit" className="gap-2">
            <Github />
            {t("login")}
          </Button>
        </form>
      </div>
    </main>
  );
}
