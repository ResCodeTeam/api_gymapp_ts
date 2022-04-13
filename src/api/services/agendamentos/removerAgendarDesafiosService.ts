import { client } from "../../prisma/client";
import { checkAgendamentoDesafiosExists } from "../../helpers/dbHelpers";

class RemoverAgendarDesafiosService {
  async execute(agendamentoId: string) {
    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento do desafio não existe");
    }

   
    await client.agendamentos_desafios.update({
     where: {
       agendamento_id: agendamentoId
      },
     data:{
       isDeleted: true
     }
    })

    return {
      msg: "Agendamento do desafio removido com sucesso",
    };
  }
}

export { RemoverAgendarDesafiosService };
