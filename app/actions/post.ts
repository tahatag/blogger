"use server";

import { auth } from "@/auth";
import { getServerTranslations } from "@/i18n/server";
import { prisma } from "@/prisma";
import { toast } from "sonner";

export async function changeBookmarked(postId: string, bookmarked: boolean) {
  const { t } = await getServerTranslations("post");
  const session = await auth();

  if (!session?.user) {
    toast(t("errors.auth"));
    return bookmarked;
  }

  const bookmark =
    (await prisma.bookmark.findFirst({
      where: {
        postId,
        userId: session.user.id as string,
      },
    })) ?? false;

  try {
    if (!bookmark) {
      await prisma.bookmark.create({
        data: {
          postId,
          userId: session.user.id as string,
        },
      });

      return true;
    } else {
      await prisma.bookmark.delete({
        where: {
          userId_postId: {
            postId: postId,
            userId: session.user.id as string,
          },
        },
      });

      return false;
    }
  } catch (e) {
    toast(t("errors.general"));
  }

  return !bookmark;
}

export async function changeLiked(postId: string, liked: boolean) {
  const { t } = await getServerTranslations("post");
  const session = await auth();

  if (!session?.user) {
    toast(t("errors.auth"));
    return liked;
  }

  const like =
    (await prisma.like.findFirst({
      where: {
        postId,
        userId: session.user.id as string,
      },
    })) ?? false;

  try {
    if (!like) {
      await prisma.like.create({
        data: {
          postId,
          userId: session.user.id as string,
        },
      });

      return true;
    } else {
      await prisma.like.delete({
        where: {
          userId_postId: {
            postId: postId,
            userId: session.user.id as string,
          },
        },
      });

      return false;
    }
  } catch (e) {
    toast(t("errors.general"));
  }

  return !liked;
}
