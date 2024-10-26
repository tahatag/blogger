"use client";

import { useTranslation } from "next-i18next";
import { Button, ButtonProps } from "./ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { dir } from "i18next";
import { cn } from "@/lib/utils";
import React from "react";

interface IBackButtonProps extends ButtonProps {
  rtlClass?: string;
  ltrClass?: string;
}

const BackButton = React.forwardRef<HTMLButtonElement, IBackButtonProps>(
  (
    {
      rtlClass = "right-6",
      ltrClass = "left-6",
      className = "absolute top-6",
      ...props
    },
    ref
  ) => {
    const { t, i18n } = useTranslation("common");
    return (
      <Link href="/">
        <Button
          asChild
          variant="ghost"
          ref={ref}
          className={cn(
            "gap-1",
            className,
            dir(i18n.resolvedLanguage) === "rtl" ? rtlClass : ltrClass
          )}
          {...props}
        >
          <div>
            {dir(i18n.resolvedLanguage) === "rtl" ? (
              <ArrowRight />
            ) : (
              <ArrowLeft />
            )}
            {t("back")}
          </div>
        </Button>
      </Link>
    );
  }
);

BackButton.displayName = "BackButton";

export { BackButton };
