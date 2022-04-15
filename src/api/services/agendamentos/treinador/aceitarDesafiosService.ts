import { client } from "../../../prisma/client";
import { checkAgendamentoDesafiosExists } from "../../../helpers/dbHelpers";

class AceitarDesafiosService {
  async execute(agendamentoId: string) {
    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento não existe");
    }

    const agendamentos = await client.agendamentos_desafios.update({
     where: {
       agendamento_id: agendamentoId
      },
     data:{
       isAceite: true
     }
    })

    return agendamentos;
  }
}

export { AceitarDesafiosService };
