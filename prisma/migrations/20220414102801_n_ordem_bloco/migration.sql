/*
  Warnings:

  - You are about to drop the `Exercicio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Modalidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blocos_treino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercicio" DROP CONSTRAINT "fkexercicios806183";

-- DropForeignKey
ALTER TABLE "Modalidade" DROP CONSTRAINT "fkmodalidade839982";

-- DropForeignKey
ALTER TABLE "blocos_treino" DROP CONSTRAINT "fkbloco_trei396073";

-- DropForeignKey
ALTER TABLE "desafios" DROP CONSTRAINT "fkdesafios433214";

-- DropForeignKey
ALTER TABLE "exercicios_bloco" DROP CONSTRAINT "fkexercicios619094";

-- DropForeignKey
ALTER TABLE "exercicios_bloco" DROP CONSTRAINT "fkexercicios561801";

-- DropForeignKey
ALTER TABLE "exercicios_desafio" DROP CONSTRAINT "fkexercicios394574";

-- DropForeignKey
ALTER TABLE "exercicios_imagens" DROP CONSTRAINT "fkexercicios255336";

-- DropForeignKey
ALTER TABLE "exercicios_musculos" DROP CONSTRAINT "fkexercicios823659";

-- DropForeignKey
ALTER TABLE "planos_treino" DROP CONSTRAINT "fkplanos_tre425229";

-- DropForeignKey
ALTER TABLE "treinos" DROP CONSTRAINT "fktreinos7075";

-- DropTable
DROP TABLE "Exercicio";

-- DropTable
DROP TABLE "Modalidade";

-- DropTable
DROP TABLE "blocos_treino";

-- CreateTable
CREATE TABLE "bloco_treino" (
    "bloco_id" TEXT NOT NULL,
    "plano_treino_id" TEXT NOT NULL,
    "n_ordem" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "bloco_treino_pkey" PRIMARY KEY ("bloco_id")
);

-- CreateTable
CREATE TABLE "exercicios" (
    "exercicio_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "autor_id" TEXT NOT NULL,
    "is_tempo" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "exercicios_pkey" PRIMARY KEY ("exercicio_id")
);

-- CreateTable
CREATE TABLE "modalidades_ginasio" (
    "modalidade_id" TEXT NOT NULL,
    "ginasio_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "imagem_url" VARCHAR(255) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "modalidades_ginasio_pkey" PRIMARY KEY ("modalidade_id")
);

-- AddForeignKey
ALTER TABLE "bloco_treino" ADD CONSTRAINT "fkbloco_trei396073" FOREIGN KEY ("plano_treino_id") REFERENCES "planos_treino"("plano_treino_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "fkdesafios433214" FOREIGN KEY ("modalidade_id") REFERENCES "modalidades_ginasio"("modalidade_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios" ADD CONSTRAINT "fkexercicios806183" FOREIGN KEY ("autor_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_bloco" ADD CONSTRAINT "fkexercicios619094" FOREIGN KEY ("bloco_id") REFERENCES "bloco_treino"("bloco_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_bloco" ADD CONSTRAINT "fkexercicios561801" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_desafio" ADD CONSTRAINT "fkexercicios394574" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_imagens" ADD CONSTRAINT "fkexercicios255336" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_musculos" ADD CONSTRAINT "fkexercicios823659" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modalidades_ginasio" ADD CONSTRAINT "fkmodalidade839982" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planos_treino" ADD CONSTRAINT "fkplanos_tre425229" FOREIGN KEY ("modalidade_id") REFERENCES "modalidades_ginasio"("modalidade_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "fktreinos7075" FOREIGN KEY ("modalidade_id") REFERENCES "modalidades_ginasio"("modalidade_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
