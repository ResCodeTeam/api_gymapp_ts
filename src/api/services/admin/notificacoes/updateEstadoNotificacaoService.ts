import { response } from "express";
import { formatFullDate, IDayWeek } from "../../../helpers/dbHelpers";
import { client } from '../../../prisma/client'; 

interface INotificacao {
  userId: string,
  notiId: string,
}

export class UpdateEstadoNotificacaoService {
    async execute({userId, notiId} : INotificacao) {
        const data = await client.notificacoes.findUnique({
            where : {
                noti_id : notiId
            },
            select : {
                data : true,
                destinos_notificacao : {
                    select : {
                        dest_uid : true
                    }
                }
            }
        });
        const dayWeek : IDayWeek = (await formatFullDate(data.data));
        const abbreviation : string = dayWeek.abbreviation;
        return {
            message:"Notificação alterada com sucesso",
            dayWeek
          };
        
    }
}
