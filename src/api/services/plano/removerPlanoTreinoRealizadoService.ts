/**
 * @module RemoverPlanoTreinoRealizadoService
 */
import { client } from "../../prisma/client";
import { checkPlanoTreinoExists, checkAutorPlanoTreino, checkPlanoTreinoIsRealizado } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção do estado dos planos de treino
 */
class RemoverPlanoTreinoRealizadoService {
  /**
   * Método que permite alterar o estado de um plano de treino realizado
   * @param alunoId id do aluno
   * @param planoId id do plano de treino
   * @returns 
   */
  async execute(alunoId: string, planoId: string) {
    const exists_plano = await checkPlanoTreinoExists(planoId);
    if (!exists_plano) {
      return { data: "O plano de treino não existe", status: 500 }
    }

    const plano_isRealizado = await checkPlanoTreinoIsRealizado(planoId);
    if (!plano_isRealizado) {
      return { data: "O plano de treino ainda não foi realizado", status: 500 }
    }

    const plano = await client.planos_treino.findUnique({
      where: {
        plano_treino_id: planoId
      }
    })
    const isAutor = await checkAutorPlanoTreino(alunoId, planoId);
    if (!isAutor) {
      return { data: "O plano de treino não lhe pertence", status: 500 }
    }

    await client.planos_treino.update({
      where: {
        plano_treino_id: planoId
      },
      data: {
        isRealizado: false
      }
    })

    return {
      data: "Remover plano de treino realizado com sucesso",
      status: 200
    };
  }
}

export { RemoverPlanoTreinoRealizadoService };
