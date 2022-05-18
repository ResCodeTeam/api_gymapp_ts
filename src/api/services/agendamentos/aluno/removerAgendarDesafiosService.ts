import { client } from "../../../prisma/client";
import { checkAgendamentoDesafiosExists, checkAutorAgendamentoDesafios } from "../../../helpers/dbHelpers";

class RemoverAgendarDesafiosService {
  async execute(agendamentoId: string, uId: string) {
    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento do desafio não existe");
    }

    const agendamento = await client.agendamentos_avaliacoes.findUnique({
      where:{
          agendamento_id: agendamentoId
      }
    })
    const isAutor = await checkAutorAgendamentoDesafios(agendamentoId, uId);
    if(!isAutor){
      throw new Error("O agendamento não lhe pertence");
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
      data: "Agendamento do desafio removido com sucesso",
      status: 200
    };
  }
}

export { RemoverAgendarDesafiosService };
