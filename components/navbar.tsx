"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import UserMenu from "./user-menu";
import LanguageSelect from "./language-select";

interface INavbarProps {
  routes: {
    label: string;
    url: string;
  }[];
  activeRoute: string;
}

export default function Navbar({ routes, activeRoute }: INavbarProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <Link href="#" prefetch={false}>
            <Image
              width={118}
              height={32}
              alt="بلاگر"
              src="/blogger.svg"
              className="mt-4"
            />
          </Link>
          <div className="grid gap-2 py-6">
            {routes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                className={cn(
                  "flex w-full items-center py-2 text-lg font-semibold",
                  activeRoute === route.url && "font-bold"
                )}
                prefetch={false}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex w-full">
        <Link href="#" className="mr-6 ml-2 hidden lg:flex" prefetch={false}>
          <Image width={118} height={32} alt="بلاگر" src="/blogger.svg" />
        </Link>
        <NavigationMenu className="hidden lg:flex mr-2">
          <NavigationMenuList className="gap-1">
            {routes.map((route) => (
              <NavigationMenuLink asChild key={route.url}>
                <Button
                  asChild
                  variant={activeRoute === route.url ? "secondary" : "ghost"}
                  className={cn(activeRoute === route.url && "font-bold")}
                  size="lg"
                >
                  <Link href={route.url} prefetch={false}>
                    {route.label}
                  </Link>
                </Button>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="mx-2"
      >
        <Sun className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
      <LanguageSelect />
      <UserMenu />
    </header>
  );
}
