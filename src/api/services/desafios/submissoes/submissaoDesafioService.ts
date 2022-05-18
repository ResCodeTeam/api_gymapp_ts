import { checkDesafioIdExists, checkGinasioExists, checkMobilidadeMarcaUser, checkUserIdExists, getDesafio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";
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
    const marca = await getMarcaGym(gymDesafio);
    
    const marca_treinador = await getTreinadorMarca(treinadorId)
    if(marca_treinador != marca.marca_id){
      throw new Error("Não tem autorização");
    }

    // para o aluno
    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if(mobilidade){
        if(id['marca_id'] != marca.marca_id)
        {
            throw new Error("Não possui permissão")
        }
    }
    else{
        if(id['ginasio_id'] != desafio.ginasio_id)
        {
            throw new Error("Não possui permissão")
        }
    }
    
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

    return {data: submissao, status: 200};
  }
}