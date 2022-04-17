import { client } from "../../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkDesafioIdExists, checkTreinador, checkDesafioDisponivel } from "../../../helpers/dbHelpers";

interface IAgendarDesafiosService {
  uid: string;
  dataAgendamento: Date;
  desafioId: string;
  ginasioId: string;
}

export class AgendarDesafiosService {
  async execute({
    uid,
    dataAgendamento,
    desafioId,
    ginasioId,
  }: IAgendarDesafiosService) {
    
    const exists_user = await checkUserIdExists(uid);
    if (!exists_user) {
      throw new Error("O utilizador não existe");
    }

    const exist_gym = await checkGinasioExists(ginasioId);
    if (!exist_gym){
      throw new Error("O ginásio não existe");
    }

    const exists_desafio = await checkDesafioIdExists(desafioId);
    if (!exists_desafio) {
      throw new Error("O desafio não existe");
    }

    const desafio_disponivel = await checkDesafioDisponivel(desafioId);
    if (!desafio_disponivel) {
      throw new Error("O desafio já foi encerrado");
    }

    const agendamento = await client.agendamentos_desafios.create({
      data: {        
        ginasio_id: ginasioId,
        desafio_id: desafioId,
        uid,
        data_agendamento: dataAgendamento,
      }
    });

    return agendamento;
  }
}

