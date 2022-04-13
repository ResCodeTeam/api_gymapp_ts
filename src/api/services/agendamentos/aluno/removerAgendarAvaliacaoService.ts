import { client } from "../../../prisma/client";
import { checkAgendamentoAvaliacaoExists, checkAutorAgendamentoAvaliacoes } from "../../../helpers/dbHelpers";

class RemoverAgendarAvaliacaoService {
  async execute(agendamentoId: string, uId: string) {
    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento da avaliação não existe");
    }

    const agendamento = await client.agendamentos_avaliacoes.findUnique({
      where:{
          agendamento_id: agendamentoId
      }
    })
    const isAutor = await checkAutorAgendamentoAvaliacoes(agendamentoId, uId);
    if(!isAutor){
      throw new Error("O agendamento não lhe pertence");
    }

    await client.agendamentos_avaliacoes.update({
     where: {
       agendamento_id: agendamentoId
      },
     data:{
       isDeleted: true
     }
    })

    return {
      msg: "Agendamento de uma avaliação removido com sucesso",
    };
  }
}

export { RemoverAgendarAvaliacaoService };
