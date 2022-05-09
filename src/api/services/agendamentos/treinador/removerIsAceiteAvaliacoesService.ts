import { client } from "../../../prisma/client";
import { checkAgendamentoAvaliacaoExists, checkAgendamentoAvaliacaoIsAceiteExists, getAgendamentoAvaliacoesGinasio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";

class RemoverIsAceiteAvaliacoesService {
  async execute(treinadorId: string, agendamentoId: string) {
    
    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O agendamento da avaliação não existe");
    }

    const ginasio_agendamento = await getAgendamentoAvaliacoesGinasio(agendamentoId);
    const marca_ginasio = (await getMarcaGym(ginasio_agendamento)).marca_id;
    const marca_treinador = await getTreinadorMarca(treinadorId)
    
    if(marca_ginasio != marca_treinador){
      throw new Error("Não tem autorização")
    }

    const is_aceite = await checkAgendamentoAvaliacaoIsAceiteExists(agendamentoId);
    if (is_aceite) {
      throw new Error("O agendamento da avaliação ainda não foi aceite");
    }
    
    const agendamento = await client.agendamentos_avaliacoes.findUnique({
      where:{
          agendamento_id: agendamentoId
      }
    })

    await client.agendamentos_avaliacoes.update({
      where: {
        agendamento_id: agendamentoId
       },
      data:{
        isAceite: false
      }
    })

    return {
      msg: "Aceitação do agendamento da avaliação removida com sucesso",
    };
  }
}

export { RemoverIsAceiteAvaliacoesService };
