import { client } from "../../../prisma/client";
import { checkAgendamentoAvaliacaoExists } from "../../../helpers/dbHelpers";

class AceitarAvaliacoesService {
  async execute(agendamentoId: string) {
    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento não existe");
    }

    await client.agendamentos_avaliacoes.update({
     where: {
       agendamento_id: agendamentoId
      },
     data:{
       isAceite: true
     }
    })

    return {
      msg: "Agendamento aceite com sucesso",
    };
  }
}

export { AceitarAvaliacoesService };
