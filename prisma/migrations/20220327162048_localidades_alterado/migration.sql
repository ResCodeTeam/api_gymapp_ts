/*
  Warnings:

  - You are about to drop the column `estado` on the `atividades` table. All the data in the column will be lost.
  - You are about to drop the column `identificações` on the `definicoes_user` table. All the data in the column will be lost.
  - The `is_privado` column on the `definicoes_user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mencoes` column on the `definicoes_user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `visto` column on the `destinos_notificacao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `identificacoes_publicacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `identificação_id` on the `identificacoes_publicacoes` table. All the data in the column will be lost.
  - The primary key for the `localidades` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estado` on the `modalidades_ginasio` table. All the data in the column will be lost.
  - You are about to drop the column `imgurl` on the `musculos` table. All the data in the column will be lost.
  - The `estado` column on the `planos_treino` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `local_medidas_ginásio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `localidades_ext` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `is_tempo` on the `exercicios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `identificacao_id` was added to the `identificacoes_publicacoes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `unilado` on the `locais_medidas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `cp_ext` to the `localidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `localidades` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `mobilidade` on the `marcas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `img_url` to the `musculos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ginasio" DROP CONSTRAINT "fkginasio942118";

-- DropForeignKey
ALTER TABLE "ginasio" DROP CONSTRAINT "fkginasio512603";

-- DropForeignKey
ALTER TABLE "local_medidas_ginásio" DROP CONSTRAINT "fklocal_medi973208";

-- DropForeignKey
ALTER TABLE "local_medidas_ginásio" DROP CONSTRAINT "fklocal_medi780121";

-- DropForeignKey
ALTER TABLE "localidades_ext" DROP CONSTRAINT "fklocalidade616869";

-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "estado";

-- AlterTable
ALTER TABLE "definicoes_user" DROP COLUMN "identificações",
ADD COLUMN     "identificacoes" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "is_privado",
ADD COLUMN     "is_privado" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "mencoes",
ADD COLUMN     "mencoes" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "destinos_notificacao" DROP COLUMN "visto",
ADD COLUMN     "visto" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "exercicios" DROP COLUMN "is_tempo",
ADD COLUMN     "is_tempo" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "identificacoes_publicacoes" DROP CONSTRAINT "identificacoes_publicacoes_pkey",
DROP COLUMN "identificação_id",
ADD COLUMN     "identificacao_id" TEXT NOT NULL,
ADD CONSTRAINT "identificacoes_publicacoes_pkey" PRIMARY KEY ("identificacao_id");

-- AlterTable
ALTER TABLE "locais_medidas" DROP COLUMN "unilado",
ADD COLUMN     "unilado" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "localidades" DROP CONSTRAINT "localidades_pkey",
ADD COLUMN     "cp_ext" INTEGER NOT NULL,
ADD COLUMN     "rua" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "localidades_pkey" PRIMARY KEY ("cp", "cp_ext");

-- AlterTable
ALTER TABLE "marcas" DROP COLUMN "mobilidade",
ADD COLUMN     "mobilidade" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "modalidades_ginasio" DROP COLUMN "estado";

-- AlterTable
ALTER TABLE "musculos" DROP COLUMN "imgurl",
ADD COLUMN     "img_url" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "planos_treino" DROP COLUMN "estado",
ADD COLUMN     "estado" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "local_medidas_ginásio";

-- DropTable
DROP TABLE "localidades_ext";

-- CreateTable
CREATE TABLE "local_medidas_ginasio" (
    "local_medida_id" TEXT NOT NULL,
    "ginasio_id" TEXT NOT NULL,

    CONSTRAINT "local_medidas_ginasio_pkey" PRIMARY KEY ("local_medida_id","ginasio_id")
);

-- AddForeignKey
ALTER TABLE "ginasio" ADD CONSTRAINT "fkginasio942118" FOREIGN KEY ("cp", "cp_ext") REFERENCES "localidades"("cp", "cp_ext") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "local_medidas_ginasio" ADD CONSTRAINT "fklocal_medi973208" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "local_medidas_ginasio" ADD CONSTRAINT "fklocal_medi780121" FOREIGN KEY ("local_medida_id") REFERENCES "locais_medidas"("local_medida_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
