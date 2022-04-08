import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class CriarGostoService{
  async execute(postId:string, criadorId:string){
    const existsPost =  await checkPostExists(postId);
    if(!existsPost){
      throw new Error("Post inexistente")
    }

    const existsCriador =  await checkUserIdExists(criadorId);
    if(!existsCriador){
      throw new Error("User inexistente")
    }

    const gosto = await client.gostos_publicacao.create({
      data:{
        criador_id:criadorId,
        publicacao_id:postId
      }
    })

    return{gosto}
  }
}