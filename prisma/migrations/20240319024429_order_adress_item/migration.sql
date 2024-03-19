/*
  Warnings:

  - You are about to drop the column `orderAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Order` table. All the data in the column will be lost.
  - Added the required column `subTotal` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderAddressId",
DROP COLUMN "subtotal",
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL;
