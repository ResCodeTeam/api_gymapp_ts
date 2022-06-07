/**
 * @module RemoverAgendarAvaliacaoService
 */
import { client } from "../../../prisma/client";
import { checkAgendamentoAvaliacaoExists, checkAutorAgendamentoAvaliacoes } from "../../../helpers/dbHelpers";

class RemoverAgendarAvaliacaoService {
  async execute(agendamentoId: string, uId: string) {
    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      return { data: "O agendamento da avaliação não existe", status: 500 }
    }

    const agendamento = await client.agendamentos_avaliacoes.findUnique({
      where: {
        agendamento_id: agendamentoId
      }
    })
    const isAutor = await checkAutorAgendamentoAvaliacoes(agendamentoId, uId);
    if (!isAutor) {
      return { data: "O agendamento não lhe pertence", status: 500 }
    }

    await client.agendamentos_avaliacoes.update({
      where: {
        agendamento_id: agendamentoId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Agendamento de uma avaliação removido com sucesso",
      status: 200
    };
  }
}

export { RemoverAgendarAvaliacaoService };
