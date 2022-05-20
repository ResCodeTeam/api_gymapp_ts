-- DropForeignKey
ALTER TABLE "agendamentos_desafios" DROP CONSTRAINT "fkagendament612576";

-- DropForeignKey
ALTER TABLE "exercicios_desafio" DROP CONSTRAINT "fkexercicios16333";

-- DropForeignKey
ALTER TABLE "regras_desafio" DROP CONSTRAINT "fkregras_des827169";

-- DropForeignKey
ALTER TABLE "submissoes_desafios" DROP CONSTRAINT "fksubmissoes619296";

-- AddForeignKey
ALTER TABLE "agendamentos_desafios" ADD CONSTRAINT "fkagendament612576" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_desafio" ADD CONSTRAINT "fkexercicios16333" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regras_desafio" ADD CONSTRAINT "fkregras_des827169" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submissoes_desafios" ADD CONSTRAINT "fksubmissoes619296" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE CASCADE ON UPDATE NO ACTION;
