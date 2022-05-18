import { client } from "../../prisma/client";
import { checkUserIdExists, checkModalidadeExists, checkAtividadeExists, getModalidadeGinasio, getMarcaGym, checkMobilidadeMarcaUser } from "../../helpers/dbHelpers";
import { changeTimeZone } from "../../helpers/dateHelpers";

interface ICriarTreinosService {
  uid: string;
  atividadeId: string;
  modalidadeId: string;
  duracao: string;
  calorias: number;
  distancia: number;
  data: Date;
}

class CriarTreinosService {
  async execute({
    uid,
    atividadeId,
    modalidadeId,
    duracao,
    calorias,
    distancia,
    data
  }: ICriarTreinosService) {

    if (atividadeId == null && modalidadeId == null) {
      return { date: "ERRO!!! A atividade e a modalidade não podem ser ambos nulos, pelo menos uma deve ser diferente de null.", status: 500 }
    }

    if (atividadeId != null && modalidadeId != null) {
      return { date: "ERRO!!! A atividade e a modalidade não podem ser ambas diferentes de null, pelo menos uma deve ser null.", status: 500 }
    }

    const exist_nome = await checkUserIdExists(uid);
    if (!exist_nome) {
      return { date: "O utilizador não existe", status: 500 }
    }

    if (modalidadeId != null) {
      const exist_modalidade = await checkModalidadeExists(modalidadeId);
      if (!exist_modalidade) {
        return { date: "A modalidade não existe", status: 500 }
      }
    }

    if (atividadeId != null) {
      const exist_atividades = await checkAtividadeExists(atividadeId);
      if (!exist_atividades) {
        return { date: "A atividade não existe", status: 500 }
      }
    }

    const ginasio_modalidade = await getModalidadeGinasio(modalidadeId);
    const marca_modalidade = (await getMarcaGym(ginasio_modalidade)).marca_id;

    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if (mobilidade) {
      if (id['marca_id'] != marca_modalidade) {
        return { date: "Não possui permissão", status: 500 }
      }
    }
    else {
      const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
      if (marca_gym != marca_modalidade) {
        return { date: "Não possui permissão", status: 500 }
      }
    }

    const dataAtual = new Date();
    changeTimeZone(dataAtual)
    if (data >= dataAtual) {
      return { date: "A data do agendamento não pode ser maior que a data atual", status: 500 }
    }

    const treino = await client.treinos.create({
      data: {
        uid,
        atividade_id: atividadeId,
        modalidade_id: modalidadeId,
        duracao,
        calorias,
        distancia,
        data,
      },
    });
    return treino;
  }
}
export { CriarTreinosService };
