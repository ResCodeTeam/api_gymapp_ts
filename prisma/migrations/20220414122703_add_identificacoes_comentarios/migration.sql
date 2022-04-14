-- CreateTable
CREATE TABLE "identificacoes_comentarios" (
    "identificacao_id" TEXT NOT NULL,
    "comentario_id" TEXT NOT NULL,
    "usersuid" TEXT NOT NULL,

    CONSTRAINT "identificacoes_comentarios_pkey" PRIMARY KEY ("identificacao_id")
);

-- AddForeignKey
ALTER TABLE "identificacoes_comentarios" ADD CONSTRAINT "fkidenticoment298313" FOREIGN KEY ("comentario_id") REFERENCES "comentarios_publicacao"("comentario_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "identificacoes_comentarios" ADD CONSTRAINT "fkidenticoment401249" FOREIGN KEY ("usersuid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
