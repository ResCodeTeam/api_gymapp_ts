import { response } from "express";
import { formatFullDate, IDayWeek } from "../../../helpers/dbHelpers";
import { client } from '../../../prisma/client'; 

interface INotificacao {
  userId: string,
  notiId: string,
}

export class UpdateEstadoNotificacaoService {
    async execute({userId, notiId} : INotificacao) {
        const notiUpdated = await client.destinos_notificacao.updateMany({
            where : {
                noti_id : notiId,
                dest_uid : userId,
                visto : false
            },
            data : {
                visto : true
            }
        })

        if (!notiUpdated) {
            throw new Error (`Operação inválida`)
        }

        return {
            message:"Notificação alterada com sucesso",
            notiUpdated
          };
        
    }
}
