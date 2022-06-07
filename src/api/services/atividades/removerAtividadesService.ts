/**
 * @module RemoverAtividadesService
 */
import { client } from "../../prisma/client";
import { checkAtividadeExists } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de uma atividade
 */
class RemoverAtividadesService {
  /**
 * Método que permite remover uma atividade na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param atividadeId id da atividade a remover 
 */
  async execute(atividadeId: string) {
    const exists_atividade = await checkAtividadeExists(atividadeId);
    if (!exists_atividade) {
      return { data: "A modalidade não existe", status: 500 }
    }


    await client.atividades.update({
      where: {
        atividade_id: atividadeId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Atividade removida com sucesso",
      status: 200
    };
  }
}

export { RemoverAtividadesService };
