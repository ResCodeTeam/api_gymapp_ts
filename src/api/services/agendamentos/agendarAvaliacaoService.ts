import { client } from "../../prisma/client";
import { checkUserIdExists, checkGinasioExists } from "../../helpers/dbHelpers";

interface IAgendarAvaliacaoService {
  uid: string;
  dataAgendamento: Date;
  estado: number;
  ginasioId: string;
  treinadorId: string;
}

export class AgendarAvaliacaoService {
  async execute({
    uid,
    dataAgendamento,
    estado,
    ginasioId,
    treinadorId,
  }: IAgendarAvaliacaoService) {
    
    const exists_user = await checkUserIdExists(uid);
    if (!exists_user) {
      throw new Error("O utilizador não existe");
    }

    const exist_gym = await checkGinasioExists(ginasioId);
    if (!exist_gym){
      throw new Error("O ginásio não existe");
    }

    await client.agendamentos_avaliacoes.create({
      data: {        
        ginasio_id: ginasioId,
        uid,
        data_agendamento: dataAgendamento,
        estado,
      }
    });

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
          dest_uid: uid, // treinador que aceitou o pedido - id de quem vai receber a notificacao
        }
      }); 
    //#endregion

    return {
      msg: "O agendamento da avaliação foi criado com sucesso!"
    };
  }
}

