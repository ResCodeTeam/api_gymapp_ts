import { gostos_comentario, identificacoes_comentarios } from "@prisma/client";
import { checkAutorComentario, checkComentarioExists, checkIsComentarioPublicacaoExists, checkPostExists, getGostosComentario, getIdentificacoesComentario } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverComentarioService{
  async execute(criadorId:string, comentarioId:string, publicacaoId:string){
    console.log(criadorId,comentarioId,publicacaoId)
    const existsPublicacao = await checkPostExists(publicacaoId);
    if(!existsPublicacao){
      throw new Error("Publicação inexistente")
    }

    const isComentarioPublicacao = await checkIsComentarioPublicacaoExists(comentarioId,publicacaoId);
    if(!isComentarioPublicacao){
      throw new Error("Comentario inexistente")
    }

    const existsComentario = await checkComentarioExists(comentarioId);
    if(!existsComentario){
      throw new Error("Comentario inexistente")
    }

    const isAutor = await checkAutorComentario(comentarioId, criadorId);
    if(!isAutor){
      throw new Error("Não possui autorização para tal")
    }

    const gostos:gostos_comentario[] = await getGostosComentario(comentarioId);
    for(const gosto of gostos){
      await client.gostos_comentario.delete({
        where:{
          gosto_id:gosto.gosto_id
        }
      })
    }
    const identificacoes:identificacoes_comentarios[] = await getIdentificacoesComentario(comentarioId)
    for(const identificacao of identificacoes){
      await client.identificacoes_comentarios.delete({
        where:{
          identificacao_id:identificacao.identificacao_id
        }
      })
    }
    await client.comentarios_publicacao.delete({
      where:{
        comentario_id:comentarioId,

      }
    })

    return {"msg":"Comentário removido com sucesso"}
  }
}