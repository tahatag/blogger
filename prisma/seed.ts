import { categories, defaultEditorContentFA } from "../lib/constants";
import { PrismaClient } from "@prisma/client";
import { fakerFA as faker } from "@faker-js/faker";
import { toSnakeCase } from "../lib/utils";

const prisma = new PrismaClient();
async function main() {
  const existingCategories = await prisma.category.findMany();

  if (existingCategories.length === 0) {
    const categoryNames = categories.map((category) => ({ name: category }));
    await prisma.category.createMany({
      data: categoryNames,
    });
  }

  const allCategories = await prisma.category.findMany();

  const users = Array.from({ length: 50 }).map(() => {
    const randomHasProfilePicture = Math.floor(Math.random() * 10) > 0;
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: randomHasProfilePicture ? faker.image.avatar() : null,
      emailVerified: faker.datatype.boolean() ? faker.date.past() : null,
    };
  });
  
  await prisma.user.createMany({ data: users });

  const allUsers = await prisma.user.findMany();

  const posts = await Promise.all(
    Array.from({ length: 250 }).map(async () => {
      const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
      const randomCategory =
        allCategories[Math.floor(Math.random() * allCategories.length)];
      const randomHasCover = Math.floor(Math.random() * 10) > 0;
      const randomTitle = faker.lorem.sentence({ min: 3, max: 18 });
      const randomSlug = toSnakeCase(randomTitle);

      return prisma.post.create({
        data: {
          title: randomTitle,
          slug: randomSlug,
          description: faker.lorem.paragraph(),
          content: JSON.stringify(defaultEditorContentFA),
          cover: randomHasCover ? faker.image.url() : null,
          published: faker.datatype.boolean(),
          authorId: randomUser.id,
          categoryId: randomCategory.id,
          createdAt: faker.date.past(),
        },
      });
    })
  );

  for (const post of posts) {
    const likedUsers = faker.helpers.arrayElements(
      allUsers,
      Math.floor(Math.random() * 45)
    );
    for (const user of likedUsers) {
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      });
    }
  }

  for (const post of posts) {
    const bookmarkedUsers = faker.helpers.arrayElements(
      allUsers,
      Math.floor(Math.random() * 20)
    );
    for (const user of bookmarkedUsers) {
      await prisma.bookmark.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      });
    }
  }

  console.log(`Database has been seeded. 🌱`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
