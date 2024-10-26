"use client";

import { AuthorPostsColumn } from "@/components/post/author-posts-column";
import { PostsColumn } from "@/components/post/posts-column";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthorData, ErrorResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { dir } from "i18next";
import { ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function Layout() {
  const { t, i18n } = useTranslation("post");
  const params = useParams<{ authorId: string; postSlug: string }>();

  const queryKey = `author-${params.authorId}`;
  const topPostsQueryKey = `top-${params.authorId}`;
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    AuthorData,
    AxiosError<ErrorResponse>
  >({
    queryKey: [queryKey],
    queryFn: () =>
      axios
        .get(`/api/authors/${params.authorId}`)
        .then((res) => res.data.author),
  });

  useEffect(() => {
    if (isError) {
      if (error.response?.status === 404) {
        for (const [key, errorMessage] of Object.entries(
          error?.response?.data?.errors ?? {}
        )) {
          toast.error(
            Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ?? ""
          );
        }
      }
    }
  }, [isError]);

  const dateTimeFormat = new Intl.DateTimeFormat(
    i18n.resolvedLanguage === "fa" ? "fa-u-ca-persian" : "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const formatCreatedAt = (date: string | Date) =>
    dateTimeFormat.format(new Date(date));

  return (
    <>
      <div className="container">
        <div className="mt-12 w-full gap-4 p-4 border-muted bg-primary rounded-lg sm:shadow-lg flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 items-center">
            {isSuccess ? (
              <Avatar className="w-24 h-24 border-white/50 border-3 rounded-none">
                <AvatarImage
                  src={data?.image ?? "https://avatar.iran.liara.run/public"}
                />
                <AvatarFallback>{data?.name.split("")[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="w-24 h-24" />
            )}
            {isSuccess ? (
              <div className="flex flex-col gap-1">
                <p className="text-lg md:text-3xl text-white">{data.name}</p>
                <p className="text-white/85">
                  {t("author.member-since")} {formatCreatedAt(data.createdAt)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <Skeleton className="w-24 h-9" />
                <Skeleton className="w-24 h-6" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-end gap-1">
            <div className="flex gap-2 text-white items-end">
              <ThumbsUp size={36} />
              <p className="text-4xl leading-7">{data?.totalLikes}</p>
            </div>
            <p className="text-white/85">{t("author.total-likes")}</p>
          </div>
        </div>
        <section className="mt-12 grid grid-cols-3">
          <div
            className={cn(
              "md:mt-4 col-span-3 md:col-span-2 order-2 md:order-1",
              dir(i18n.resolvedLanguage) === "ltr" ? "md:pr-6" : "md:pl-6"
            )}
          >
            <h2 className="text-lg font-black mb-8">{t("recent-posts")}</h2>
            <AuthorPostsColumn
              author={data}
              posts={data?.posts}
              isLoading={isLoading}
              isSuccess={isSuccess}
              variant="normal"
            />
          </div>
          <div
            className={cn(
              "mb-8 md:mb-0 md:mt-4 col-span-3 md:col-span-1 py-8 md:py-0 order-1 md:order-2 border-b md:border-0",
              dir(i18n.resolvedLanguage) === "ltr"
                ? "md:pl-6 md:border-l"
                : "md:pr-6 md:border-r"
            )}
          >
            <h2 className="text-lg font-black mb-8">{t("top-posts")}</h2>
            <PostsColumn
              authorId={params.authorId}
              queryKey={topPostsQueryKey}
              order="likes"
              count={3}
              variant="mini"
            />
          </div>
        </section>
      </div>
    </>
  );
}
