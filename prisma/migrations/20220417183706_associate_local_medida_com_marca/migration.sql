/*
  Warnings:

  - You are about to drop the `local_medidas_ginasio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "local_medidas_ginasio" DROP CONSTRAINT "fklocal_medi973208";

-- DropForeignKey
ALTER TABLE "local_medidas_ginasio" DROP CONSTRAINT "fklocal_medi780121";

-- DropTable
DROP TABLE "local_medidas_ginasio";

-- CreateTable
CREATE TABLE "local_medidas_marca" (
    "local_medida_id" TEXT NOT NULL,
    "marca_id" TEXT NOT NULL,

    CONSTRAINT "local_medidas_marca_pkey" PRIMARY KEY ("local_medida_id","marca_id")
);

-- AddForeignKey
ALTER TABLE "local_medidas_marca" ADD CONSTRAINT "fklocal_medi780121" FOREIGN KEY ("local_medida_id") REFERENCES "locais_medidas"("local_medida_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "local_medidas_marca" ADD CONSTRAINT "fklocal_medi973208" FOREIGN KEY ("marca_id") REFERENCES "marcas"("marca_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
