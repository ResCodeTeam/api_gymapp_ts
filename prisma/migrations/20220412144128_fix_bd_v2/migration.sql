/*
  Warnings:

  - You are about to drop the column `estado` on the `agendamentos_avaliacoes` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `agendamentos_desafios` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `desafios` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `ginasio` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `planos_treino` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `series_desafio` table. All the data in the column will be lost.
  - You are about to drop the column `repeticoes` on the `series_desafio` table. All the data in the column will be lost.
  - You are about to drop the column `unidade_medida` on the `series_desafio` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `series_exercicio` table. All the data in the column will be lost.
  - You are about to drop the column `unidade_medida` on the `series_exercicio` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `submissoes_desafios` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usersuid]` on the table `definicoes_user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "definicoes_user" DROP CONSTRAINT "fkdefinicoes764689";

-- AlterTable
ALTER TABLE "agendamentos_avaliacoes" DROP COLUMN "estado",
ADD COLUMN     "isAceite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "agendamentos_desafios" DROP COLUMN "estado",
ADD COLUMN     "isAceite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "desafios" DROP COLUMN "estado",
ADD COLUMN     "isEncerrado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ginasio" DROP COLUMN "estado";

-- AlterTable
ALTER TABLE "planos_treino" DROP COLUMN "estado",
ADD COLUMN     "isRealizado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "series_desafio" DROP COLUMN "peso",
DROP COLUMN "repeticoes",
DROP COLUMN "unidade_medida",
ADD COLUMN     "valor" VARCHAR(255);

-- AlterTable
ALTER TABLE "series_exercicio" DROP COLUMN "peso",
DROP COLUMN "unidade_medida",
ALTER COLUMN "valor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "submissoes_desafios" DROP COLUMN "estado";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "estado";

-- CreateIndex
CREATE UNIQUE INDEX "definicoes_user_usersuid_key" ON "definicoes_user"("usersuid");

-- AddForeignKey
ALTER TABLE "definicoes_user" ADD CONSTRAINT "definicoes_user_usersuid_fkey" FOREIGN KEY ("usersuid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
