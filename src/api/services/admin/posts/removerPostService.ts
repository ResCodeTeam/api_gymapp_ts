import { client } from "../../../prisma/client";
import { checkPostExists } from "../../../helpers/dbHelpers";


class RemoverPostService{

    async execute(post_id){
        const exists_post = await checkPostExists(post_id);
        if (!exists_post) {
        throw new Error("A modalidade não existe");
        }


        //apagar identificações
        client.identificacoes_publicacoes.delete({
            where:{
                publicacao_id: post_id
            }

        })
        //apagar gostos publicação
        client.gostos_publicacao.delete({
            where:{
                publicacao_id: post_id
            }
        })

        // apagar comentarios
        const comentarios = await client.comentarios_publicacao.findAll({
            where:{
                publicacao_id:post_id
            }
        })

        for(let i=0; i<comentarios.length; i++){
            const comentario_id =comentarios[i]['dataValues']['comentario_id']

            // apagar likes comentarios
            client.gostos_comentario.delete({
                where:{
                    comentario_id
                }
            })


            client.comentarios_publicacao.delete({
                where:{
                    comentario_id
                }
            })
        }

        client.publicacoes.delete({
            where:{
                publicacao_id: post_id
            }
        })

        return {
            msg:"publicacao removida com sucesso"
        }
    }
}
export { RemoverPostService };
