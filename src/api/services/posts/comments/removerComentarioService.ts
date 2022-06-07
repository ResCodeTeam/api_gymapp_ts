/**
 * @module RemoverComentarioService
 */

import { gostos_comentario, identificacoes_comentarios } from "@prisma/client";
import { checkAutorComentario, checkComentarioExists, checkIsComentarioPublicacaoExists, checkPostExists, getGostosComentario, getIdentificacoesComentario } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço de remoção de comentários
 */
export class RemoverComentarioService {
  async execute(criadorId: string, comentarioId: string, publicacaoId: string) {
    const existsPublicacao = await checkPostExists(publicacaoId);
    if (!existsPublicacao) {
      return { data: "Publicação inexistente", status: 500 }
    }

    const isComentarioPublicacao = await checkIsComentarioPublicacaoExists(comentarioId, publicacaoId);
    if (!isComentarioPublicacao) {
      return { data: "Comentario inexistente", status: 500 }
    }

    const existsComentario = await checkComentarioExists(comentarioId);
    if (!existsComentario) {
      return { data: "Comentario inexistente", status: 500 }
    }

    const isAutor = await checkAutorComentario(comentarioId, criadorId);
    if (!isAutor) {
      return { data: "Não possui autorização para tal", status: 500 }
    }

    const gostos: gostos_comentario[] = await getGostosComentario(comentarioId);
    for (const gosto of gostos) {
      await client.gostos_comentario.delete({
        where: {
          gosto_id: gosto.gosto_id
        }
      })
    }
    const identificacoes: identificacoes_comentarios[] = await getIdentificacoesComentario(comentarioId)
    for (const identificacao of identificacoes) {
      await client.identificacoes_comentarios.delete({
        where: {
          identificacao_id: identificacao.identificacao_id
        }
      })
    }
    await client.comentarios_publicacao.delete({
      where: {
        comentario_id: comentarioId,

      }
    })

    return { data: "Comentário removido com sucesso", status: 200 }
  }
}