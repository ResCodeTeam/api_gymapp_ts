/*
  Warnings:

  - You are about to drop the column `cp` on the `ginasio` table. All the data in the column will be lost.
  - The primary key for the `localidades` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `cp_id` to the `ginasio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cp_ext` to the `localidades` table without a default value. This is not possible if the table is not empty.
  - The required column `cp_id` was added to the `localidades` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `cp` on the `localidades` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ginasio" DROP CONSTRAINT "fkginasio942118";

-- AlterTable
ALTER TABLE "ginasio" DROP COLUMN "cp",
ADD COLUMN     "cp_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "localidades" DROP CONSTRAINT "localidades_pkey",
ADD COLUMN     "cp_ext" INTEGER NOT NULL,
ADD COLUMN     "cp_id" TEXT NOT NULL,
DROP COLUMN "cp",
ADD COLUMN     "cp" INTEGER NOT NULL,
ADD CONSTRAINT "localidades_pkey" PRIMARY KEY ("cp_id");

-- AddForeignKey
ALTER TABLE "ginasio" ADD CONSTRAINT "fkginasio942118" FOREIGN KEY ("cp_id") REFERENCES "localidades"("cp_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
