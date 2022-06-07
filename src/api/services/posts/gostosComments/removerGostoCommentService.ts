/**
 * @module RemoverGostoCommentService
 */
import { checkComentarioExists, checkGostoComentarioExists, checkIsComentarioPublicacaoExists, checkPostExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverGostoCommentService {
  async execute(publicacaoId: string, criadorId: string, comentarioId: string) {
    const existsPublicacao = await checkPostExists(publicacaoId);
    if (!existsPublicacao) {
      return { data: "Publicação não existe", status: 500 }
    }

    const existsComentario = await checkComentarioExists(comentarioId);
    if (!existsComentario) {
      return { data: "Comentario inexistente", status: 500 }
    }

    const isComentarioPublicacao = await checkIsComentarioPublicacaoExists(comentarioId, publicacaoId)
    if (!isComentarioPublicacao) {
      return { data: "Não é comentario da publicação", status: 500 }
    }

    const gosto = await checkGostoComentarioExists(comentarioId, criadorId)
    if (gosto == null) {
      return { data: "Gosto inexistente", status: 500 }
    }

    await client.gostos_comentario.delete({
      where: {
        gosto_id: gosto.gosto_id
      }
    })

    return { data: 'gosto removido com sucesso', status: 200 }
  }
}