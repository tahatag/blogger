"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { AuthorData, PostData } from "@/lib/types";
import { PostCard } from "../post-card";
import { Separator } from "../ui/separator";
import { MiniPostCard } from "../mini-post-card";
import { Skeleton } from "../ui/skeleton";

interface IAuthorPostsColumnProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  author: AuthorData | undefined;
  posts: PostData[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  variant: "normal" | "mini";
  cardClassName?: string;
  separator?: boolean;
  canEdit?: boolean;
}

const AuthorPostsColumn = React.forwardRef<
  HTMLDivElement,
  IAuthorPostsColumnProps
>(
  (
    {
      author,
      posts,
      variant,
      isLoading = true,
      isSuccess = false,
      className,
      cardClassName,
      separator = true,
      canEdit = false,
    },
    ref
  ) => {
    return (
      <div className={cn(className)} ref={ref}>
        {isLoading &&
          [...Array(6).keys()].map(() =>
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
          author &&
          posts?.map((post) =>
            variant === "normal" ? (
              <React.Fragment key={post.id}>
                <PostCard
                  id={post.id}
                  authorAvatar={
                    author?.image ?? "https://avatar.iran.liara.run/public"
                  }
                  authorName={author.name}
                  authorUrl={`/authors/${author.id}`}
                  title={post.title}
                  url={`/authors/${author?.id}/${post.slug}`}
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
                  published={post.published}
                  {...(canEdit && {
                    editUrl: `/my-account/edit-post/${post.id}`,
                  })}
                />
                {separator && <Separator className="mt-8" />}
              </React.Fragment>
            ) : (
              <MiniPostCard
                key={post.id}
                id={post.id}
                authorAvatar={
                  author?.image ?? "https://avatar.iran.liara.run/public"
                }
                authorName={author?.name}
                authorUrl={`/authors/${author.id}`}
                title={post.title}
                url={`/authors/${author.id}/${post.slug}`}
                likes={post.likes}
                className={cn("mt-8", cardClassName)}
              />
            )
          )}
      </div>
    );
  }
);

AuthorPostsColumn.displayName = "AuthorPostsColumn";

export { AuthorPostsColumn };
