import { auth } from "@/auth";
import { getServerTranslations } from "@/i18n/server";
import { prisma } from "@/prisma";
import { PostRequest, RawPostData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";
import { getPrismaErrorMessage, toSnakeCase, transformPost } from "@/lib/utils";
import { postDataInclude, postDataOmit } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const count = searchParams.get("count");
  const page = searchParams.get("page");
  const order = searchParams.get("order");
  const direction = searchParams.get("direction");
  const author = searchParams.get("author");

  const countNum = count ? parseInt(count, 10) : 6;
  const pageNum = page ? parseInt(page, 10) : 1;
  const orderBy = order ?? "createdAt";
  const orderDirection = direction ? (direction as "asc" | "desc") : "desc";
  const authorId = author ?? null;

  const { t } = await getServerTranslations("post");

  const session = await auth();

  try {
    const posts = await prisma.post.findMany({
      take: countNum,
      skip: (pageNum - 1) * countNum,
      orderBy: {
        ...(orderBy === "likes"
          ? {
              likedBy: {
                _count: orderDirection,
              },
            }
          : {
              createdAt: orderDirection,
            }),
      },
      where: {
        ...(authorId && { authorId }),
        published: true,
      },
      include: postDataInclude(session?.user?.id),
      omit: postDataOmit,
    });

    const formattedPosts = posts.map((post) =>
      transformPost(post as RawPostData)
    );

    return NextResponse.json(
      { message: null, posts: formattedPosts, count: countNum, page: pageNum },
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

export async function POST(req: NextRequest) {
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

  const data: PostRequest = parse.data;

  try {
    const selectedCategory = await prisma.category.findFirst({
      where: {
        name: data.category,
      },
    });

    if (!selectedCategory?.id) {
      return NextResponse.json(
        { errors: { failed: t("errors.failed") } },
        { status: 500 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: toSnakeCase(data.title),
        categoryId: selectedCategory.id,
        authorId: session.user.id as string,
        content: data.content ?? "",
        description: data.description,
        published: data.published,
        ...(data.cover && { cover: data.cover }),
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
