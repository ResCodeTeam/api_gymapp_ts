import { client } from "../../prisma/client";
import { checkPostExists } from "../../helpers/dbHelpers";


class RemoverPostService{

    async execute(postId : string){
        const existsPost = await checkPostExists(postId);
        if (!existsPost) {
        throw new Error("A modalidade não existe");
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
            msg:"publicacao removida com sucesso"
        }
    }
}
export { RemoverPostService };
