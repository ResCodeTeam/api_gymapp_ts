-- DropForeignKey
ALTER TABLE "exercicios_imagens" DROP CONSTRAINT "fkexercicios255336";

-- DropForeignKey
ALTER TABLE "exercicios_musculos" DROP CONSTRAINT "fkexercicios823659";

-- AddForeignKey
ALTER TABLE "exercicios_imagens" ADD CONSTRAINT "fkexercicios255336" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_musculos" ADD CONSTRAINT "fkexercicios823659" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE CASCADE ON UPDATE NO ACTION;
