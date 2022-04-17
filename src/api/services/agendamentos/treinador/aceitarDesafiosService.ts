import { client } from "../../../prisma/client";
import { checkAgendamentoDesafiosExists, checkAgendamentoDesafioIsAceiteExists } from "../../../helpers/dbHelpers";

class AceitarDesafiosService {
  async execute(agendamentoId: string) {
    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O pedido de agendamento não existe");
    }

    const is_aceite = await checkAgendamentoDesafioIsAceiteExists(agendamentoId);
    if (!is_aceite) {
      throw new Error("O pedido de agendamento já foi aceite");
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
