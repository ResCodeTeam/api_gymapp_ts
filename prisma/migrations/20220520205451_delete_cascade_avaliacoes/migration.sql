-- DropForeignKey
ALTER TABLE "avaliacao_imagens" DROP CONSTRAINT "fkavaliacao_266291";

-- DropForeignKey
ALTER TABLE "medidas_avaliacao" DROP CONSTRAINT "fkmedidas_av747581";

-- AddForeignKey
ALTER TABLE "avaliacao_imagens" ADD CONSTRAINT "fkavaliacao_266291" FOREIGN KEY ("avaliacao_id") REFERENCES "avaliacoes"("avaliacao_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medidas_avaliacao" ADD CONSTRAINT "fkmedidas_av747581" FOREIGN KEY ("avaliacao_id") REFERENCES "avaliacoes"("avaliacao_id") ON DELETE CASCADE ON UPDATE NO ACTION;
