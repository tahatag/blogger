"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);

  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <main className="bg-background flex min-h-screen flex-col items-center p-12">
      <h1 className="font-bold text-8xl text-primary">بلاگر</h1>
      <p className="text-xl mt-8">تست کوتاهی از بلاگر</p>
      <Button className="mt-4" variant="outline" size="icon" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </main>
  );
}
