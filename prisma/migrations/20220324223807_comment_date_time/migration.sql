-- CreateTable
CREATE TABLE "agendamentos_avaliacoes" (
    "agendamento_id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "data_agendamento" DATE NOT NULL,
    "estado" INTEGER NOT NULL,
    "ginasio_id" TEXT NOT NULL,

    CONSTRAINT "agendamentos_avaliacoes_pkey" PRIMARY KEY ("agendamento_id")
);

-- CreateTable
CREATE TABLE "agendamentos_desafios" (
    "agendamento_id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "data_agendamento" DATE NOT NULL,
    "estado" INTEGER NOT NULL,
    "desafio_id" TEXT NOT NULL,
    "ginasio_id" TEXT NOT NULL,

    CONSTRAINT "agendamentos_desafios_pkey" PRIMARY KEY ("agendamento_id")
);

-- CreateTable
CREATE TABLE "aluno_ginasio" (
    "user_id" TEXT NOT NULL,
    "ginasio_id" TEXT NOT NULL,

    CONSTRAINT "aluno_ginasio_pkey" PRIMARY KEY ("user_id","ginasio_id")
);

-- CreateTable
CREATE TABLE "alunos_marca" (
    "uid" TEXT NOT NULL,
    "marca_id" TEXT NOT NULL,

    CONSTRAINT "alunos_marca_pkey" PRIMARY KEY ("uid","marca_id")
);

-- CreateTable
CREATE TABLE "atividades" (
    "atividade_id" TEXT NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255) NOT NULL,
    "estado" INTEGER,

    CONSTRAINT "atividades_pkey" PRIMARY KEY ("atividade_id")
);

-- CreateTable
CREATE TABLE "avaliacao_imagens" (
    "imagem_id" TEXT NOT NULL,
    "avaliacao_id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "avaliacao_imagens_pkey" PRIMARY KEY ("imagem_id")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "avaliacao_id" TEXT NOT NULL,
    "aluno_id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "peso" INTEGER NOT NULL,
    "unidade_peso" VARCHAR(255) NOT NULL,
    "treinador_id" TEXT NOT NULL,
    "musculo" INTEGER NOT NULL,
    "gordura_corporal" INTEGER NOT NULL,
    "gordura_visceral" INTEGER NOT NULL,
    "agua" INTEGER NOT NULL,
    "proteina" INTEGER NOT NULL,
    "massa_ossea" INTEGER NOT NULL,
    "metabolismo_basal" INTEGER NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("avaliacao_id")
);

-- CreateTable
CREATE TABLE "bloco_treino" (
    "bloco_id" TEXT NOT NULL,
    "plano_treino_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "bloco_treino_pkey" PRIMARY KEY ("bloco_id")
);

-- CreateTable
CREATE TABLE "comentarios_publicacao" (
    "comentario_id" TEXT NOT NULL,
    "publicacao_id" TEXT NOT NULL,
    "comentario" VARCHAR(255) NOT NULL,
    "criador_id" TEXT NOT NULL,
    "data" TIMESTAMP NOT NULL,

    CONSTRAINT "comentarios_publicacao_pkey" PRIMARY KEY ("comentario_id")
);

-- CreateTable
CREATE TABLE "definicoes_user" (
    "def_id" TEXT NOT NULL,
    "usersuid" TEXT NOT NULL,
    "is_privado" INTEGER NOT NULL DEFAULT 0,
    "identificações" INTEGER NOT NULL DEFAULT 0,
    "mencoes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "definicoes_user_pkey" PRIMARY KEY ("def_id")
);

-- CreateTable
CREATE TABLE "desafios" (
    "desafio_id" TEXT NOT NULL,
    "criador_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "modalidade_id" TEXT NOT NULL,
    "data_inicio" DATE NOT NULL,
    "data_fim" DATE,
    "recompensa" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 0,
    "ginasio_id" TEXT NOT NULL,
    "descricao" VARCHAR(255),

    CONSTRAINT "desafios_pkey" PRIMARY KEY ("desafio_id")
);

-- CreateTable
CREATE TABLE "destinos_notificacao" (
    "noti_id" TEXT NOT NULL,
    "dest_uid" TEXT NOT NULL,

    CONSTRAINT "destinos_notificacao_pkey" PRIMARY KEY ("noti_id","dest_uid")
);

