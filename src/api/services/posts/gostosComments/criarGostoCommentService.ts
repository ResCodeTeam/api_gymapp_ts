import { checkComentarioExists, checkIsComentarioPublicacaoExists, checkPostExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class CriarGostoCommentService {
  async execute(comentarioId: string, publicacaoId: string, criadorId: string) {
    const existsComment = await checkComentarioExists(comentarioId)
    if (!existsComment) {
      return { date: "Comentario não existe", status: 500 }
    }

    const existsPost = await checkPostExists(publicacaoId)
    if (!existsPost) {
      return { date: "Publicação não existe", status: 500 }
    }

    const isComentarioPost = await checkIsComentarioPublicacaoExists(comentarioId, publicacaoId)
    if (!isComentarioPost) {
      return { date: "Comentário inexistente na publicação", status: 500 }
    }

    const gosto = await client.gostos_comentario.create({
      data: {
        criador_id: criadorId,
        comentario_id: comentarioId,
      }
    })

    return {data: gosto, status: 200};
  }
}