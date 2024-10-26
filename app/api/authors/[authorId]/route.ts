import { auth } from "@/auth";
import { getServerTranslations } from "@/i18n/server";
import { prisma } from "@/prisma";
import { RawAuthorData, RawPostData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import {
  getPrismaErrorMessage,
  transformAuhor,
  transformPost,
} from "@/lib/utils";
import { postDataInclude, postDataOmit } from "@/lib/constants";

export async function GET(
  req: NextRequest,
  { params }: { params: { authorId: string } }
) {
  const { t } = await getServerTranslations("post");

  const session = await auth();

  try {
    const totalLikes = await prisma.like.count({
      where: {
        post: {
          authorId: params.authorId,
        },
      },
    });

    const author = await prisma.user.findFirst({
      where: {
        id: {
          equals: params.authorId,
        },
      },
      include: {
        posts: {
          include: postDataInclude(session?.user?.id),
          omit: postDataOmit,
          where: {
            published: true,
          },
        },
      },
      omit: {
        emailVerified: true,
        email: true,
      },
    });

    if (!author || !totalLikes) {
      return NextResponse.json(
        { errors: { failed: t("author.errors.not-found") } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: null,
        author: transformAuhor({ ...author, totalLikes } as RawAuthorData),
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const error = getPrismaErrorMessage(e);
      return NextResponse.json(
        { errors: { failed: t("author.errors.failed") } },
        { status: error.httpStatus }
      );
    }
    return NextResponse.json(
      { errors: { failed: t("author.errors.failed") } },
      { status: 500 }
    );
  }
}
