"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "next-i18next";

interface IFooterProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  routes: {
    label: string;
    url: string;
  }[];
}

const Footer = React.forwardRef<HTMLDivElement, IFooterProps>(
  ({ routes, className }, ref) => {
    const { t, i18n } = useTranslation("common");
    const todaysDate = new Date();
    const year = new Intl.DateTimeFormat(
      i18n.resolvedLanguage === "fa" ? "fa-IR" : "en-US",
      { year: "numeric" }
    ).format(todaysDate);

    return (
      <footer
        className={cn("w-full bg-background border-t mt-[-1px]", className)}
        ref={ref}
      >
        <div className="container">
          <div className="grid grid-cols-1 px-4 py-8 md:py-16 lg:py-20 md:grid-cols-2 gap-8">
            <div className="space-y-4 flex flex-col items-center">
              <Link href="/" prefetch={false}>
                <Image width={236} height={64} alt="Blogger" src="/blogger.svg" />
              </Link>
              <p className="text-sm text-muted-foreground">
                {t("footer.about")}
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <h2 className="text-lg font-semibold">
                {t("footer.quick-links")}
              </h2>
              <nav className="flex flex-col space-y-2">
                {routes.map((route) => (
                  <Link
                    key={route.label}
                    href={route.url}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="py-8 border-t text-center text-sm text-muted-foreground">
            © {year} {t("title")}. {t("footer.copyright")}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export { Footer };
