/*
  Warnings:

  - Added the required column `color` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "color" TEXT NOT NULL;
