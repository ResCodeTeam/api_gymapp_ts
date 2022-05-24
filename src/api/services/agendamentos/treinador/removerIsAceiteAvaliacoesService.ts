import { client } from "../../../prisma/client";
import { checkAgendamentoAvaliacaoExists, checkAgendamentoAvaliacaoIsAceiteExists, getAgendamentoAvaliacoesGinasio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";

class RemoverIsAceiteAvaliacoesService {
  async execute(treinadorId: string, agendamentoId: string) {

    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      return { data: "O agendamento da avaliação não existe", status: 500 }
    }

    const ginasio_agendamento = await getAgendamentoAvaliacoesGinasio(agendamentoId);
    const marca_ginasio = (await getMarcaGym(ginasio_agendamento)).marca_id;
    const marca_treinador = await getTreinadorMarca(treinadorId)

    if (marca_ginasio != marca_treinador) {
      return { data: "Não tem autorização", status: 500 }
    }

    const is_aceite = await checkAgendamentoAvaliacaoIsAceiteExists(agendamentoId);
    if (is_aceite) {
      return { data: "O agendamento da avaliação ainda não foi aceite", status: 500 }
    }

    await client.agendamentos_avaliacoes.update({
      where: {
        agendamento_id: agendamentoId
      },
      data: {
        isAceite: false
      }
    })

    return {
      data: "Aceitação do agendamento da avaliação removida com sucesso",
      status: 200
    };
  }
}

export { RemoverIsAceiteAvaliacoesService };
