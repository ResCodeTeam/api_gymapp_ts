import { client } from "../../../prisma/client";
import { checkAgendamentoDesafiosExists, checkAutorAgendamentoDesafios } from "../../../helpers/dbHelpers";

class RemoverAgendarDesafiosService {
  async execute(agendamentoId: string, uId: string) {
    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      return { date: "O agendamento do desafio não existe", status: 500 }
    }

    const agendamento = await client.agendamentos_avaliacoes.findUnique({
      where: {
        agendamento_id: agendamentoId
      }
    })
    const isAutor = await checkAutorAgendamentoDesafios(agendamentoId, uId);
    if (!isAutor) {
      return { date: "O agendamento não lhe pertence", status: 500 }
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
      msg: "Agendamento do desafio removido com sucesso",
    };
  }
}

export { RemoverAgendarDesafiosService };
