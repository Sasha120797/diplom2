/*
  Warnings:

  - The primary key for the `_OrderProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserCart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserWishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_OrderProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_UserCart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_UserWishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_OrderProducts" DROP CONSTRAINT "_OrderProducts_AB_pkey";

-- AlterTable
ALTER TABLE "_UserCart" DROP CONSTRAINT "_UserCart_AB_pkey";

-- AlterTable
ALTER TABLE "_UserWishlist" DROP CONSTRAINT "_UserWishlist_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_OrderProducts_AB_unique" ON "_OrderProducts"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserCart_AB_unique" ON "_UserCart"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserWishlist_AB_unique" ON "_UserWishlist"("A", "B");
