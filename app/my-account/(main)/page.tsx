"use client";

import { AuthorPostsColumn } from "@/components/post/author-posts-column";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthorData, ErrorResponse, PostData } from "@/lib/types";
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

  const queryKey = `my-account`;
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    AuthorData,
    AxiosError<ErrorResponse>
  >({
    queryKey: [queryKey],
    queryFn: () => axios.get(`/api/my-account`).then((res) => res.data.account),
  });

  useEffect(() => {
    if (isError) {
      for (const [key, errorMessage] of Object.entries(
        error?.response?.data?.errors ?? {}
      )) {
        toast.error(
          Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ?? ""
        );
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

  const tabs = ["posts", "likes", "bookmarks"];

  return (
    <>
      <div className="container">
        <div className="my-12 w-full gap-4 p-4 border-muted bg-primary rounded-lg sm:shadow-lg flex flex-col md:flex-row justify-between items-center">
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
        <Tabs defaultValue="posts">
          <TabsList className="w-full">
            {tabs.map((tab) => (
              <TabsTrigger
                className="h-full text-md data-[state=active]:font-bold"
                value={tab}
              >
                {t(`user.${tab}`)}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent value={tab}>
              <AuthorPostsColumn
                author={data}
                posts={
                  data
                    ? (data[tab as keyof typeof data] as PostData[])
                    : undefined
                }
                isLoading={isLoading}
                isSuccess={isSuccess}
                variant="normal"
                className="grid grid-cols-2 gap-2 md:gap-16 mb-8"
                cardClassName="col-span-2 md:col-span-1"
                separator={false}
                canEdit={tab === "posts"}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
