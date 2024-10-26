import { auth } from "@/auth";
import { getServerTranslations } from "@/i18n/server";
import { prisma } from "@/prisma";
import { RawPostData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getPrismaErrorMessage, transformPost } from "@/lib/utils";
import { postDataInclude, postDataOmit } from "@/lib/constants";

export async function GET(
  req: NextRequest,
  { params }: { params: { authorId: string; postSlug: string } }
) {
  const { t } = await getServerTranslations("post");

  const session = await auth();

  try {
    const post = await prisma.post.findFirst({
      where: {
        published: true,
        slug: {
          equals: params.postSlug,
          mode: "insensitive",
        },
        author: {
          id: {
            equals: params.authorId,
          },
        },
      },
      include: postDataInclude(session?.user?.id),
      omit: postDataOmit,
    });

    if (!post) {
      return NextResponse.json(
        { errors: { failed: t("errors.not-found") } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: null, post: transformPost(post as RawPostData) },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const error = getPrismaErrorMessage(e);
      return NextResponse.json(
        { errors: { failed: t("errors.failed") } },
        { status: error.httpStatus }
      );
    }
    return NextResponse.json(
      { errors: { failed: t("errors.failed") } },
      { status: 500 }
    );
  }
}
