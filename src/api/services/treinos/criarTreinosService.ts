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

    if(atividadeId == null && modalidadeId == null){
      throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambos nulos, pelo menos uma deve ser diferente de null.");
    }

    if(atividadeId != null && modalidadeId != null){
      throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambas diferentes de null, pelo menos uma deve ser null.");
    }

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

    const ginasio_modalidade = await getModalidadeGinasio(modalidadeId);
    const marca_modalidade = (await getMarcaGym(ginasio_modalidade)).marca_id;

    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if(mobilidade){
        if(id['marca_id'] != marca_modalidade)
        {
        throw new Error("Não possui permissão")
        }
    }
    else{
        const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
        if(marca_gym != marca_modalidade)
        {
            throw new Error("Não possui permissão")
        }
    }

    const dataAtual = new Date();
    changeTimeZone(dataAtual)
    if(data >= dataAtual){
      throw new Error("A data do agendamento não pode ser maior que a data atual");
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
    return {data: treino, status: 200};
  }
}
export { CriarTreinosService };
