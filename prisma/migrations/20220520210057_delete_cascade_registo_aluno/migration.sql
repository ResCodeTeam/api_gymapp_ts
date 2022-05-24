-- DropForeignKey
ALTER TABLE "aluno_ginasio" DROP CONSTRAINT "fkaluno_gina239330";

-- DropForeignKey
ALTER TABLE "alunos_marca" DROP CONSTRAINT "fkalunos_mar464475";

-- DropForeignKey
ALTER TABLE "definicoes_user" DROP CONSTRAINT "definicoes_user_usersuid_fkey";

-- AddForeignKey
ALTER TABLE "aluno_ginasio" ADD CONSTRAINT "fkaluno_gina239330" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alunos_marca" ADD CONSTRAINT "fkalunos_mar464475" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "definicoes_user" ADD CONSTRAINT "definicoes_user_usersuid_fkey" FOREIGN KEY ("usersuid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;
