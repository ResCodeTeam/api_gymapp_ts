-- AlterTable
ALTER TABLE "agendamentos_avaliacoes" ALTER COLUMN "data_agendamento" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "agendamentos_desafios" ALTER COLUMN "data_agendamento" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "avaliacoes" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "comentarios_publicacao" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "desafios" ALTER COLUMN "data_inicio" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "data_fim" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "notificacoes" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "publicacoes" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "treinos" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3);
