import { auth } from "@/auth";
import { getServerTranslations } from "@/i18n/server";
import { prisma } from "@/prisma";
import { PostRequest, RawPostData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "@/lib/schema";
import { getPrismaErrorMessage, toSnakeCase, transformPost } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { postDataInclude, postDataOmit } from "@/lib/constants";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { t } = await getServerTranslations("post");

  const session = await auth();

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: params.postId,
        OR: [
          { published: true },
          { authorId: session?.user?.id, published: false },
        ],
      },
      include: postDataInclude(session?.user?.id),
      omit: postDataOmit,
    });

    return NextResponse.json(
      { message: null, post: transformPost(post as RawPostData) },
      { status: 200 }
    );
  } catch (e) {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postData: PostRequest = await req.json();

  const { t } = await getServerTranslations("post");

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { errors: { auth: t("errors.auth") } },
      { status: 403 }
    );
  }

  const schema = postSchema(t);

  const parse = schema.safeParse({
    title: postData.title,
    description: postData.description,
    category: postData.category,
    content: postData.content,
    cover: postData.cover,
    published: postData?.published ?? false,
  });

  if (!parse.success) {
    return NextResponse.json(
      { errors: parse.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data: Partial<PostRequest> = parse.data;

  try {
    const selectedCategory = await prisma.category.findFirst({
      where: {
        name: data.category,
      },
    });

    delete data["category"];

    const post = await prisma.post.update({
      where: {
        id: params.postId,
        authorId: session.user.id,
      },
      data: {
        ...(data as Partial<Omit<PostRequest, "category">>),
        ...(selectedCategory && { categoryId: selectedCategory?.id }),
      },
      include: postDataInclude(session?.user?.id),
      omit: postDataOmit,
    });

    return NextResponse.json(
      { message: t("success"), post: transformPost(post as RawPostData) },
      { status: 200 }
    );
  } catch (e) {
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
