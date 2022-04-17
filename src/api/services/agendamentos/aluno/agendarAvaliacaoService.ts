import { client } from "../../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkTreinador } from "../../../helpers/dbHelpers";

interface IAgendarAvaliacaoService {
  uid: string;
  dataAgendamento: Date;
  ginasioId: string;
}

export class AgendarAvaliacaoService {
  async execute({
    uid,
    dataAgendamento,
    ginasioId,
  }: IAgendarAvaliacaoService) {
    
    const exists_user = await checkUserIdExists(uid);
    if (!exists_user) {
      throw new Error("O utilizador não existe");
    }

    const exist_gym = await checkGinasioExists(ginasioId);
    if (!exist_gym){
      throw new Error("O ginásio não existe");
    }

    const agendamento = await client.agendamentos_avaliacoes.create({
      data: {        
        ginasio_id: ginasioId,
        uid,
        data_agendamento: dataAgendamento,
      }
    });

    return agendamento;
  }
}

