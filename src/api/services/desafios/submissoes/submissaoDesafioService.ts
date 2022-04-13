import { checkDesafioIdExists, checkGinasioExists, checkUserIdExists, getDesafio, getMarcaGym } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

interface ISubmissaoDesafio{
  desafioId:string;
  uid:string;
  valor:string;
  treinadorId:string;
  ginasioId:string;
}

export class SubmissaoDesafioService{
  async execute({desafioId,uid,valor,treinadorId,ginasioId}:ISubmissaoDesafio){
    const existsDesafio = await checkDesafioIdExists(desafioId);
    if(!existsDesafio){
      throw new Error("Desafio Inexistente")
    }

    const existsAluno = await checkUserIdExists(uid);
    if(!existsAluno){
      throw new Error("Aluno inexistente")
    }

    const existsTreinador = await checkUserIdExists(treinadorId);
    if(!existsTreinador){
      throw new Error("Treinador inexistente")
    }

    const existsGinasio = await checkGinasioExists(ginasioId);
    if(!existsGinasio){
      throw new Error("Ginasio inexistente")
    }

    const desafio = await getDesafio(desafioId);
    const gymDesafio=desafio.ginasio_id;
console.log(gymDesafio," | ", ginasioId)
    const marca = await getMarcaGym(gymDesafio);
    if(!marca.mobilidade && gymDesafio != ginasioId){
      throw new Error("Entrada invalida")
    }

    const submissao = await client.submissoes_desafios.create({
      data:{
        uid,
        valor,
        desafio_id:desafioId,
        treinador_id:treinadorId,
        ginasio_id:ginasioId
      }
    })

    return { submissao}
  }
}