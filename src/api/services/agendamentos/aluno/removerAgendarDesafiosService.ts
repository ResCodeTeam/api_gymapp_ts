/**
 * @module RemoverAgendarDesafiosService
 */
import { client } from "../../../prisma/client";
import { checkAgendamentoDesafiosExists, checkAutorAgendamentoDesafios } from "../../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de um pedido de agendamento de um desafio
 */
class RemoverAgendarDesafiosService {
   /**
 * Método que permite remover um pedido de agendamento de desafio na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param agendamentoId id do agendamento
 * @param uId id do utilizador
 */
  async execute(agendamentoId: string, uId: string) {
    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      return { data: "O agendamento do desafio não existe", status: 500 }
    }

    const agendamento = await client.agendamentos_avaliacoes.findUnique({
      where: {
        agendamento_id: agendamentoId
      }
    })
    const isAutor = await checkAutorAgendamentoDesafios(agendamentoId, uId);
    if (!isAutor) {
      return { data: "O agendamento não lhe pertence", status: 500 }
    }

    await client.agendamentos_desafios.update({
      where: {
        agendamento_id: agendamentoId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Agendamento do desafio removido com sucesso",
      status: 200
    };
  }
}

export { RemoverAgendarDesafiosService };
