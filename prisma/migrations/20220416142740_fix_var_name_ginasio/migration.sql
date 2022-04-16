/*
  Warnings:

  - You are about to drop the column `desricao` on the `ginasio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ginasio" DROP COLUMN "desricao",
ADD COLUMN     "descricao" VARCHAR(255);
