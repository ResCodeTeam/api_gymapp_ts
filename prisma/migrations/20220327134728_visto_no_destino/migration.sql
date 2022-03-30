/*
  Warnings:

  - You are about to drop the column `visto` on the `notificacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "destinos_notificacao" ADD COLUMN     "visto" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "notificacoes" DROP COLUMN "visto";
