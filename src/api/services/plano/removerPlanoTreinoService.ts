/**
 * @module RemoverPlanoTreinoService
 */

import { client } from "../../prisma/client";
import { checkPlanoTreinoExists, checkTreinadorPlanoTreino, getTreinadorMarca, getTreinadorPlano } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de planos de treino
 */
class RemoverPlanoTreinoService {
  /**
   * Método para remover um plano de treino realizando todas as as verificações necessárias
   * @param treinadorId id do treinador
   * @param planoId id publicações
   */
  async execute(treinadorId: string, planoId: string) {

    const exists_plano = await checkPlanoTreinoExists(planoId);
    if (!exists_plano) {
      return { data: "O plano de treino não existe", status: 500 }
    }

    const autor = await getTreinadorPlano(planoId);
    const marca_treinador_plano = await getTreinadorMarca(autor)
    const marca_treinador = await getTreinadorMarca(treinadorId)

    if (marca_treinador_plano != marca_treinador) {
      return { data: "Não tem autorização", status: 500 }
    }

    await client.planos_treino.update({
      where: {
        plano_treino_id: planoId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Remover plano de treino com sucesso",
      status: 200
    };
  }
}

export { RemoverPlanoTreinoService };
