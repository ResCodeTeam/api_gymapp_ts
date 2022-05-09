import { client } from "../../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkTreinador, getMarcaGym, checkMobilidadeMarcaUser } from "../../../helpers/dbHelpers";
import { changeTimeZone } from "../../../helpers/dateHelpers";

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

    const exist_gym = await checkGinasioExists(ginasioId);
    if (!exist_gym){
      throw new Error("O ginásio não existe");
    }

    const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if(mobilidade){
        if(id['marca_id'] != marca_ginasio)
        {
            throw new Error("Não possui permissão")
        }
    }
    else{
        if(id['ginasio_id'] != ginasioId)
        {
            throw new Error("Não possui permissão")
        }
    }

    const dataAtual = new Date();
    changeTimeZone(dataAtual)
    if(dataAgendamento <= dataAtual){
      throw new Error("A data do agendamento não pode ser menor que a data atual");
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

