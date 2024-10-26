"use client";

import { changeBookmarked, changeLiked } from "@/app/actions/post";
import { ReadOnlyEditor } from "@/components/editor/read-only";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorResponse, PostData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { Bookmark, Loader2Icon, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function Post() {
  const { i18n } = useTranslation("common");
  const params = useParams<{ authorId: string; postSlug: string }>();

  const [likeLoading, setLikeLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const queryKey = `${params.authorId}-${params.postSlug}`;
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    PostData,
    AxiosError<ErrorResponse>
  >({
    queryKey: [queryKey],
    queryFn: () =>
      axios
        .get(`/api/authors/${params.authorId}/${params.postSlug}`)
        .then((res) => res.data.post),
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
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  const formatCreatedAt = (date: string | Date) =>
    dateTimeFormat.format(new Date(date));

  const toggleLike = async () => {
    if (isSuccess) {
      setLikeLoading(true);
      const newLikeStatus = await changeLiked(data.id, data.liked);
      queryClient.setQueryData([queryKey], (prevData: PostData) => ({
        ...prevData,
        liked: newLikeStatus,
        likes: newLikeStatus ? prevData.likes + 1 : prevData.likes - 1,
      }));
      setLikeLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (isSuccess) {
      setBookmarkLoading(true);
      const newBookmarkStatus = await changeBookmarked(
        data.id,
        data.bookmarked
      );
      queryClient.setQueryData([queryKey], (prevData: PostData) => ({
        ...prevData,
        bookmarked: newBookmarkStatus,
      }));
      setBookmarkLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-96 relative bg-neutral-100 dark:bg-neutral-900">
        {isSuccess && data?.cover && (
          <Image
            fill
            alt={data.title}
            className="object-cover"
            src={data?.cover}
          />
        )}
        {!isSuccess && (
          <Skeleton className="w-full h-96 rounded-none bg-neutral-200 dark:bg-neutral-900" />
        )}
        <div
          className={cn(
            "w-full h-96 absolute top-0",
            data?.cover && "bg-black/45"
          )}
        >
          <div className="h-full container flex justify-center items-center">
            {isSuccess ? (
              <h1
                className={cn(
                  "text-6xl text-center font-black text-neutral-50",
                  !data?.cover && "text-neutral-900 dark:text-neutral-50"
                )}
              >
                {data.title}
              </h1>
            ) : (
              <Skeleton className="w-96 h-16" />
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <section
          className={cn(
            "my-4 flex items-center justify-center flex-col-reverse gap-4 md:gap-8 md:my-8 md:flex-row-reverse"
          )}
        >
          {isSuccess ? (
            <ReadOnlyEditor initialContent={JSON.parse(data.content)} />
          ) : (
            <Skeleton className="w-full h-full min-h-[500px]" />
          )}
        </section>
        {isSuccess && (
          <div className="w-full gap-4 py-4 px-12 border-muted bg-primary rounded-lg sm:shadow-lg mb-4 md:mb-8 flex flex-col md:flex-row justify-between items-center">
            <div className="h-full flex items-center gap-4">
              <Link
                href={`/authors/${params.authorId}`}
                className="flex gap-2 items-center hover:underline"
              >
                <Avatar className="w-6 h-6 border-white/50 border-3">
                  <AvatarImage
                    src={
                      data.author?.image ??
                      "https://avatar.iran.liara.run/public"
                    }
                  />
                  <AvatarFallback>
                    {data.author.name.split("")[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-white">{data.author.name}</p>
              </Link>
              <Separator
                orientation="vertical"
                className="h-12 sm:h-6 bg-white/50"
              />
              <p className="text-white">{formatCreatedAt(data.createdAt)}</p>
            </div>
            <div className="flex gap-4">
              {!likeLoading ? (
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={toggleLike}
                >
                  <p
                    className={cn(
                      "text-lg leading-none text-white/50",
                      data.liked && "text-white"
                    )}
                  >
                    {data.likes}
                  </p>
                  <ThumbsUp
                    className={cn("text-white/50", data.liked && "text-white")}
                  />
                </div>
              ) : (
                <Loader2Icon className="text-white animate-spin" />
              )}
              {!bookmarkLoading ? (
                <Bookmark
                  className={cn(
                    "cursor-pointer text-white/50",
                    data.bookmarked && "text-white fill-white"
                  )}
                  onClick={toggleBookmark}
                />
              ) : (
                <Loader2Icon className="text-white animate-spin" />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
