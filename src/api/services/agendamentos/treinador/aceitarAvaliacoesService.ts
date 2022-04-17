import { client } from "../../../prisma/client";
import { checkAgendamentoAvaliacaoExists, checkAgendamentoAvaliacaoIsAceiteExists } from "../../../helpers/dbHelpers";

class AceitarAvaliacoesService {
  async execute(agendamentoId: string, treinadorId: string) {
    console.log(agendamentoId)
    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      throw new Error("O pedido de agendamento não existe");
    }

    const is_aceite = await checkAgendamentoAvaliacaoIsAceiteExists(agendamentoId);
    if (!is_aceite) {
      throw new Error("O pedido de agendamento já foi aceite");
    }

    const agendamentos = await client.agendamentos_avaliacoes.update({
     where: {
       agendamento_id: agendamentoId
      },
     data:{
       isAceite: true
     }
    })

    //#region Cria Notificação
    const notificacao = await client.notificacoes.create({
      data: {
        origem_uid: treinadorId,
        conteudo: "O seu agendamento foi aceite",
        data : new Date(),
        tipo: 1,
      }
    });

    //#region Cria Destinos da Notificação
      await client.destinos_notificacao.create({
        data : { 
          noti_id : notificacao.noti_id, // id da notificacao
          dest_uid: agendamentos.uid, // treinador que aceitou o pedido - id de quem vai receber a notificacao
        }
      }); 
    //#endregion

    return agendamentos;
  }
}

export { AceitarAvaliacoesService };
