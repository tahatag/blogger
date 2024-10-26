import { BackButton } from "@/components/back-button";
import { getServerTranslations } from "@/i18n/server";

export default async function SignIn() {
  const { t } = await getServerTranslations("common");

  return (
    <main className="bg-background flex min-h-screen flex-col items-center">
      <BackButton />
      <div className="flex-1 flex flex-col items-center justify-center gap">
        <p className="text-8xl text-primary font-bold">404</p>
        <p className="mb-4 text-2xl font-bold">{t("not-found")}</p>
        <BackButton
          variant="default"
          size="lg"
          className="mt-4"
          ltrClass=""
          rtlClass=""
        />
      </div>
    </main>
  );
}
