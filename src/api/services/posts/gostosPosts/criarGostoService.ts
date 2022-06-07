/**
 * @module CriarGostoService
 */

import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço de criação de gostos em publicações
 */
export class CriarGostoService {
  /**
   * Método que permite criar um gosto realizando todas as as verificações necessárias
   * @param postId id publicação
   * @param criadorId id do criador
   */
  async execute(postId: string, criadorId: string) {
    const existsPost = await checkPostExists(postId);
    if (!existsPost) {
      return { data: "Post inexistente", status: 500 }
    }

    const existsCriador = await checkUserIdExists(criadorId);
    if (!existsCriador) {
      return { data: "User inexistente", status: 500 }
    }

    const gosto = await client.gostos_publicacao.create({
      data: {
        criador_id: criadorId,
        publicacao_id: postId
      }
    })

    return { data: gosto, status: 200 };
  }
}