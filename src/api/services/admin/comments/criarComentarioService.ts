import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

interface IComentario {
    postId : string,
    comentario : string,
    criadorId : string,
    data : Date
}

class CriarComentarioService{
    async execute({postId,comentario,criadorId,data}: IComentario){

        // const exists_pub = await checkPostExists(post_id);
        // if(!exists_pub){
        //     throw new Error("Erro ao criar comentário")
        // }

        // const exists_criador = await checkUserIdExists(criador_id);
        // if(!exists_criador){
        //     throw new Error("Erro ao criar comentário")
        // }

        // await client.comentarios_publicacao.create({
        //     publicacao_id:post_id,
        //     comentario,
        //     criador_id:criador_id,
        //     data
        // })
        // return {
        //     msg: "Comentario publicado"
        // }
    }

}

export{ CriarComentarioService };
