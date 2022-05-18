import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkDonoMarca, checkUserIdExists, getAlunoMarca } from "../../helpers/dbHelpers"
import { client } from "../../prisma/client";


interface ICriarNotifcacaoUser {
  destinoId: string
  origemId: string,
  conteudo: string,
  tipo: number
}

export class CriarNotificacaoUserService {
  async execute({ destinoId, origemId, conteudo, tipo }: ICriarNotifcacaoUser) {

    const existsDestino = await checkUserIdExists(destinoId);
    if (!existsDestino) {
      return { date: "User inexistente", status: 500 }
    }

    const marcaId = await getAlunoMarca(destinoId);
    const isDono = await checkDonoMarca(marcaId, origemId);

    let data = new Date();
    changeTimeZone(data)

    const notificacao = await client.notificacoes.create({
      data: {
        origem_uid: origemId,
        conteudo,
        data,
        tipo,
      }
    });


    await client.destinos_notificacao.create({
      data: {
        dest_uid: destinoId,
        noti_id: notificacao.noti_id
      }
    })

    return {data: notificacao, status: 200};
  }
}