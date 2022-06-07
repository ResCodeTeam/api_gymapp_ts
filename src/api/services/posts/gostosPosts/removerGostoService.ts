/**
 * @module RemoverGostoPublicacaoService
 */

import { checkAutorPublicacoes, checkGostoPublicacaoExists, checkPublicacaoExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverGostoPublicacaoService {
  async execute(publicacaoId: string, userId: string) {

    const publicacao = await checkPublicacaoExists(publicacaoId)
    if (!publicacao) {
      return { data: "Publicação inexistente", status: 500 }
    }

    const autor = await checkAutorPublicacoes(userId, publicacaoId)
    if (!autor) {
      return { data: "Não possui autorização", status: 500 }
    }

    const gosto = await checkGostoPublicacaoExists(publicacaoId, userId)
    if (gosto == null) {
      return { data: "Gosto inexistente", status: 500 }
    }

    await client.gostos_publicacao.delete({
      where: {
        gosto_id: gosto.gosto_id
      }
    })

    return { data: "gosto removido com sucesso", status: 200 }

  }
}