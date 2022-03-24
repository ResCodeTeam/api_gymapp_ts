import dbHelpers from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

interface IComentario {
    post_id : string,
    comentario : string,
    criador_id : string,
    data : string
}

class CriarComentarioService{
    async execute({post_id,comentario,criador_id,data}: IComentario){

        const exists_pub = await dbHelpers.checkPostExists(post_id);
        if(!exists_pub){
            throw new Error("Erro ao criar comentário")
        }

        const exists_criador = await dbHelpers.checkUserIdExists(criador_id);
        if(!exists_criador){
            throw new Error("Erro ao criar comentário")
        }

        await client.comentarios_publicacao.create({
            publicacao_id:post_id,
            comentario,
            criador_id:criador_id,
            data
        })
        return {
            msg: "Comentario publicado"
        }
    }

}

export{ CriarComentarioService };
