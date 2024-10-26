"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { PostData } from "@/lib/types";
import { PostCard } from "../post-card";
import { Separator } from "../ui/separator";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MiniPostCard } from "../mini-post-card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Loader2, Repeat } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IPostsColumnProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  queryKey: string;
  variant: "normal" | "mini";
  count?: number;
  order?: "likes";
  authorId?: string;
  direction?: "asc" | "desc";
  cardClassName?: string;
}

const PostsColumn = React.forwardRef<HTMLDivElement, IPostsColumnProps>(
  (
    {
      queryKey,
      variant,
      count = 6,
      order,
      direction,
      authorId,
      className,
      cardClassName,
    },
    ref
  ) => {
    const { t } = useTranslation("common");

    const fetchPosts = async (pageParam: number) =>
      axios
        .get(
          `/api/posts?count=${count}&page=${pageParam}${
            order ? `&order=${order}` : ""
          }${direction ? `&direction=${direction}` : ""}${
            authorId ? `&author=${authorId}` : ""
          }`
        )
        .then((res) => res.data);

    const { data, isLoading, isSuccess, fetchNextPage, isFetchingNextPage } =
      useInfiniteQuery<{
        message: string | null;
        posts: PostData[];
        count: number;
        page: number;
      }>({
        queryKey: [queryKey],
        queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.page + 1,
      });

    return (
      <div className={cn(className)} ref={ref}>
        {isLoading &&
          [...Array(count).keys()].map(() =>
            variant === "normal" ? (
              <>
                <div className="flex gap-12 mt-8">
                  <Skeleton className="h-48 flex-1" />
                  <Skeleton className="h-48 w-48" />
                </div>
                <Separator className="mt-8" />
              </>
            ) : (
              <>
                <Skeleton className="mt-8 h-14" />
              </>
            )
          )}
        {isSuccess &&
          data?.pages?.map((page) =>
            page.posts.map((post, index) =>
              variant === "normal" ? (
                <>
                  <PostCard
                    id={post.id}
                    authorAvatar={
                      post.author?.image ??
                      "https://avatar.iran.liara.run/public"
                    }
                    authorName={post.author?.name}
                    authorUrl={`/authors/${post.author.id}`}
                    title={post.title}
                    url={`/authors/${post.author.id}/${post.slug}`}
                    description={post.description}
                    date={post.createdAt}
                    likes={post.likes}
                    liked={post.liked}
                    bookmarked={post.bookmarked}
                    cover={
                      post.cover ??
                      "https://placehold.co/192?text=No+Cover+:c&font=roboto.jpeg"
                    }
                    className={cn("mt-8", cardClassName)}
                  />
                  <Separator className="mt-8" />
                </>
              ) : (
                <MiniPostCard
                  id={post.id}
                  authorAvatar={
                    post.author?.image ?? "https://avatar.iran.liara.run/public"
                  }
                  authorName={post.author?.name}
                  authorUrl={`/authors/${post.author.id}`}
                  title={post.title}
                  url={`/authors/${post.author.id}/${post.slug}`}
                  likes={post.likes}
                  className={cn("mt-8", cardClassName)}
                />
              )
            )
          )}
        {variant === "normal" && isSuccess && (
          <div className="my-8 w-full flex justify-center">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? <Loader2 className="animate-spin" /> : <Repeat />} {t("load-more")}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

PostsColumn.displayName = "PostsColumn";

export { PostsColumn };
