import { client } from "../../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkTreinador, getMarcaGym, checkMobilidadeMarcaUser, getMarcaAluno, getGinasioAluno } from "../../../helpers/dbHelpers";
import { changeTimeZone } from "../../../helpers/dateHelpers";

export interface IAgendarAvaliacaoService {
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
    if (!exist_gym) {
      return { data: "O ginásio não existe", status: 500 }
    }


    const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if (mobilidade) {
      const userMarca = await getMarcaAluno(uid);
      if (id['marca_id'] != marca_ginasio || userMarca != marca_ginasio) {
        return { data: "Não possui permissão", status: 500 }
      }
    }
    else {
      const userGym = await getGinasioAluno(uid)
      if (id['ginasio_id'] != ginasioId || ginasioId != userGym) {
        return { data: "Não possui permissão", status: 500 }
      }
    }

    const dataAtual = new Date();
    changeTimeZone(dataAtual)
    if (dataAgendamento <= dataAtual) {
      return { data: "A data do agendamento não pode ser menor que a data atual", status: 500 }
    }

    const agendamento = await client.agendamentos_avaliacoes.create({
      data: {
        ginasio_id: ginasioId,
        uid,
        data_agendamento: dataAgendamento,
      }
    });

    return { data: agendamento, status: 200 };
  }
}

