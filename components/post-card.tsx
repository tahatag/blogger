"use client";

import { Bookmark, ThumbsUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { changeBookmarked, changeLiked } from "@/app/actions/post";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface IPostCardProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  id: string;
  authorAvatar: string;
  authorName: string;
  authorUrl: string;
  title: string;
  url: string;
  description: string;
  date: string;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  cover: string;
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
    },
    ref
  ) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(liked);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);

    const toggleLike = async () => {
      const newLikeStatus = await changeLiked("", isLiked);
      setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);
      setIsLiked(newLikeStatus);
    };

    const toggleBookmark = async () => {
      const newBookmarkStatus = await changeBookmarked("", isBookmarked);
      setIsBookmarked(newBookmarkStatus);
    };

    return (
      <div className={cn("flex gap-12", className)} ref={ref}>
        <div className="flex-1 flex flex-col">
          <div>
            <Link
              href={authorUrl}
              className="flex gap-2 items-center hover:underline"
            >
              <Avatar className="w-6 h-6 border-white/50 border-3">
                <AvatarImage src={authorAvatar} />
                <AvatarFallback>{authorName.split("")[0]}</AvatarFallback>
              </Avatar>
              <p className="text-sm">{authorName}</p>
            </Link>
            <Link href={url}>
              <h3 className="mt-8 text-2xl font-black line-clamp-2">{title}</h3>
            </Link>
            <p className="mt-2 line-clamp-2 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex justify-between mt-12">
            <div className="flex gap-1 items-center">
              <p className=" text-gray-700 dark:text-gray-200">{date}</p>
            </div>
            <div className="flex gap-4">
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
              <Bookmark
                className={cn(
                  "cursor-pointer",
                  isBookmarked && "text-primary"
                )}
                onClick={toggleBookmark}
              />
            </div>
          </div>
        </div>
        <Link href={url}>
          <div className="w-48 h-48 relative">
            <Image fill alt="alt" className="object-cover" src={cover} />
          </div>
        </Link>
      </div>
    );
  }
);

PostCard.displayName = "PostCard";

export { PostCard };
