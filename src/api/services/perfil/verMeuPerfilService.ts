import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { VerTodosPostsUserService } from "../posts/obter/verTodosPostsUserService";

export class VerMeuPerfilService{
  async execute(uid:string){
    const existsUser=await checkUserIdExists(uid);
    if(!existsUser){
      throw new Error("User inexistente")
    }

    const perfil = await client.users.findUnique({
      where:{
        uid
      }
    })

    const verTodosPostsUserService = new VerTodosPostsUserService()
    const posts = (await verTodosPostsUserService.execute(uid)).posts;

    

    return{perfil,posts}
  }
}