import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();

  const { callbackUrl } = searchParams;
  const redirectUrlString = Array.isArray(callbackUrl)
    ? callbackUrl[0]
    : callbackUrl ?? null;

  const redirectTo = redirectUrlString ? (new URL(redirectUrlString)).pathname : '/';

  if (session) {
    redirect(redirectTo);
  }

  return (
    <main className="bg-background flex min-h-screen flex-col items-center">
      <Link href="/" className="absolute top-6 right-6">
        <Button asChild variant="ghost">
          <div>
            <ArrowRight />
            بازگشت
          </div>
        </Button>
      </Link>
      <div className="flex-1 flex flex-col items-center justify-center gap">
        <p className="mb-4 text-4xl font-light">
          ورود به <span className="text-primary font-bold">بلاگر</span>
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo });
          }}
        >
          <Button type="submit" className="gap-2">
            <Github />
            ورود با گیت‌هاب
          </Button>
        </form>
      </div>
    </main>
  );
}
