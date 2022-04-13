import { checkPostExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class VerInfoPostService{
    async execute(postId:string){
        const existsPost = await checkPostExists(postId);
        if(!existsPost){
            throw new Error("Publicação não existe")
        }
        
        const post = await client.publicacoes.findFirst({
            where:{
                publicacao_id:postId,
                users:{
                    definicoes_user:{
                        is_privado:false
                    }
                }

            }
        })
        
        return{post}


    }
}