import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { VerTodosPostsUserService } from "../posts/obter/verTodosPostsUserService";
import { VerTreinosAlunosService } from "../treinos/verTreinosAlunosService";

export class VerMeuPerfilService{
  async execute(uid:string){
    const perfil = await client.users.findUnique({
      where:{
        uid
      }
    })

    const verTodosPostsUserService = new VerTodosPostsUserService()
    const posts = await verTodosPostsUserService.execute(uid);
    const verTreinosAlunosService = new VerTreinosAlunosService()
    const treinos = await verTreinosAlunosService.execute(uid);

    return{perfil, posts, treinos}
  }
}