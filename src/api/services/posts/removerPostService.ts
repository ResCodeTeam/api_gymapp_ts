import { client } from "../../prisma/client";
import { checkPostExists, checkAutorPublicacoes } from "../../helpers/dbHelpers";


class RemoverPostService{

    async execute(uId: string, postId : string){
        const existsPost = await checkPostExists(postId);
        if (!existsPost) {
        throw new Error("A publicação não existe");
        }

        const publicacao = await client.publicacoes.findUnique({
            where:{
                publicacao_id:postId
            }
          })
        const isAutor = await checkAutorPublicacoes(uId,postId);
          if(!isAutor){
            throw new Error("A publicação não lhe pertence");
        }

        await client.publicacoes.update({
            data:{
                isDeleted:true
            },
            where:{
                publicacao_id:postId
            }
        })

        return {
            data:"Publicação removida com sucesso",
            status: 200
        }
    }
}
export { RemoverPostService };
