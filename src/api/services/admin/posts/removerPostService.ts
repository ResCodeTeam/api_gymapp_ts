import { client } from "../../../prisma/client";
import { checkPostExists } from "../../../helpers/dbHelpers";


class RemoverPostService{

    async execute(postId : string){
        const existsPost = await checkPostExists(postId);
        if (!existsPost) {
        throw new Error("A modalidade não existe");
        }


        //apagar identificações
        client.identificacoes_publicacoes.deleteMany({
            where:{
                publicacao_id: postId
            }

        })
        //apagar gostos publicação
        client.gostos_publicacao.deleteMany({
            where:{
                publicacao_id: postId
            }
        })

        // apagar comentarios
        const comentarios = await client.comentarios_publicacao.findMany({
            where:{
                publicacao_id:postId
            }
        })

        for(let i=0; i<comentarios.length; i++){
            const comentarioId =comentarios[i]['dataValues']['comentario_id']

            // apagar likes comentarios
            client.gostos_comentario.deleteMany({
                where:{
                    comentario_id : comentarioId
                }
            })


            client.comentarios_publicacao.deleteMany({
                where:{
                    comentario_id : comentarioId
                }
            })
        }

        client.publicacoes.delete({
            where:{
                publicacao_id: postId
            }
        })

        return {
            msg:"publicacao removida com sucesso"
        }
    }
}
export { RemoverPostService };
