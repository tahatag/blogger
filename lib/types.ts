import { categories } from "@/lib/constants";

export type RawPostData = {
  id: string;
  category: {
    name: string;
  };
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  likedBy: {
    userId: string;
  }[];
  bookmarkedBy: {
    userId: string;
  }[];
  _count: { likedBy: number };
  content: string;
  cover: string | null;
  description: string;
  published: boolean;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostData = {
  id: string;
  liked: boolean;
  bookmarked: boolean;
  category: string;
  slug: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  likes: number;
  content: string;
  cover: string | null;
  description: string;
  published: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RawAuthorData = {
  id: string;
  name: string;
  image: string | null;
  posts: RawPostData[];
  totalLikes: number;
  createdAt: Date;
};

export type AuthorData = {
  id: string;
  name: string;
  image: string | null;
  posts: PostData[];
  totalLikes: number;
  createdAt: Date;
};

export type RawAccountData = {
  createdAt: Date;
  email: string;
  emailVerified: Date | null;
  id: string;
  image: string | null;
  name: string;
  posts: RawPostData[];
  bookmarks: { post: RawPostData }[];
  likes: { post: RawPostData }[];
  totalLikes: number;
};

export type AccountData = {
  createdAt: Date;
  email: string;
  emailVerified: Date | null;
  id: string;
  image: string | null;
  name: string;
  posts: PostData[];
  bookmarks: PostData[];
  likes: PostData[];
  totalLikes: number;
};

export type PostRequest = {
  title: string;
  description: string;
  category: (typeof categories)[number];
  content?: string;
  cover?: string;
  published?: boolean;
};

export type ErrorResponse = {
  errors: { [key: string]: string[] };
};
