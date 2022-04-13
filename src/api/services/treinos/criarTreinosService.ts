import { client } from "../../prisma/client";
import { checkUserIdExists, checkModalidadeExists, checkAtividadeExists } from "../../helpers/dbHelpers";

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

    if(atividadeId == null && modalidadeId == null){
      throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambos nulos, pelo menos uma deve ser diferente de null.");
    }

    if(atividadeId != null && modalidadeId != null){
      throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambas diferentes de null, pelo menos uma deve ser null.");
    }

    //verificar se a modalidade já existe
    const exist_nome = await checkUserIdExists(uid);
    if (!exist_nome) {
      throw new Error("O utilizador não existe");
    }

    if(modalidadeId != null){
      const exist_modalidade = await checkModalidadeExists(modalidadeId);
      if (!exist_modalidade) {
        throw new Error("A modalidade não existe");
      }
    }

    if(atividadeId != null){
      const exist_atividades = await checkAtividadeExists(atividadeId);
      if (!exist_atividades) {
        throw new Error("A atividade não existe");
      }
    }

    await client.treinos.create({
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
    return { msg: "O treino foi criado com sucesso!" };
  }
}
export { CriarTreinosService };
