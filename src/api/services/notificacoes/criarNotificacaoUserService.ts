import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkUserIdExists } from "../../helpers/dbHelpers"
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
      throw new Error("User inexistente")
    }

    const existsOrigem = await checkUserIdExists(origemId);
    if (!existsOrigem) {
      throw new Error("User inexistente")
    }

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

    return notificacao;
  }
}