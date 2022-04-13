import { client } from "../../prisma/client";
import { checkUserIdExists, checkModalidadeExists, checkAtividadeExists } from "../../helpers/dbHelpers";

interface ICriarTreinosService {
  uid: string;
  tipoModalidade: number;
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
    tipoModalidade,
    atividadeId,
    modalidadeId,
    duracao,
    calorias,
    distancia,
    data
  }: ICriarTreinosService) {
    //verificar se a modalidade já existe
    const exist_nome = await checkUserIdExists(uid);
    if (!exist_nome) {
      throw new Error("O utilizador não existe");
    }

    const exist_modalidade = await checkModalidadeExists(modalidadeId);
    if (!exist_modalidade) {
      throw new Error("A modalidade ainda não existe");
    }

    const exist_atividades = await checkAtividadeExists(modalidadeId);
    if (!exist_atividades) {
      throw new Error("A atividade ainda não existe");
    }

    await client.treinos.create({
      data: {
        uid,
        atividade_id: atividadeId,
        duracao,
        calorias, 
        distancia,
        data,    
      },
    });
    return { msg: "O treino foi criado com sucesso!" };
  }
}
export { CriarTreinosService };
