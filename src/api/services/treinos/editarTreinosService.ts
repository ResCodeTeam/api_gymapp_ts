/**
 * @module EditarTreinosService
 */
import { client } from "../../prisma/client";
import { checkAutorTreino, checkTreinoExists, checkUserIdExists, checkAtividadeExists, checkModalidadeExists, getModalidadeGinasio, getMarcaGym, checkMobilidadeMarcaUser } from "../../helpers/dbHelpers";
import { changeTimeZone } from "../../helpers/dateHelpers";
/**
 * @param treinoId id do treino
 * @param uId id do utilizador
 * @param atividadeId id da atividade
 * @param modalidadeId id da modalidade
 * @param duracao duracao do treino
 * @param calorias calorias do treino
 * @param distancia distancia do treino
 * @param data data do treino
 */
export interface ITreino {
  treinoId: string,
  uId: string,
  atividadeId: string,
  modalidadeId: string,
  duracao: string,
  calorias: number,
  distancia: number,
  data: Date
}

/**
 * Classe responsavel pelo serviço de edição de treinos
 */
export class EditarTreinosService {
  /**
   * Esta função permite editar um treino tendo em conta todas as verificações necessárias
   * @param ITreino interface de dados do serviço
   */
  async execute({ uId, treinoId, atividadeId, modalidadeId, duracao, calorias, distancia, data }: ITreino) {

    if (atividadeId == null && modalidadeId == null) {
      return { data: "ERRO!!! A atividade e a modalidade não podem ser ambos nulos, pelo menos uma deve ser diferente de null.", status: 500 }
    }

    if (atividadeId != null && modalidadeId != null) {
      return { data: "ERRO!!! A atividade e a modalidade não podem ser ambas diferentes de null, pelo menos uma deve ser null.", status: 500 }
    }

    const exist_nome = await checkUserIdExists(uId);
    if (!exist_nome) {
      return { data: "O utilizador não existe", status: 500 }
    }

    const exists_treino = await checkTreinoExists(treinoId);
    if (!exists_treino) {
      return { data: "O treino não existe", status: 500 }
    }


    const isAutor = await checkAutorTreino(uId, treinoId);
    if (!isAutor) {
      return { data: "O treino não lhe pertence", status: 500 }
    }

    if (atividadeId != null) {
      const exists_atividades = await checkAtividadeExists(atividadeId);
      if (!exists_atividades) {
        return { data: "A atividade não existe", status: 500 }
      }
    }

    if (modalidadeId != null) {
      const exists_modalidades = await checkModalidadeExists(modalidadeId);
      if (!exists_modalidades) {
        return { data: "A modalidade não existe", status: 500 }
      }

      const ginasio_modalidade = await getModalidadeGinasio(modalidadeId);
      const marca_modalidade = (await getMarcaGym(ginasio_modalidade)).marca_id;

      const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);
      if (mobilidade) {
        if (id['marca_id'] != marca_modalidade) {
          return { data: "Não possui permissão", status: 500 }
        }
      }
      else {
        const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
        if (marca_gym != marca_modalidade) {
          return { data: "Não possui permissão", status: 500 }
        }
      }
    }

    const treino = await client.treinos.findUnique({
      where: {
        treino_id: treinoId
      }
    })
    //verificar se a data é diferente da original
    if (data !== treino.data) {
      const dataAtual = new Date();
      changeTimeZone(dataAtual)
      if (data > dataAtual) {
        return { data: "A data do treino não pode ser maior que a data atual", status: 500 }
      }
    }

    if (treino.atividade_id == null && atividadeId != null) {
      return { data: "O treino não tem atividade", status: 500 }
    }

    if (treino.modalidade_id == null && modalidadeId != null) {
      return { data: "O treino não tem modalidade", status: 500 }
    }

    if (modalidadeId != null && atividadeId != null) {
      return { data: "O treino não pode ter atividade e modalidade", status: 500 }
    }

    const editarTreinos = await client.treinos.update({
      where: {
        treino_id: treinoId
      },
      data: {
        atividade_id: atividadeId == null ? undefined : atividadeId,
        modalidade_id: modalidadeId == null ? undefined : modalidadeId,
        duracao,
        calorias,
        distancia,
        data
      }
    })

    return { data: editarTreinos, status: 200 };
  }
}