import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class CriarComentarioService {
    async execute(publicacao_id, comentario,criador_id){
        
        if(publicacao_id == null){
            throw new Error("Identificador da publicação não inserido.")
        }
        if(comentario == ""){
            throw new Error("É necessario preencher o campo comentario.")
        }

        const publicacao = await client.publicacoes.findUnique({
            where: { 
                publicacao_id: publicacao_id
            }
        })
        if(publicacao == null){
            throw new Error("Não existe publicação com o identificador: " + publicacao_id)
        }

        const novoComentario = await client.comentarios_publicacao.create({
            data:{
                publicacao_id,
                comentario,
                criador_id,
                data : new Date()
            }
        })

        return novoComentario;
    }
}