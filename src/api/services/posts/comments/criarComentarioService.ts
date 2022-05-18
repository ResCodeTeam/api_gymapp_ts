import { changeTimeZone } from "../../../helpers/dateHelpers";
import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class CriarComentarioService {
    async execute(publicacao_id: string, comentario: string, criador_id: string, identificacao: Array<string>) {

        if (publicacao_id == null) {
            throw new Error("Identificador da publicação não inserido.")
        }
        if (comentario == "") {
            throw new Error("É necessario preencher o campo comentario.")
        }

        const publicacao = await client.publicacoes.findUnique({
            where: {
                publicacao_id: publicacao_id
            }
        })
        if (publicacao == null) {
            throw new Error("Não existe publicação com o identificador: " + publicacao_id)
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

        return {data: novoComentario, status: 200};
    }
}
