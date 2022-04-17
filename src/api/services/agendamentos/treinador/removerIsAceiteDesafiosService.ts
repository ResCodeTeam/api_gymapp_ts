import { client } from "../../../prisma/client";
import { checkAgendamentoDesafiosExists, checkAgendamentoDesafioIsAceiteExists } from "../../../helpers/dbHelpers";

class RemoverIsAceiteDesafiosService {
  async execute(agendamentoId: string) {

    const exists_agendamento = await checkAgendamentoDesafiosExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento do desafio não existe");
    }

    const is_aceite = await checkAgendamentoDesafioIsAceiteExists(agendamentoId);
    if (is_aceite) {
      throw new Error("O agendamento do desafio ainda não foi aceite");
    }

    const agendamento = await client.agendamentos_desafios.findUnique({
      where:{
          agendamento_id: agendamentoId
      }
    })

    await client.agendamentos_desafios.update({
      where: {
        agendamento_id: agendamentoId
       },
      data:{
        isAceite: false
      }
    })

    return {
      msg: "Aceitação do agendamento do desafio removida com sucesso",
    };
  }
}

export { RemoverIsAceiteDesafiosService };
