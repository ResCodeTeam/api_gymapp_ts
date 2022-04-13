import { client } from "../../prisma/client";
import { checkAgendamentoAvaliacaoExists } from "../../helpers/dbHelpers";

class RemoverAgendarAvaliacaoService {
  async execute(agendamentoId: string) {
    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento da avaliação não existe");
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
