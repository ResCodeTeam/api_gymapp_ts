import { checkComentarioExists, checkIsComentarioPublicacaoExists, checkPostExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class CriarGostoCommentService{
  async execute(comentarioId:string,publicacaoId:string, criadorId:string){
    const existsComment = await checkComentarioExists(comentarioId)
    if(!existsComment){
      throw new Error("Comentario não existe")
    }

    const existsPost = await checkPostExists(publicacaoId)
    if(!existsPost){
      throw new Error("Publicação não existe")
    }

    const isComentarioPost = await checkIsComentarioPublicacaoExists(comentarioId,publicacaoId)
    if(!isComentarioPost){
      throw new Error("Comentário inexistente na publicação")
    }

    const gosto = await client.gostos_comentario.create({
      data:{
        criador_id:criadorId,
        comentario_id:comentarioId,
      }
    })

    return {data: gosto, status: 200};
  }
}