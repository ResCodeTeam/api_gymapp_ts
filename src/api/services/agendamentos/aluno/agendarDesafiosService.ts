import { client } from "../../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkDesafioIdExists, checkTreinador, checkDesafioDisponivel, getDesafioGinasio, getMarcaGym, checkMobilidadeMarcaUser } from "../../../helpers/dbHelpers";
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

    const ginasio_desafio = await getDesafioGinasio(desafioId);
    const marca_desafio = (await getMarcaGym(ginasio_desafio)).marca_id;

    const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;

    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if(mobilidade){
        if(id['marca_id'] != marca_ginasio || id['marca_id'] != marca_desafio)
        {
            throw new Error("Não possui permissão")
        }
    }
    else{
        if(id['ginasio_id'] != ginasioId || id['ginasio_id'] != ginasio_desafio)
        {
            throw new Error("Não possui permissão")
        }
    }

    const dataAtual = new Date();
    changeTimeZone(dataAtual)
    if(dataAgendamento <= dataAtual){
      throw new Error("A data do agendamento não pode ser menor que a data atual");
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

