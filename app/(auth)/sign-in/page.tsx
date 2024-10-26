import { auth, signIn } from "@/auth";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { getServerTranslations } from "@/i18n/server";
import { Github } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const { t } = await getServerTranslations("common");

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
      <BackButton />
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
