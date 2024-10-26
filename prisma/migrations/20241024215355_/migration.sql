/*
  Warnings:

  - You are about to drop the column `slug` on the `users` table. All the data in the column will be lost.
  - Made the column `slug` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "slug";
