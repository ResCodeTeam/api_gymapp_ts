import { client } from "../../../prisma/client";
import { checkAgendamentoAvaliacaoExists, checkAgendamentoAvaliacaoIsAceiteExists, getAgendamentoAvaliacoesGinasio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { changeTimeZone } from "../../../helpers/dateHelpers";

class AceitarAvaliacoesService {
  async execute(agendamentoId: string, treinadorId: string) {

    const exists_agendamento = await checkAgendamentoAvaliacaoExists(agendamentoId);
    if (!exists_agendamento) {
      return { date: "O pedido de agendamento não existe", status: 500 }
    }

    const is_aceite = await checkAgendamentoAvaliacaoIsAceiteExists(agendamentoId);
    if (!is_aceite) {
      return { date: "O pedido de agendamento já foi aceite", status: 500 }
    }

    const ginasio_agendamento = await getAgendamentoAvaliacoesGinasio(agendamentoId);
    const marca_ginasio = (await getMarcaGym(ginasio_agendamento)).marca_id;
    const marca_treinador = await getTreinadorMarca(treinadorId)

    if (marca_ginasio != marca_treinador) {
      return { date: "Não tem autorização", status: 500 }
    }

    const agendamentos = await client.agendamentos_avaliacoes.update({
      where: {
        agendamento_id: agendamentoId
      },
      data: {
        isAceite: true
      }
    })


    let data = new Date();
    changeTimeZone(data)
    //#region Cria Notificação
    const notificacao = await client.notificacoes.create({
      data: {
        origem_uid: treinadorId,
        conteudo: "O seu agendamento foi aceite",
        data,
        tipo: 1,
      }
    });

    //#region Cria Destinos da Notificação
    await client.destinos_notificacao.create({
      data: {
        noti_id: notificacao.noti_id, // id da notificacao
        dest_uid: agendamentos.uid, // treinador que aceitou o pedido - id de quem vai receber a notificacao
      }
    });
    //#endregion

    return agendamentos;
  }
}

export { AceitarAvaliacoesService };