-- CreateTable
CREATE TABLE "exercicios" (
    "exercicio_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "autor_id" TEXT NOT NULL,
    "is_tempo" INTEGER NOT NULL,

    CONSTRAINT "exercicios_pkey" PRIMARY KEY ("exercicio_id")
);

-- CreateTable
CREATE TABLE "exercicios_bloco" (
    "exercicios_bloco_id" TEXT NOT NULL,
    "bloco_id" TEXT NOT NULL,
    "exercicio_id" TEXT NOT NULL,
    "n_ordem_exercicio" INTEGER NOT NULL,

    CONSTRAINT "exercicios_bloco_pkey" PRIMARY KEY ("exercicios_bloco_id")
);

-- CreateTable
CREATE TABLE "exercicios_desafio" (
    "exercicio_desafio_id" TEXT NOT NULL,
    "desafio_id" TEXT NOT NULL,
    "exercicio_id" TEXT NOT NULL,
    "n_ordem_exercicio" INTEGER NOT NULL,
    "genero" INTEGER NOT NULL,

    CONSTRAINT "exercicios_desafio_pkey" PRIMARY KEY ("exercicio_desafio_id")
);

-- CreateTable
CREATE TABLE "exercicios_imagens" (
    "imagem_id" TEXT NOT NULL,
    "exercicio_id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "exercicios_imagens_pkey" PRIMARY KEY ("imagem_id")
);

-- CreateTable
CREATE TABLE "exercicios_musculos" (
    "exercicio_id" TEXT NOT NULL,
    "musculo_id" TEXT NOT NULL,

    CONSTRAINT "exercicios_musculos_pkey" PRIMARY KEY ("exercicio_id","musculo_id")
);

-- CreateTable
CREATE TABLE "funcoes" (
    "funcao_id" TEXT NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "funcoes_pkey" PRIMARY KEY ("funcao_id")
);

-- CreateTable
CREATE TABLE "ginasio" (
    "ginasio_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "rua" VARCHAR(255) NOT NULL,
    "cp" INTEGER NOT NULL,
    "cp_ext" INTEGER NOT NULL,
    "marca_id" TEXT NOT NULL,
    "tag" VARCHAR(255) NOT NULL,
    "desricao" VARCHAR(255),
    "estado" VARCHAR(255) NOT NULL DEFAULT E'0',
    "imagem_url" VARCHAR(255) NOT NULL,
    "lat" VARCHAR(255) NOT NULL,
    "long" VARCHAR(255) NOT NULL,

    CONSTRAINT "ginasio_pkey" PRIMARY KEY ("ginasio_id")
);

-- CreateTable
CREATE TABLE "gostos_comentario" (
    "gosto_id" TEXT NOT NULL,
    "criador_id" TEXT NOT NULL,
    "comentario_id" TEXT NOT NULL,

    CONSTRAINT "gostos_comentario_pkey" PRIMARY KEY ("gosto_id")
);

-- CreateTable
CREATE TABLE "gostos_publicacao" (
    "gosto_id" TEXT NOT NULL,
    "publicacao_id" TEXT NOT NULL,
    "criador_id" TEXT NOT NULL,

    CONSTRAINT "gostos_publicacao_pkey" PRIMARY KEY ("gosto_id")
);

-- CreateTable
CREATE TABLE "identificacoes_publicacoes" (
    "identificação_id" TEXT NOT NULL,
    "publicacao_id" TEXT NOT NULL,
    "usersuid" TEXT NOT NULL,

    CONSTRAINT "identificacoes_publicacoes_pkey" PRIMARY KEY ("identificação_id")
);

-- CreateTable
CREATE TABLE "imagens_publicacao" (
    "imagem_id" TEXT NOT NULL,
    "publicacao_id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "imagens_publicacao_pkey" PRIMARY KEY ("imagem_id")
);

-- CreateTable
CREATE TABLE "locais_medidas" (
    "local_medida_id" TEXT NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "unilado" INTEGER NOT NULL,

    CONSTRAINT "locais_medidas_pkey" PRIMARY KEY ("local_medida_id")
);

-- CreateTable
CREATE TABLE "local_medidas_ginásio" (
    "local_medida_id" TEXT NOT NULL,
    "ginasio_id" TEXT NOT NULL,

    CONSTRAINT "local_medidas_ginásio_pkey" PRIMARY KEY ("local_medida_id","ginasio_id")
);

-- CreateTable
CREATE TABLE "localidades" (
    "cp" INTEGER NOT NULL,
    "localidade" VARCHAR(255) NOT NULL,

    CONSTRAINT "localidades_pkey" PRIMARY KEY ("cp")
);

