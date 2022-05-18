import { checkComentarioExists, checkGostoComentarioExists, checkIsComentarioPublicacaoExists, checkPostExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverGostoCommentService{
  async execute(publicacaoId:string, criadorId:string, comentarioId:string){
    const existsPublicacao = await checkPostExists(publicacaoId);
    if(!existsPublicacao){
      throw new Error("Publicação não existe")
    }

    const existsComentario = await checkComentarioExists(comentarioId);
    if(!existsComentario){
      throw new Error("Comentario inexistente")
    }

    const isComentarioPublicacao = await checkIsComentarioPublicacaoExists(comentarioId,publicacaoId)
    if(!isComentarioPublicacao){
      throw new Error("Não é comentario da publicação")
    }

    const gosto = await checkGostoComentarioExists(comentarioId,criadorId)
    if(gosto == null){
      throw new Error("Gosto inexistente")
    }

    await client.gostos_comentario.delete({
      where:{
        gosto_id:gosto.gosto_id
      }
    })

    return {data:'gosto removido com sucesso', status: 200}
  }
}