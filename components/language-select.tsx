"use client";

import { languages } from "@/i18n/settings";
import { useRouter } from "next/navigation";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function LanguageSelect() {
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
}