-- CreateTable
CREATE TABLE "localidades_ext" (
    "cp_ext" INTEGER NOT NULL,
    "cp" INTEGER NOT NULL,
    "localidade" VARCHAR(255) NOT NULL,

    CONSTRAINT "localidades_ext_pkey" PRIMARY KEY ("cp_ext")
);

-- CreateTable
CREATE TABLE "marcas" (
    "marca_id" TEXT NOT NULL,
    "dono_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "mobilidade" INTEGER NOT NULL,
    "cor" VARCHAR(255) NOT NULL,
    "logotipo" VARCHAR(255) NOT NULL,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("marca_id")
);

-- CreateTable
CREATE TABLE "medidas_avaliacao" (
    "medidas_id" TEXT NOT NULL,
    "avaliacao_id" TEXT NOT NULL,
    "medida" VARCHAR(255) NOT NULL,
    "unidade_medida" VARCHAR(255) NOT NULL,
    "local_medida_id" TEXT NOT NULL,

    CONSTRAINT "medidas_avaliacao_pkey" PRIMARY KEY ("medidas_id")
);

-- CreateTable
CREATE TABLE "modalidades_ginasio" (
    "modalidade_id" TEXT NOT NULL,
    "ginasio_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "imagem_url" VARCHAR(255) NOT NULL,
    "estado" INTEGER,

    CONSTRAINT "modalidades_ginasio_pkey" PRIMARY KEY ("modalidade_id")
);

-- CreateTable
CREATE TABLE "musculos" (
    "musculo_id" TEXT NOT NULL,
    "nome" INTEGER NOT NULL,
    "imgurl" INTEGER NOT NULL,

    CONSTRAINT "musculos_pkey" PRIMARY KEY ("musculo_id")
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "noti_id" TEXT NOT NULL,
    "origem_uid" TEXT NOT NULL,
    "conteudo" VARCHAR(255) NOT NULL,
    "visto" INTEGER DEFAULT 0,
    "data" DATE NOT NULL,
    "tipo" INTEGER NOT NULL,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("noti_id")
);

-- CreateTable
CREATE TABLE "planos_treino" (
    "plano_treino_id" TEXT NOT NULL,
    "aluno_id" TEXT NOT NULL,
    "treinador_id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 0,
    "modalidade_id" TEXT NOT NULL,

    CONSTRAINT "planos_treino_pkey" PRIMARY KEY ("plano_treino_id")
);

-- CreateTable
CREATE TABLE "publicacoes" (
    "publicacao_id" TEXT NOT NULL,
    "criador_id" TEXT,
    "data" DATE NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "tipo" INTEGER NOT NULL,
    "ginasio_id" TEXT,

    CONSTRAINT "publicacoes_pkey" PRIMARY KEY ("publicacao_id")
);

-- CreateTable
CREATE TABLE "regras_desafio" (
    "regra_id" TEXT NOT NULL,
    "desafio_id" TEXT NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "regras_desafio_pkey" PRIMARY KEY ("regra_id")
);

-- CreateTable
CREATE TABLE "series_desafio" (
    "serie_id" TEXT NOT NULL,
    "exercicio_desafio_id" TEXT NOT NULL,
    "n_ordem_serie" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "peso" INTEGER NOT NULL,
    "unidade_medida" VARCHAR(255) NOT NULL,

    CONSTRAINT "series_desafio_pkey" PRIMARY KEY ("serie_id")
);

-- CreateTable
CREATE TABLE "series_exercicio" (
    "serie_id" TEXT NOT NULL,
    "exercicios_bloco_id" TEXT NOT NULL,
    "n_ordem_serie" INTEGER NOT NULL,
    "valor" VARCHAR(255) NOT NULL,
    "peso" INTEGER,
    "unidade_medida" VARCHAR(255),

    CONSTRAINT "series_exercicio_pkey" PRIMARY KEY ("serie_id")
);

-- CreateTable
CREATE TABLE "submissoes_desafios" (
    "submissao_id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "valor" VARCHAR(255),
    "estado" INTEGER NOT NULL,
    "desafio_id" TEXT NOT NULL,
    "treinador_id" TEXT NOT NULL,
    "ginasio_id" TEXT NOT NULL,

    CONSTRAINT "submissoes_desafios_pkey" PRIMARY KEY ("submissao_id")
);

