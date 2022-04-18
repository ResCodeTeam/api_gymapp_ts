-- DropForeignKey
ALTER TABLE "local_medidas_marca" DROP CONSTRAINT "fklocal_medi780121";

-- AddForeignKey
ALTER TABLE "local_medidas_marca" ADD CONSTRAINT "fklocal_medi780121" FOREIGN KEY ("local_medida_id") REFERENCES "locais_medidas"("local_medida_id") ON DELETE CASCADE ON UPDATE NO ACTION;
