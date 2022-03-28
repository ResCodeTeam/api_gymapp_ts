-- AlterTable
ALTER TABLE "agendamentos_avaliacoes" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "agendamentos_desafios" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "avaliacoes" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "desafios" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "exercicios" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ginasio" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "marcas" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "planos_treino" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "publicacoes" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "treinos" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
