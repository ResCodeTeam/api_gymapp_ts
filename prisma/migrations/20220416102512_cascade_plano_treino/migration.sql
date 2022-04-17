-- DropForeignKey
ALTER TABLE "bloco_treino" DROP CONSTRAINT "fkbloco_trei396073";

-- DropForeignKey
ALTER TABLE "exercicios_bloco" DROP CONSTRAINT "fkexercicios619094";

-- DropForeignKey
ALTER TABLE "series_exercicio" DROP CONSTRAINT "fkseries_exe489955";

-- AddForeignKey
ALTER TABLE "bloco_treino" ADD CONSTRAINT "fkbloco_trei396073" FOREIGN KEY ("plano_treino_id") REFERENCES "planos_treino"("plano_treino_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_bloco" ADD CONSTRAINT "fkexercicios619094" FOREIGN KEY ("bloco_id") REFERENCES "bloco_treino"("bloco_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "series_exercicio" ADD CONSTRAINT "fkseries_exe489955" FOREIGN KEY ("exercicios_bloco_id") REFERENCES "exercicios_bloco"("exercicios_bloco_id") ON DELETE CASCADE ON UPDATE NO ACTION;
