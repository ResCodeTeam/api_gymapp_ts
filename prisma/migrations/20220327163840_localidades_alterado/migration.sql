/*
  Warnings:

  - You are about to drop the column `cp_ext` on the `ginasio` table. All the data in the column will be lost.
  - The primary key for the `localidades` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cp_ext` on the `localidades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ginasio" DROP CONSTRAINT "fkginasio942118";

-- AlterTable
ALTER TABLE "ginasio" DROP COLUMN "cp_ext",
ALTER COLUMN "cp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "localidades" DROP CONSTRAINT "localidades_pkey",
DROP COLUMN "cp_ext",
ALTER COLUMN "cp" SET DATA TYPE TEXT,
ADD CONSTRAINT "localidades_pkey" PRIMARY KEY ("cp");

-- AddForeignKey
ALTER TABLE "ginasio" ADD CONSTRAINT "fkginasio942118" FOREIGN KEY ("cp") REFERENCES "localidades"("cp") ON DELETE NO ACTION ON UPDATE NO ACTION;
