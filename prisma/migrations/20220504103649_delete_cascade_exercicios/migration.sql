-- DropForeignKey
ALTER TABLE "exercicios" DROP CONSTRAINT "fkexercicios806183";

-- AddForeignKey
ALTER TABLE "exercicios" ADD CONSTRAINT "fkexercicios806183" FOREIGN KEY ("autor_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;
