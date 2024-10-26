"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import { changeLiked } from "@/app/actions/post";

interface IMiniPostCardProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  authorAvatar: string;
  authorName: string;
  authorUrl: string;
  title: string;
  url: string;
  likes: number;
}

const MiniPostCard = React.forwardRef<HTMLDivElement, IMiniPostCardProps>(
  (
    { authorAvatar, authorName, authorUrl, title, url, likes, className },
    ref
  ) => {
    return (
      <div className={cn("flex-col gap-12", className)} ref={ref}>
        <div className="flex justify-between gap-2">
          <Link
            href={authorUrl}
            className="flex gap-2 items-center hover:underline"
          >
            <Avatar className="w-4 h-4 border-white/50 border-3">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback>{authorName.split("")[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm line-clamp-1">{authorName}</p>
          </Link>
          <div className="flex gap-1 items-center">
            <p className="text-sm leading-none">{likes}</p>
            <ThumbsUp size={14} />
          </div>
        </div>
        <Link href={url}>
          <h3 className="mt-2 text-lg font-black line-clamp-2">{title}</h3>
        </Link>
      </div>
    );
  }
);

MiniPostCard.displayName = "MiniPostCard";

export { MiniPostCard };