-- CreateTable
CREATE TABLE "treinadores_marca" (
    "treinador_uid" TEXT NOT NULL,
    "marca_id" TEXT NOT NULL,

    CONSTRAINT "treinadores_marca_pkey" PRIMARY KEY ("treinador_uid","marca_id")
);

-- CreateTable
CREATE TABLE "treinos" (
    "treino_id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "tipo_modalidade" INTEGER NOT NULL,
    "atividade_id" TEXT,
    "modalidade_id" TEXT,
    "duracao" VARCHAR(255) NOT NULL,
    "calorias" INTEGER,
    "distancia" INTEGER,
    "data" DATE NOT NULL,

    CONSTRAINT "treinos_pkey" PRIMARY KEY ("treino_id")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "data_nasc" DATE NOT NULL,
    "hashtag" VARCHAR(255) NOT NULL,
    "data_entrada" DATE NOT NULL,
    "funcao_id" TEXT NOT NULL,
    "refresh_token" VARCHAR(255),
    "genero" INTEGER NOT NULL,
    "pontos" INTEGER DEFAULT 0,
    "descricao" VARCHAR(255),
    "imagem_url" VARCHAR(255),
    "estado" INTEGER DEFAULT 1,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_hashtag_key" ON "users"("hashtag");

-- AddForeignKey
ALTER TABLE "agendamentos_avaliacoes" ADD CONSTRAINT "fkagendament980386" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamentos_avaliacoes" ADD CONSTRAINT "fkagendament244850" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamentos_desafios" ADD CONSTRAINT "fkagendament612576" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamentos_desafios" ADD CONSTRAINT "fkagendament841318" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamentos_desafios" ADD CONSTRAINT "fkagendament394735" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aluno_ginasio" ADD CONSTRAINT "fkaluno_gina747871" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aluno_ginasio" ADD CONSTRAINT "fkaluno_gina239330" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alunos_marca" ADD CONSTRAINT "fkalunos_mar273324" FOREIGN KEY ("marca_id") REFERENCES "marcas"("marca_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alunos_marca" ADD CONSTRAINT "fkalunos_mar464475" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliacao_imagens" ADD CONSTRAINT "fkavaliacao_266291" FOREIGN KEY ("avaliacao_id") REFERENCES "avaliacoes"("avaliacao_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "fkavaliacoes119892" FOREIGN KEY ("aluno_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "fkavaliacoes194757" FOREIGN KEY ("treinador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bloco_treino" ADD CONSTRAINT "fkbloco_trei396073" FOREIGN KEY ("plano_treino_id") REFERENCES "planos_treino"("plano_treino_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentarios_publicacao" ADD CONSTRAINT "fkcomentario286998" FOREIGN KEY ("publicacao_id") REFERENCES "publicacoes"("publicacao_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentarios_publicacao" ADD CONSTRAINT "fkcomentario66141" FOREIGN KEY ("criador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "definicoes_user" ADD CONSTRAINT "fkdefinicoes764689" FOREIGN KEY ("usersuid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "fkdesafios556854" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "fkdesafios433214" FOREIGN KEY ("modalidade_id") REFERENCES "modalidades_ginasio"("modalidade_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "fkdesafios277782" FOREIGN KEY ("criador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "destinos_notificacao" ADD CONSTRAINT "fkdestinos_n126435" FOREIGN KEY ("noti_id") REFERENCES "notificacoes"("noti_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "destinos_notificacao" ADD CONSTRAINT "fkdestinos_n728383" FOREIGN KEY ("dest_uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios" ADD CONSTRAINT "fkexercicios806183" FOREIGN KEY ("autor_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_bloco" ADD CONSTRAINT "fkexercicios619094" FOREIGN KEY ("bloco_id") REFERENCES "bloco_treino"("bloco_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_bloco" ADD CONSTRAINT "fkexercicios561801" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_desafio" ADD CONSTRAINT "fkexercicios16333" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_desafio" ADD CONSTRAINT "fkexercicios394574" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_imagens" ADD CONSTRAINT "fkexercicios255336" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_musculos" ADD CONSTRAINT "fkexercicios823659" FOREIGN KEY ("exercicio_id") REFERENCES "exercicios"("exercicio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercicios_musculos" ADD CONSTRAINT "fkexercicios621819" FOREIGN KEY ("musculo_id") REFERENCES "musculos"("musculo_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ginasio" ADD CONSTRAINT "fkginasio942118" FOREIGN KEY ("cp") REFERENCES "localidades"("cp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ginasio" ADD CONSTRAINT "fkginasio512603" FOREIGN KEY ("cp_ext") REFERENCES "localidades_ext"("cp_ext") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ginasio" ADD CONSTRAINT "fkginasio173025" FOREIGN KEY ("marca_id") REFERENCES "marcas"("marca_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gostos_comentario" ADD CONSTRAINT "fkgostos_com592880" FOREIGN KEY ("comentario_id") REFERENCES "comentarios_publicacao"("comentario_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gostos_comentario" ADD CONSTRAINT "fkgostos_com262378" FOREIGN KEY ("criador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gostos_publicacao" ADD CONSTRAINT "fkgostos_pub330742" FOREIGN KEY ("publicacao_id") REFERENCES "publicacoes"("publicacao_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gostos_publicacao" ADD CONSTRAINT "fkgostos_pub861705" FOREIGN KEY ("criador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "identificacoes_publicacoes" ADD CONSTRAINT "fkidentifica298313" FOREIGN KEY ("publicacao_id") REFERENCES "publicacoes"("publicacao_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "identificacoes_publicacoes" ADD CONSTRAINT "fkidentifica401248" FOREIGN KEY ("usersuid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "imagens_publicacao" ADD CONSTRAINT "fkimagens_pu788070" FOREIGN KEY ("publicacao_id") REFERENCES "publicacoes"("publicacao_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "local_medidas_ginásio" ADD CONSTRAINT "fklocal_medi973208" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "local_medidas_ginásio" ADD CONSTRAINT "fklocal_medi780121" FOREIGN KEY ("local_medida_id") REFERENCES "locais_medidas"("local_medida_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "localidades_ext" ADD CONSTRAINT "fklocalidade616869" FOREIGN KEY ("cp") REFERENCES "localidades"("cp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marcas" ADD CONSTRAINT "fkmarcas260834" FOREIGN KEY ("dono_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medidas_avaliacao" ADD CONSTRAINT "fkmedidas_av747581" FOREIGN KEY ("avaliacao_id") REFERENCES "avaliacoes"("avaliacao_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medidas_avaliacao" ADD CONSTRAINT "fkmedidas_av481994" FOREIGN KEY ("local_medida_id") REFERENCES "locais_medidas"("local_medida_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modalidades_ginasio" ADD CONSTRAINT "fkmodalidade839982" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "fknotificaco871945" FOREIGN KEY ("origem_uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planos_treino" ADD CONSTRAINT "fkplanos_tre425229" FOREIGN KEY ("modalidade_id") REFERENCES "modalidades_ginasio"("modalidade_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planos_treino" ADD CONSTRAINT "fkplanos_tre628891" FOREIGN KEY ("aluno_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "planos_treino" ADD CONSTRAINT "fkplanos_tre703756" FOREIGN KEY ("treinador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacoes" ADD CONSTRAINT "fkpublicacoe178492" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacoes" ADD CONSTRAINT "fkpublicacoe457564" FOREIGN KEY ("criador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regras_desafio" ADD CONSTRAINT "fkregras_des827169" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "series_desafio" ADD CONSTRAINT "fkseries_des841548" FOREIGN KEY ("exercicio_desafio_id") REFERENCES "exercicios_desafio"("exercicio_desafio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "series_exercicio" ADD CONSTRAINT "fkseries_exe489955" FOREIGN KEY ("exercicios_bloco_id") REFERENCES "exercicios_bloco"("exercicios_bloco_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submissoes_desafios" ADD CONSTRAINT "fksubmissoes619296" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("desafio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submissoes_desafios" ADD CONSTRAINT "fksubmissoes101601" FOREIGN KEY ("ginasio_id") REFERENCES "ginasio"("ginasio_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submissoes_desafios" ADD CONSTRAINT "fksubmissoes601393" FOREIGN KEY ("treinador_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submissoes_desafios" ADD CONSTRAINT "fksubmissoes837137" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treinadores_marca" ADD CONSTRAINT "fktreinadore973268" FOREIGN KEY ("marca_id") REFERENCES "marcas"("marca_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treinadores_marca" ADD CONSTRAINT "fktreinadore346953" FOREIGN KEY ("treinador_uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "fktreinos560349" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("atividade_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "fktreinos7075" FOREIGN KEY ("modalidade_id") REFERENCES "modalidades_ginasio"("modalidade_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "fktreinos709983" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fkusers982872" FOREIGN KEY ("funcao_id") REFERENCES "funcoes"("funcao_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
