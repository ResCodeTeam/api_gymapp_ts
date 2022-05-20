import { client } from "../../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkDesafioIdExists, checkTreinador, checkDesafioDisponivel, getDesafioGinasio, getMarcaGym, checkMobilidadeMarcaUser, getMarcaAluno, getGinasioAluno } from "../../../helpers/dbHelpers";
import { changeTimeZone } from "../../../helpers/dateHelpers";

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
      return { data: "O utilizador não existe", status: 500 }
    }

    const exist_gym = await checkGinasioExists(ginasioId);
    if (!exist_gym) {
      return { data: "O ginásio não existe", status: 500 }
    }

    const exists_desafio = await checkDesafioIdExists(desafioId);
    if (!exists_desafio) {
      return { data: "O desafio não existe", status: 500 }
    }

    const desafio_disponivel = await checkDesafioDisponivel(desafioId);
    if (!desafio_disponivel) {
      return { data: "O desafio já foi encerrado", status: 500 }
    }

    const ginasio_desafio = await getDesafioGinasio(desafioId);
    const marca_desafio = (await getMarcaGym(ginasio_desafio)).marca_id;

    const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;

    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if (mobilidade) {
      const userMarca = await getMarcaAluno(uid);
      if (id['marca_id'] != marca_ginasio || id['marca_id'] != marca_desafio || userMarca != marca_ginasio) {
        return { data: "Não possui permissão", status: 500 }
      }
    }
    else {
      const userGym = await getGinasioAluno(uid)
      if (id['ginasio_id'] != ginasioId || id['ginasio_id'] != ginasio_desafio || userGym != ginasioId) {
        return { data: "Não possui permissão", status: 500 }
      }
    }

    const dataAtual = new Date();
    changeTimeZone(dataAtual)
    if (dataAgendamento <= dataAtual) {
      return { data: "A data do agendamento não pode ser menor que a data atual", status: 500 }
    }

    const agendamento = await client.agendamentos_desafios.create({
      data: {
        ginasio_id: ginasioId,
        desafio_id: desafioId,
        uid,
        data_agendamento: dataAgendamento,
      }
    });

    return { data: agendamento, status: 200 };
  }
}

