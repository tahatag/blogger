import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";
import { RawAccountData, RawAuthorData, RawPostData } from "./types";
import { QueryError } from "./constants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toSnakeCase = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, "-");
};

export const transformPost = (post: RawPostData) => {
  const postTransformed = {
    ...post,
    likes: post._count.likedBy,
    liked: post.likedBy.length > 0,
    bookmarked: post.bookmarkedBy.length > 0,
    category: post.category.name,
  };

  // eslint-disable-next-line
  const { _count, likedBy, bookmarkedBy, ...postData } = postTransformed;

  return postData;
};

export const transformAuhor = (author: RawAuthorData) => {
  const { posts, ...rest } = author;
  const postsTransformed = posts.map((post) => transformPost(post));

  const authorTransformed = { ...rest, posts: postsTransformed };

  return authorTransformed;
};

export const transformAccount = (account: RawAccountData) => {
  const { posts, likes, bookmarks, ...rest } = account;
  const postsTransformed = posts.map((post) => transformPost(post));
  const likesTransformed = likes.map((like) => transformPost(like.post));
  const bookmarksTransformed = bookmarks.map((bookmark) =>
    transformPost(bookmark.post)
  );

  const accountTransformed = {
    ...rest,
    posts: postsTransformed,
    likes: likesTransformed,
    bookmarks: bookmarksTransformed,
  };

  return accountTransformed;
};

export const getPrismaErrorMessage = (
  prismaError: Prisma.PrismaClientKnownRequestError
) => {
  const errorCode = QueryError.get(prismaError.code);
  if (!errorCode) {
    return {
      httpStatus: 500,
    };
  }
  return {
    httpStatus: errorCode,
  };
};
