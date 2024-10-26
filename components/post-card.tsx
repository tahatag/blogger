"use client";

import { Bookmark, Loader2Icon, Pencil, ThumbsUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { changeBookmarked, changeLiked } from "@/app/actions/post";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { t } from "i18next";

interface IPostCardProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  id: string;
  authorAvatar: string;
  authorName: string;
  authorUrl: string;
  title: string;
  url: string;
  description: string;
  date: Date;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  cover: string;
  editUrl?: string;
  published?: boolean;
}

const PostCard = React.forwardRef<HTMLDivElement, IPostCardProps>(
  (
    {
      className,
      id,
      authorAvatar,
      authorName,
      authorUrl,
      title,
      url,
      description,
      date,
      likes,
      liked,
      bookmarked,
      cover,
      editUrl,
      published,
    },
    ref
  ) => {
    const { i18n } = useTranslation("common");

    const [likeCount, setLikeCount] = useState(likes);
    const [likeLoading, setLikeLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(liked);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);

    const toggleLike = async () => {
      setLikeLoading(true);
      const newLikeStatus = await changeLiked(id, isLiked);
      setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);
      setIsLiked(newLikeStatus);
      setLikeLoading(false);
    };

    const toggleBookmark = async () => {
      setBookmarkLoading(true);
      const newBookmarkStatus = await changeBookmarked(id, isBookmarked);
      setIsBookmarked(newBookmarkStatus);
      setBookmarkLoading(false);
    };

    const dateTimeFormat = new Intl.DateTimeFormat(
      i18n.resolvedLanguage === "fa" ? "fa-u-ca-persian" : "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );

    const createdAtFormatted = dateTimeFormat.format(new Date(date));

    return (
      <div
        className={cn(
          "flex flex-wrap md:flex-nowrap gap-4 md:gap-12",
          className
        )}
        ref={ref}
      >
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {editUrl ? (
              <Link href={editUrl}>
                <Button
                  className="w-full mb-2 md:mb-4 gap-1"
                  variant="outline"
                  size="sm"
                >
                  <Pencil size={18} /> ویرایش
                </Button>
              </Link>
            ) : (
              <Link
                href={authorUrl}
                className="flex gap-2 items-center hover:underline mb-2 md:mb-4"
              >
                <Avatar className="w-6 h-6 border-white/50 border-3">
                  <AvatarImage src={authorAvatar} />
                  <AvatarFallback>{authorName.split("")[0]}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{authorName}</p>
              </Link>
            )}
            <Link href={url}>
              <h3 className="text-lg md:text-2xl font-black line-clamp-2">
                {title}
              </h3>
            </Link>
            <p className="mt-2 text-sm md:text-base line-clamp-2 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="justify-between hidden md:flex mt-4 md:mt-8 gap-4">
            <div className="flex gap-1 items-center">
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-200">
                {createdAtFormatted}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              {!likeLoading ? (
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={toggleLike}
                >
                  <p
                    className={cn(
                      "text-lg leading-none",
                      isLiked && "text-primary"
                    )}
                  >
                    {likeCount}
                  </p>
                  <ThumbsUp className={cn(isLiked && "text-primary")} />
                </div>
              ) : (
                <Loader2Icon className="animate-spin" />
              )}
              {!bookmarkLoading ? (
                <Bookmark
                  className={cn(
                    "cursor-pointer",
                    isBookmarked && "text-primary fill-primary"
                  )}
                  onClick={toggleBookmark}
                />
              ) : (
                <Loader2Icon className="animate-spin" />
              )}
            </div>
          </div>
        </div>
        <div>
          {editUrl && (
            <Badge
              className={cn(
                "absolute z-[1] -mt-3 -mr-3 hover:bg-primary",
                !published &&
                  "bg-neutral-800 hover:bg-neutral-800 dark:bg-neutral-300 dark:hover:bg-neutral-300 text-neutral-900"
              )}
            >
              {published ? t("published") : t("draft")}
            </Badge>
          )}
          <Link href={url}>
            <div className="w-28 h-28 md:w-48 md:h-48 relative">
              <Image fill alt={title} className="object-cover" src={cover} />
            </div>
          </Link>
        </div>
        <div className="w-full justify-between flex md:hidden mt-4 md:mt-12 gap-4">
          <div className="flex gap-1 items-center">
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-200">
              {createdAtFormatted}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            {!likeLoading ? (
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={toggleLike}
              >
                <p
                  className={cn(
                    "text-lg leading-none",
                    isLiked && "text-primary"
                  )}
                >
                  {likeCount}
                </p>
                <ThumbsUp className={cn(isLiked && "text-primary")} />
              </div>
            ) : (
              <Loader2Icon className="animate-spin" />
            )}
            {!bookmarkLoading ? (
              <Bookmark
                className={cn(
                  "cursor-pointer",
                  isBookmarked && "text-primary fill-primary"
                )}
                onClick={toggleBookmark}
              />
            ) : (
              <Loader2Icon className="animate-spin" />
            )}
          </div>
        </div>
      </div>
    );
  }
);

PostCard.displayName = "PostCard";

export { PostCard };
