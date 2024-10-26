import { auth } from "@/auth";
import { getServerTranslations } from "@/i18n/server";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getPrismaErrorMessage, transformAccount } from "@/lib/utils";
import { postDataInclude, postDataOmit } from "@/lib/constants";

export async function GET() {
  const { t } = await getServerTranslations("common");

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { errors: { auth: t("user.errors.auth") } },
      { status: 403 }
    );
  }

  try {
    const totalLikes = await prisma.like.count({
      where: {
        post: {
          authorId: session.user.id,
        },
      },
    });

    const account = await prisma.user.findFirst({
      where: {
        id: {
          equals: session.user.id,
        },
      },
      include: {
        likes: {
          where: {
            post: {
              published: true,
            },
          },
          include: {
            post: {
              include: postDataInclude(session?.user?.id),
              omit: postDataOmit,
            },
          },
          omit: {
            postId: true,
            userId: true,
          },
        },
        bookmarks: {
          where: {
            post: {
              published: true,
            },
          },
          include: {
            post: {
              include: postDataInclude(session?.user?.id),
              omit: postDataOmit,
            },
          },
          omit: {
            postId: true,
            userId: true,
          },
        },
        posts: {
          include: postDataInclude(session?.user?.id),
          omit: postDataOmit,
        },
      },
    });

    if (!account) {
      return NextResponse.json(
        { errors: { failed: t("user.errors.failed") } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: null,
        account: transformAccount({ ...account, totalLikes }),
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const error = getPrismaErrorMessage(e);
      return NextResponse.json(
        { errors: { failed: t("user.errors.failed") } },
        { status: error.httpStatus }
      );
    }
    return NextResponse.json(
      { errors: { failed: t("user.errors.failed") } },
      { status: 500 }
    );
  }
}
