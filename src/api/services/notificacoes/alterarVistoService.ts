/**
 * @module AlterarVistoService
 */
import { checkDestinoNotificacao, checknotificacaoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param notiId id da notificacao
 * @param destUid id do destino
 */
export interface IVisto {
  notiId: string
  destUid: string
}
export class AlterarVistoService {
  async execute({ notiId, destUid }: IVisto) {

    const existsVisto = await checknotificacaoExists(notiId);
    if (!existsVisto) {
      return { data: "notificação não existe", status: 500 }
    }

    const isAutor = await checkDestinoNotificacao(destUid, notiId);
    if (!isAutor) {
      return { data: "Não possui autorização", status: 500 }
    }

    const alterarVisto = await client.destinos_notificacao.update({
      where: {
        noti_id_dest_uid: {
          noti_id: notiId,
          dest_uid: destUid
        }
      },
      data: {
        visto: true

      }
    })

    return { data: alterarVisto, status: 200 };
  }
}