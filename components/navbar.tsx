"use client";

import Link from "next/link";
import {
  ChevronDown,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";
import { useTranslation } from "react-i18next";
import { signOut, useSession } from "next-auth/react";
import i18next from "i18next";
import { useRouter } from "next/navigation";
import { languages } from "@/i18n/settings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserMenu = () => {
  const { t } = useTranslation("common");
  const { data: session } = useSession();
  return !session ? null : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" asChild>
          <div className="gap-2">
            <Avatar className="w-6 h-6 border-white/50 border-3">
              <AvatarImage src={session?.user?.image as string} />
              <AvatarFallback>{(session?.user?.name || "")[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              {session?.user?.name}
              <ChevronDown size={14} />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/dashboard">
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <LayoutDashboard size={18} />
            {t("user.dashboard")}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Plus size={18} />
          <p>{t("new-post")}</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut size={18} />
          {t("user.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleChangeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-16">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            className={cn(
              "uppercase justify-center cursor-pointer gap-3",
              i18n.resolvedLanguage === language &&
                "bg-gray-800 text-gray-200 focus:bg-gary-800 focus:text-gray-200 font-bold"
            )}
            onClick={() => handleChangeLanguage(language)}
          >
            {language}
            {language === "fa" && (
              <Image src="/ir.svg" width={24} height={18} alt="Iran Flag" />
            )}
            {language === "en" && (
              <Image src="/us.svg" width={24} height={18} alt="USA Flag" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface INavbarProps extends React.BaseHTMLAttributes<HTMLHeadElement> {
  routes: {
    label: string;
    url: string;
  }[];
  activeRoute: string;
}

const Navbar = React.forwardRef<HTMLHeadElement, INavbarProps>(
  ({ className, routes, activeRoute }, ref) => {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };
    return (
      <header
        className={cn(
          "flex h-20 w-full shrink-0 items-center px-4 md:px-6",
          className
        )}
        ref={ref}
      >
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
);

Navbar.displayName = "Navbar";

export { Navbar };
