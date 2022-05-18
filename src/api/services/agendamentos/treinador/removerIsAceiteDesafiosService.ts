import { client } from "../../../prisma/client";
import { checkAgendamentoDesafiosExists, checkAgendamentoDesafioIsAceiteExists, getAgendamentoDesafiosGinasio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";

class RemoverIsAceiteDesafiosService {
  async execute(treinadorId: string, agendamentoId: string) {

    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      return { date: "O agendamento do desafio não existe", status: 500 }
    }

    const ginasio_agendamento = await getAgendamentoDesafiosGinasio(agendamentoId);
    const marca_ginasio = (await getMarcaGym(ginasio_agendamento)).marca_id;
    const marca_treinador = await getTreinadorMarca(treinadorId)

    if (marca_ginasio != marca_treinador) {
      return { date: "Não tem autorização", status: 500 }
    }

    const is_aceite = await checkAgendamentoDesafioIsAceiteExists(agendamentoId);
    if (is_aceite) {
      return { date: "O agendamento do desafio ainda não foi aceite", status: 500 }
    }

    const agendamento = await client.agendamentos_desafios.findUnique({
      where: {
        agendamento_id: agendamentoId
      }
    })

    await client.agendamentos_desafios.update({
      where: {
        agendamento_id: agendamentoId
      },
      data: {
        isAceite: false
      }
    })

    return {
      msg: "Aceitação do agendamento do desafio removida com sucesso",
    };
  }
}

export { RemoverIsAceiteDesafiosService };
