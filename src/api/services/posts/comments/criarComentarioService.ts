import { changeTimeZone } from "../../../helpers/dateHelpers";
import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class CriarComentarioService {
    async execute(publicacao_id: string, comentario: string, criador_id: string, identificacao: Array<string>) {

        if (publicacao_id == null) {
            return { date: "Identificador da publicação não inserido.", status: 500 }
        }
        if (comentario == "") {
            return { date: "É necessario preencher o campo comentario.", status: 500 }
        }

        const publicacao = await client.publicacoes.findUnique({
            where: {
                publicacao_id: publicacao_id
            }
        })
        if (publicacao == null) {
            return { date: "Não existe publicação com o identificador: ", status: 500 }
        }

        let data = new Date();
        changeTimeZone(data)

        const novoComentario = await client.comentarios_publicacao.create({
            data: {
                publicacao_id,
                comentario,
                criador_id,
                data
            }
        })
        if (identificacao != null && identificacao.length > 0) {
            for (let i = 0; i < identificacao.length; i++) {
                await client.identificacoes_comentarios.create({
                    data: {
                        comentario_id: novoComentario.comentario_id,
                        usersuid: identificacao[i]
                    }
                })
            }
        }

        return novoComentario;
    }
}
