
import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { VerTodosPostsUserService } from "../posts/obter/verTodosPostsUserService";

export class VerPerfilService{
    async execute(uId:string){

        const exists_perfil= await checkUserIdExists(uId)
        if(!exists_perfil){
            throw new Error("Utilizador não existe")
        }

        const perfil = await client.users.findMany({
            where:{
                uid:uId,
                
                isDeleted:false
                
            },
                })

                const verTodosPostsUserService = new VerTodosPostsUserService()
                const posts = (await verTodosPostsUserService.execute(uId)).posts;
        
        return {
            perfil,posts    
        }
    }
}


